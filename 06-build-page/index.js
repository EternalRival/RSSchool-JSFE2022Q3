const { createReadStream, createWriteStream } = require('fs');
const { rm, mkdir, readdir } = require('fs/promises');
const { resolve, extname, basename } = require('path');

const distName = 'project-dist';

async function buildLayout(distName) {
  const distPath = resolve(__dirname, distName);
  await rm(distPath, { recursive: true, force: true });
  await mkdir(distPath, { recursive: true });
  buildHTML(
    resolve(distPath, 'index.html'),
    resolve(__dirname, 'template.html'),
    resolve(__dirname, 'components'),
  );
  buildStyles(resolve(distPath, 'style.css'), resolve(__dirname, 'styles'));
}

async function buildHTML(bundlePath, templatePath, componentsDirPath) {
  const template = { path: templatePath };
  template.content = await getFileContent(template.path);

  const components = await getComponents(componentsDirPath, '.html');

  for (const component of components) {
    template.content = template.content.replaceAll(`{{${component.name}}}`, component.content);
  }

  const stream = createWriteStream(bundlePath);
  stream.write(template.content);
}

async function getComponents(dirPath, ext) {
  const files = await readdir(dirPath, { withFileTypes: true });
  const components = files.reduce(async (p, c) => {
    const path = resolve(dirPath, c.name);
    if (!c.isFile() || extname(path) !== ext) return p;
    const content = await getFileContent(path);
    const name = basename(path, ext);
    return [...(await p), { name, path, content }];
  }, []);
  return components;
}

function getFileContent(path) {
  return new Promise(function (res) {
    let content = '';
    const stream = createReadStream(path, 'utf-8');
    stream.on('data', (chunk) => {
      content += chunk;
    });
    stream.on('end', () => res(content));
  });
}

async function buildStyles(bundlePath, componentsPath) {
  const fileNames = await readdir(componentsPath, { withFileTypes: true });
  const filePaths = fileNames.reduce((p, c) => {
    const path = resolve(componentsPath, c.name);
    if (!c.isFile() || extname(path) !== '.css') return p;
    return [...p, path];
  }, []);
  const writeStream = createWriteStream(bundlePath);
  const readStreams = filePaths.map((filePath) => createReadStream(filePath).pipe(writeStream));
}

buildLayout(distName);
