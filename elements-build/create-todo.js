const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/create-todo/runtime.js',
    './dist/create-todo/polyfills.js',
    './dist/create-todo/main.js'
  ];

  await fs.ensureDir('elements');
  await concat(files, 'elements/create-todo.js');
  await fs.copyFile(
    './dist/create-todo/styles.css',
    'elements/create-todo.styles.css'
  );
})();
