const { createReadStream } = require('fs');
const { resolve } = require('path');

const filePath = resolve(__dirname, './text.txt');

const stream = createReadStream(filePath, 'utf-8');

stream.on('data', (chunk) => {
  console.log(chunk);
});
