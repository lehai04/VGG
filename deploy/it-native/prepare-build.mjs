import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

// Run only in the Linux build stage; do not alter the developer's build mode.
for (const [app, marker] of [['frontend', 'const nextConfig: NextConfig = {'], ['cms', 'const config: NextConfig = {']]) {
  const file = `${app}/next.config.ts`;
  const source = readFileSync(file, 'utf8');
  if (!source.includes(marker) || source.includes('output:')) throw new Error(`Unexpected config: ${file}`);
  writeFileSync(file, source.replace(marker, `${marker}\n  output: 'standalone',\n  outputFileTracingRoot: join(process.cwd(), '..'),`));
}
function verifyAssets(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = join(dir, entry.name);
    if (entry.isDirectory()) verifyAssets(file);
    else if (readFileSync(file).subarray(0, 100).toString().startsWith('version https://git-lfs.github.com/spec/v1')) {
      throw new Error(`Missing Git LFS asset: ${file}`);
    }
  }
}
verifyAssets('frontend/public');
verifyAssets('cms/public');
