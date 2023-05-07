const { rm, mkdir, readdir, stat, copyFile, readFile, writeFile } = require('fs/promises');
const { resolve, extname, basename, dirname, relative } = require('path');

const getFullfilled = async (promises) => {
  const settled = await Promise.allSettled(promises);
  const fulfilled = settled.filter(({ status }) => status === 'fulfilled');
  return fulfilled.map(({ value }) => value);
};

const getFilesByExtension = async (dirPath, extension) => {
  const files = await readdir(dirPath, { withFileTypes: true });
  return files.filter((file) => file.isFile() && extname(file.name) === extension);
};

const buildHtml = async ({ src, components, dest }) => {
  const extension = extname(src);

  const htmlComponentsPromises = (await getFilesByExtension(components, extension)).map(async (file) => {
    const name = `{{${basename(file.name, extension)}}}`;
    const content = await readFile(resolve(components, file.name), 'utf-8');
    return [name, content];
  });

  const [template, ...htmlComponents] = await getFullfilled([readFile(src, 'utf-8'), ...htmlComponentsPromises]);
  const output = htmlComponents.reduce((acc, item) => acc.replaceAll(...item), template);
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, output);
  return `merged: [${htmlComponents.map(([name]) => name).join(', ')}] -> ${dest}`;
};

const buildCss = async ({ src, dest }) => {
  const styleFiles = await getFilesByExtension(src, extname(dest));
  const promises = styleFiles.map((file) => readFile(resolve(src, file.name)));
  const bundle = (await getFullfilled(promises)).join('\n');
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, bundle);
  return `merged: [${styleFiles.map(({ name }) => name).join(', ')}] -> ${dest}`;
};

const buildAssets = async ({ src, dest }) => {
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
      const filePaths = await getFilePaths(filePath).catch(
        (e) => console.error(`'${e.path}' is not a directory`) || [],
      );
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
  await copyDir(src, dest);
  return `copied: ${src} -> ${dest}`;
};

const buildPage = (pathList) => {
  return getFullfilled([buildHtml(pathList.html), buildCss(pathList.css), buildAssets(pathList.assets)]);
};

buildPage({
  html: {
    src: resolve(__dirname, 'template.html'),
    components: resolve(__dirname, 'components'),
    dest: resolve(__dirname, 'project-dist', 'index.html'),
  },
  css: {
    src: resolve(__dirname, 'styles'),
    dest: resolve(__dirname, 'project-dist', 'style.css'),
  },
  assets: {
    src: resolve(__dirname, 'assets'),
    dest: resolve(__dirname, 'project-dist', 'assets'),
  },
}).then((res) => console.log(res.join('\n')));
