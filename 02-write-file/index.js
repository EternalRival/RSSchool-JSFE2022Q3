const { createWriteStream } = require('fs');
const { resolve } = require('path');
const { createInterface } = require('readline');

const writeToFile = (fileName, welcomeMessage, exitMessage) => {
  const stream = createWriteStream(resolve(__dirname, fileName));
  console.info(welcomeMessage);
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  rl.on('close', () => {
    console.info(`\r${exitMessage}`);
    process.exit(0);
  });
  rl.on('line', (input) => {
    if (input === 'exit') rl.close();
    else stream.write(input + '\n');
    rl.prompt();
  });
  rl.prompt();
};

const wrapWithBorder = (message) => {
  const lines = message.split('\n');
  const maxLength = Math.max(...lines.map((line) => line.length));
  const border = '═'.repeat(maxLength + 2);
  return [`╔${border}╗`, ...lines.map((line) => `║ ${line.padEnd(maxLength)} ║`), `╚${border}╝`].join('\n');
};

writeToFile(
  'some-text.txt',
  wrapWithBorder('Hello! Enter some text for writing to the file.\n(To exit, press Ctrl+C or type `exit`)'),
  wrapWithBorder('Thx for your cooperation!'),
);
