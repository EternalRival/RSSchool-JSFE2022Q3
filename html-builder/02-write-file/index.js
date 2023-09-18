const fs = require('fs');
const path = require('path');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const sayWelcome = () => {
  const hello = 'Hello! Enter some text for writing to the file.';
  const info = "(To exit, press Ctrl+C or type 'exit')".padEnd(hello.length, ' ');
  const separator = '═'.repeat(hello.length + 2);
  const greetings = `╔${separator}╗\n║ ${hello} ║\n║ ${info} ║\n╚${separator}╝`;
  console.log(greetings);
};
const sayExitMessage = () => {
  process.stdout.cursorTo(0);
  process.stdout.write('Thx for your cooperation!');
  process.exit(0);
};

const fileName = 'some-text.txt'
const filePath = path.resolve(__dirname, fileName);
const stream = fs.createWriteStream(filePath);

sayWelcome();
rl.prompt();

rl.on('line', (input) => {
  rl.prompt();
  switch (input) {
    case 'exit':
      rl.close();
      break;
    default:
      stream.write(input + '\n');
  }
}).on('close', () => {
  sayExitMessage();
});
