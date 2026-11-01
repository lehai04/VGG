import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location('release', Path(__file__).parents[1] / 'release.py')
release = importlib.util.module_from_spec(spec)
spec.loader.exec_module(release)


class SwitchTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        root = Path(self.temp.name)
        self.old = {'slot': 'blue', 'release': 'a' * 64, 'image': 'old'}
        self.new = {'slot': 'green', 'release': 'b' * 64, 'image': 'new'}
        self.state = {'active': self.old, 'previous': None}
        self.conf = root / 'nginx.conf'
        self.conf.write_text('old config')
        (root / 'leader').write_text(self.old['release'])
        for name, value in [('ROOT', root), ('CONF', self.conf)]:
            p = patch.object(release, name, value)
            p.start()
            self.addCleanup(p.stop)
        # Test state-machine behavior on Windows and Linux; fsync itself is OS-owned.
        p = patch.object(release, 'atomic', lambda path, text: path.write_text(text))
        p.start()
        self.addCleanup(p.stop)
        self.root = root

    @patch.object(release.time, 'sleep')
    @patch.object(release, 'run')
    @patch.object(release, 'healthy', return_value=True)
    def test_success_keeps_previous_for_no_build_rollback(self, *_):
        release.switch(self.state, self.new)
        saved = json.loads((self.root / 'state.json').read_text())
        self.assertEqual(saved, {'active': self.new, 'previous': self.old})
        self.assertEqual((self.root / 'leader').read_text(), self.new['release'])
        self.assertFalse((self.root / 'pending.json').exists())
        self.assertIn('127.0.0.1:4200', self.conf.read_text())

    @patch.object(release.time, 'sleep')
    @patch.object(release, 'run')
    @patch.object(release, 'healthy', side_effect=[False, True])
    def test_failed_probe_restores_route_leader_and_state(self, *_):
        with self.assertRaisesRegex(RuntimeError, 'Post-switch'):
            release.switch(self.state, self.new)
        self.assertEqual(self.conf.read_text(), 'old config')
        self.assertEqual((self.root / 'leader').read_text(), self.old['release'])
        self.assertEqual(json.loads((self.root / 'state.json').read_text()), self.state)
        self.assertFalse((self.root / 'pending.json').exists())

    @patch.object(release.time, 'sleep')
    @patch.object(release, 'run')
    @patch.object(release, 'healthy', side_effect=[True, False, True])
    def test_observation_failure_restores_old_scheduler(self, *_):
        with self.assertRaisesRegex(RuntimeError, 'Observation'):
            release.switch(self.state, self.new)
        self.assertEqual((self.root / 'leader').read_text(), self.old['release'])

    @patch.object(release, 'run')
    @patch.object(release, 'healthy', return_value=False)
    def test_failed_restore_retains_recovery_journal(self, *_):
        with self.assertRaisesRegex(RuntimeError, 'Restored routing'):
            release.switch(self.state, self.new)
        self.assertTrue((self.root / 'pending.json').exists())

    @patch.object(release, 'healthy', return_value=True)
    @patch.object(release, 'run', side_effect=[RuntimeError('nginx invalid'), None, None])
    def test_nginx_validation_failure_restores_original_config(self, *_):
        with self.assertRaisesRegex(RuntimeError, 'nginx invalid'):
            release.switch(self.state, self.new)
        self.assertEqual(self.conf.read_text(), 'old config')

    @patch.object(release, 'run')
    def test_reject_mutable_image_before_docker(self, command):
        with self.assertRaises(ValueError):
            release.prepare('ghcr.io/example/vgg:latest', 'green')
        command.assert_not_called()

    @patch.object(release, 'run', side_effect=[None, RuntimeError('backup failed')])
    def test_backup_failure_never_migrates_or_starts_containers(self, command):
        with self.assertRaisesRegex(RuntimeError, 'backup failed'):
            release.prepare('ghcr.io/example/vgg@sha256:' + 'a' * 64, 'green')
        self.assertEqual(command.call_count, 2)

    @patch.object(release, 'run', side_effect=[None, None, RuntimeError('migration failed')])
    def test_migration_failure_never_starts_candidate(self, command):
        with self.assertRaisesRegex(RuntimeError, 'migration failed'):
            release.prepare('ghcr.io/example/vgg@sha256:' + 'a' * 64, 'green')
        self.assertEqual(command.call_count, 3)


if __name__ == '__main__':
    unittest.main()
