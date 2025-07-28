const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '../node_modules/tinymce-plugin-calendar/dist/index.js');
const dest = path.resolve(__dirname, '../public/assets/plugins/asyncComponent.js');

fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.copyFileSync(src, dest);

console.log('✔ Plugin copied to asyncComponent.js');
