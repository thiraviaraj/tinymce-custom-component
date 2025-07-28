import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import css from 'rollup-plugin-import-css';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'tinymcePluginCalendar',
    globals: {
      tinymce: 'tinymce'
    }
  },
  external: ['tinymce'],
  plugins: [
    resolve(),
    commonjs(),
    css()
  ]
}; 