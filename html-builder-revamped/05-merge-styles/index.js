const { readdir, readFile, writeFile, mkdir } = require('fs/promises');
const { resolve, extname, dirname } = require('path');

const getFullfilled = async (promises) => {
  const settled = await Promise.allSettled(promises);
  const fulfilled = settled.filter(({ status }) => status === 'fulfilled');
  return fulfilled.map(({ value }) => value);
};

const getFilesByExtension = async (dirPath, extension) => {
  const files = await readdir(dirPath, { withFileTypes: true });
  return files.filter((file) => file.isFile() && extname(file.name) === extension);
};

const mergeStyles = async (srcDir, destPath) => {
  const styleFiles = await getFilesByExtension(srcDir, extname(destPath));
  const promises = styleFiles.map((file) => readFile(resolve(srcDir, file.name)));
  const bundle = (await getFullfilled(promises)).join('\n');
  await mkdir(dirname(destPath), { recursive: true });
  await writeFile(destPath, bundle);
  return `merged: [${styleFiles.map(({ name }) => name).join(', ')}] -> ${destPath}`;
};

mergeStyles(resolve(__dirname, 'styles'), resolve(__dirname, 'project-dist', 'bundle.css')).then(console.log);
