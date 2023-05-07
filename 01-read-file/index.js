const { resolve } = require('path');
const { createReadStream } = require('fs');

createReadStream(resolve(__dirname, 'text.txt'), 'utf-8').on('data', console.info);
