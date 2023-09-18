const { readdir, stat } = require('fs/promises');
const { resolve, parse } = require('path');

const getFileData = async (file, dirPath) => {
  if (!file.isFile()) throw new Error(`${file.name} is not a file`);
  const filePath = resolve(dirPath, file.name);
  const { size } = await stat(filePath);
  const { name, ext } = parse(filePath);
  return { name, ext, size };
};
const formatFileData = ({ name, ext, size }) => `${name} - ${ext.slice(1)} - ${(size / 1024).toFixed(3)}kb`;

const getFormattedFileData = async (dir) => {
  const dirPath = resolve(__dirname, dir);
  const files = await readdir(dirPath, { withFileTypes: true });
  const fileData = await Promise.allSettled(files.map((file) => getFileData(file, dirPath)));
  return fileData.reduce((formattedFileData, { status, value }) => {
    if (status === 'fulfilled') formattedFileData.push(formatFileData(value));
    return formattedFileData;
  }, []);
};

getFormattedFileData('secret-folder').then((formattedFileData) => console.log(formattedFileData.join('\n')));
