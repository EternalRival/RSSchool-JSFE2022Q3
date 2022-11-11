const { mkdir, rm, copyFile, readdir, stat } = require('fs/promises');
const { resolve, dirname } = require('path');

const DIR = 'files';

async function getFilePaths(dir) {
  const fileNames = await readdir(dir);
  const filePaths = fileNames.map((v) => resolve(dir, v));

  return filePaths.reduce(async (p, c) => {
    if ((await stat(c)).isFile()) return [...(await p), c];
    return [...(await p), ...(await getFilePaths(c))];
  }, []);
}

async function copyDir(dir) {
  const dirPath = resolve(__dirname, dir);
  const copyPath = `${dirPath}-copy`;
  await rm(copyPath, { recursive: true, force: true });
  await mkdir(copyPath, { recursive: true });
  const filePaths = await getFilePaths(dirPath);

  await Promise.all(
    filePaths.map(async (v) => {
      const dest = v.replace(dirPath, copyPath);
      await mkdir(dirname(dest), { recursive: true });
      return copyFile(v, dest);
    }),
  );
}

console.log('Copying files…');
copyDir(DIR).then(() => {
  console.log('Copying completed!');
});
