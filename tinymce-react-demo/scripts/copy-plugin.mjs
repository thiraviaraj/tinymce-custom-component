import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { cpSync } from 'fs';

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const pluginSrc = path.resolve(__dirname, '../node_modules/tinymce-plugin-calendar/dist/index.js');
const pluginDest = path.resolve(__dirname, '../public/plugins/asyncComponent.js');

const tinymceSrc = path.resolve(__dirname, '../node_modules/tinymce');
const tinymceDest = path.resolve(__dirname, '../public/tinymce');

// Ensure plugin target directory exists
fs.mkdirSync(path.dirname(pluginDest), { recursive: true });
// Copy plugin file
fs.copyFileSync(pluginSrc, pluginDest);

// Copy tinymce directory recursively
cpSync(tinymceSrc, tinymceDest, { recursive: true });

console.log('✔ Plugin copied to asyncComponent.js');
console.log('✔ TinyMCE folder copied to public/tinymce');
