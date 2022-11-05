const { mkdir, rm, copyFile, readdir } = require('fs/promises');
const { resolve } = require('path');

const DIR = 'files';

async function copyDir(dir, withMessages = false) {
  const dirPath = resolve(__dirname, dir);
  const copyPath = `${dirPath}-copy`;
  await rm(copyPath, { recursive: true, force: true });
  await mkdir(copyPath, { recursive: true });
  const fileNames = await readdir(dirPath);

  if (withMessages) console.log('> Copying…');
  await Promise.all(fileNames.map((v) => copyFile(resolve(dirPath, v), resolve(copyPath, v))));
  if (withMessages) console.log('> Copying completed!');
}

copyDir(DIR, true);
