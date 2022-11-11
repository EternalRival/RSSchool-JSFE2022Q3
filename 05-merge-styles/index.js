const { createWriteStream, createReadStream } = require('fs');
const { readdir } = require('fs/promises');
const { resolve, extname } = require('path');

const DIR = 'styles';

async function buildStyles(dir) {
  const dirPath = resolve(__dirname, dir);
  const fileNames = await readdir(dirPath, { withFileTypes: true });
  const filePaths = fileNames.reduce((p, c) => {
    const path = resolve(dirPath, c.name);
    if (!c.isFile() || extname(path) !== '.css') return p;
    return [...p, path];
  }, []);
  const stream = createWriteStream(resolve(__dirname, 'project-dist', 'bundle.css'));
  await Promise.all(filePaths.map((filePath) => createReadStream(filePath).pipe(stream)));
}

buildStyles(DIR);
