import test from 'node:test';
import assert from 'node:assert/strict';
import { cmsPath, cmsCookie } from '../../../cms/src/lib/cms-path.ts';

test('CMS subpath applies to API and assets, and login/logout cookie scope', () => {
  const previous = process.env.NEXT_PUBLIC_CMS_BASE_PATH;
  try {
    process.env.NEXT_PUBLIC_CMS_BASE_PATH = '/cms';
    assert.equal(cmsPath('/api/admin/me'), '/cms/api/admin/me');
    assert.equal(cmsPath('/images/logo/logo-vgg.png'), '/cms/images/logo/logo-vgg.png');
    for (const age of [0, 86400]) {
      assert.equal(cmsCookie(`session=abc; Path=/api/admin; HttpOnly; Max-Age=${age}; Secure`), `session=abc; Path=/cms/api/admin; HttpOnly; Max-Age=${age}; Secure`);
    }
    assert.equal(cmsCookie('other=abc; Path=/'), 'other=abc; Path=/');
    process.env.NEXT_PUBLIC_CMS_BASE_PATH = '';
    assert.equal(cmsPath('/api/admin/me'), '/api/admin/me');
    assert.equal(cmsCookie('session=abc; Path=/api/admin'), 'session=abc; Path=/api/admin');
  } finally {
    if (previous === undefined) delete process.env.NEXT_PUBLIC_CMS_BASE_PATH;
    else process.env.NEXT_PUBLIC_CMS_BASE_PATH = previous;
  }
});
