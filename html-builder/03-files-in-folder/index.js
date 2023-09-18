const { readdir, stat } = require('fs/promises');
const { resolve, parse } = require('path');

const DIR = 'secret-folder';

async function getFilesData(dirPath) {
  const fileNames = await readdir(dirPath);

  return fileNames.reduce(async (p, c) => {
    const path = resolve(__dirname, DIR, c);
    const stats = await stat(path);

    if (!stats.isFile()) return p;

    const file = parse(path);
    const { name } = file;
    const ext = file.ext.slice(1);
    const bytes = stats.size;

    return [...(await p), { path, name, ext, bytes, stats }];
  }, []);
}

getFilesData(resolve(__dirname, DIR)).then((files) => {
  files.forEach((file) => {
    const { name, ext } = file;
    const kb = (file.bytes / 1024).toFixed(3);
    console.log(`${name} - ${ext} - ${kb}kb`);
  });
});
