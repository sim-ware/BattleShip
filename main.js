const readline = require('readline');
var battleship = require('./battleship.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Welcome aboard, Captain! What is your name? ', (answer) => {
  console.log(`Nice to meet you, Captain ${answer}.`);
  rl.close();
});

console.log('Here is what the radar shows:');

console.log(battleship.allShips);
// const grid1 = battleship.generateGrid();
// console.log(grid1);
