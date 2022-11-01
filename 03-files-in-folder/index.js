const fs = require('fs');
const path = require('path');

const dir = 'secret-folder';

fs.readdir(path.resolve(__dirname, dir), (_, files) => {
  for (const file of files) {
    const filePath = path.resolve(__dirname, dir, file);
    fs.stat(filePath, (_, v) => {
      if (v.isFile()) {
        const { name, ext } = path.parse(filePath);
        const kb = v.size / 1024;
        console.log(`${name} - ${ext.slice(1)} - ${kb.toFixed(3)}kb`);
      }
    });
  }
});
