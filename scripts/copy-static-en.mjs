import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = join(scriptDir, '..');
const dist = join(root, 'dist');

await mkdir(join(dist, 'en'), { recursive: true });
await mkdir(join(dist, 'assets', 'js'), { recursive: true });
await mkdir(join(dist, 'assets', 'css'), { recursive: true });

await copyFile(join(root, 'en', 'index.html'), join(dist, 'en', 'index.html'));
await copyFile(join(root, 'assets', 'js', 'main.js'), join(dist, 'assets', 'js', 'main.js'));
await copyFile(join(root, 'assets', 'css', 'custom.css'), join(dist, 'assets', 'css', 'custom.css'));
