const { mkdir, rm, copyFile, readdir, stat, readFile } = require('fs/promises');
const { resolve, dirname, relative } = require('path');

const getFullfilled = async (promises) => {
  const settled = await Promise.allSettled(promises);
  const fulfilled = settled.filter(({ status }) => status === 'fulfilled');
  return fulfilled.map(({ value }) => value);
};

const removeFile = (path) => {
  return rm(path, { recursive: true })
    .then(() => `deleted: ${path}`)
    .catch((e) => console.error(e.message));
};

const cloneFile = async (srcPath, destPath) => {
  await mkdir(dirname(destPath), { recursive: true });
  const stats = await stat(srcPath);
  return (stats.isFile() ? copyFile(srcPath, destPath) : mkdir(destPath, { recursive: true }))
    .then(() => `new file: ${destPath}`)
    .catch((e) => console.error(e.message));
};

const isSameFile = async (file1, file2) => {
  const buffer1 = await readFile(file1);
  const buffer2 = await readFile(file2);
  return !Buffer.compare(buffer1, buffer2);
};

const getFilePaths = async (dirPath) => {
  const dirents = await readdir(dirPath, { withFileTypes: true });
  const promises = dirents.map(async (file) => {
    const filePath = resolve(dirPath, file.name);
    if (file.isFile()) return filePath;
    const filePaths = await getFilePaths(filePath).catch((e) => console.error(`'${e.path}' is not a directory`) || []);
    return [filePath, ...filePaths];
  });
  return (await getFullfilled(promises)).flat();
};

const getFileMap = async (srcDirPath, destDirPath) => {
  const srcFullPaths = await getFilePaths(srcDirPath);
  const copyFullPaths = await getFilePaths(destDirPath);

  const fileMap = new Map();
  srcFullPaths.forEach((fullPath) => fileMap.set(relative(srcDirPath, fullPath), new Map([['src', fullPath]])));
  copyFullPaths.forEach((fullPath) => {
    const relativePath = relative(destDirPath, fullPath);
    const fileData = fileMap.get(relativePath) ?? new Map();
    fileMap.set(relativePath, fileData.set('dest', fullPath));
  });
  return fileMap;
};

const copyDir = async (srcDirPath, destDirPath) => {
  await mkdir(destDirPath, { recursive: true });
  const fileMap = await getFileMap(srcDirPath, destDirPath);

  const promises = [...fileMap].map(async ([relativePath, fileData]) => {
    const src = fileData.get('src');
    const dest = fileData.get('dest');
    if (!src && dest) return removeFile(dest);
    if (src && !dest) return cloneFile(src, resolve(destDirPath, relativePath));

    const bothFilesPromises = [src, dest].map(async (path) => (await stat(path)).isFile());
    const bothFiles = (await getFullfilled(bothFilesPromises)).every(Boolean);

    if (!bothFiles || (await isSameFile(src, dest))) return `untouched: ${relativePath}`;

    await removeFile(dest);
    return cloneFile(src, resolve(destDirPath, relativePath)).then(() => `modified: ${relativePath}`);
  });

  return getFullfilled(promises);
};

copyDir(resolve(__dirname, 'files'), resolve(__dirname, 'files-copy')).then(console.log);
