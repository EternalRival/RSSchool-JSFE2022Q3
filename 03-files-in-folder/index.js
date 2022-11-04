const { readdir, stat } = require('fs/promises');
const { resolve, parse } = require('path');

const dir = 'secret-folder';

function getPath(fileName) {
  return resolve(__dirname, dir, fileName);
}

async function getFileData(path) {
  const stats = await stat(path);
  return { path, stats };
}

function getFilesData(paths) {
  return Promise.all(paths.map(getFileData));
}

async function getFilesInfo(path) {
  const fileNames = await readdir(path);
  const paths = fileNames.map(getPath);
  const files = await getFilesData(paths);
  for (const file of files) {
    if (!file.stats.isFile()) continue;
    const { name, ext } = parse(file.path);
    const kb = file.stats.size / 1024;
    console.log(`${name} - ${ext.slice(1)} - ${kb.toFixed(3)}kb`);
  }
}

getFilesInfo(resolve(__dirname, dir));
