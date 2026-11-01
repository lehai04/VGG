import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
const config = 'frontend/next.config.ts';
const text = readFileSync(config, 'utf8');
if (!text.includes('const nextConfig: NextConfig = {')) throw new Error('Next config shape changed');
writeFileSync(config, text.replace('const nextConfig: NextConfig = {', "const nextConfig: NextConfig = {\n  output: 'standalone',\n  outputFileTracingRoot: join(process.cwd(), '..'),"));
function verifyAssets(dir) {
  for (const item of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, item.name);
    if (item.isDirectory()) verifyAssets(path);
    else if (readFileSync(path).subarray(0, 100).toString().startsWith('version https://git-lfs.github.com/spec/v1')) {
      throw new Error(`Git LFS pointer instead of real asset: ${path}`);
    }
  }
}
verifyAssets('frontend/public');
