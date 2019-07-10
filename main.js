const battleship = require('./battleship.js');
const {Player} = require('./player.js');

const playerOne = new Player()
playerOne.grid = battleship.generateGrid()
// playerOne.ships = battleship.generateShipCoordinates()
playerOne.ships = { battleship: [ [ 1, 0 ], [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 1, 4 ] ],
                    destroyer1: [ [ 3, 0 ], [ 3, 1 ], [ 3, 2 ], [ 3, 3 ] ],
                    destroyer2: [ [ 5, 0 ], [ 5, 1 ], [ 5, 2 ], [ 5, 3 ] ] }
battleship.plotShipCoordinates(playerOne.ships, playerOne.grid);
const playerTwo = new Player()
playerTwo.grid = battleship.generateGrid()
// playerTwo.ships = battleship.generateShipCoordinates()
playerTwo.ships = { battleship: [ [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 0, 6 ], [ 0, 7 ] ],
                    destroyer1: [ [ 4, 3 ], [ 5, 3 ], [ 6, 3 ], [ 7, 3 ] ],
                    destroyer2: [ [ 1, 3 ], [ 1, 4 ], [ 1, 5 ], [ 1, 6 ] ] }
battleship.plotShipCoordinates(playerTwo.ships, playerTwo.grid);


battleship.fire(4,3, playerTwo.grid, playerOne.movesSoFar);
battleship.fire(3,0, playerOne.grid, playerTwo.movesSoFar);
battleship.fire(5,3, playerTwo.grid, playerOne.movesSoFar);
battleship.fire(3,1, playerOne.grid, playerTwo.movesSoFar);
battleship.fire(6,3, playerTwo.grid, playerOne.movesSoFar);
battleship.fire(3,2, playerOne.grid, playerTwo.movesSoFar);
battleship.fire(7,3, playerTwo.grid, playerOne.movesSoFar);
battleship.fire(3,3, playerOne.grid, playerTwo.movesSoFar);
// battleship.fire(8,3, playerTwo.grid, playerOne.movesSoFar);
// battleship.fire(3,4, playerOne.grid, playerTwo.movesSoFar);
// battleship.fire(8,3, playerTwo.grid, playerOne.movesSoFar);
// battleship.fire(3,4, playerOne.grid, playerTwo.movesSoFar);

//
//
// LOOP
// --each player fires
// --return feedback: HIT or MISS
// --return feedback: check whether any have SUNK
// --return feedback: check whether ALL are SUNK
// ----in which case: END GAME
//
console.log('PLAYER-ONE--------------------------');
console.log(playerOne.ships);
console.log(playerOne.movesSoFar);
console.log(playerOne.grid);
console.log('PLAYER-TWO--------------------------');
console.log(playerTwo.ships);
console.log(playerTwo.movesSoFar);
console.log(playerTwo.grid);
// console.log(playerOne);
// console.log(playerTwo);








// const readline = require('readline');
// var rl = readline.createInterface(process.stdin, process.stdout);
//
// let name = false
// rl.question('Welcome aboard, Captain! What is your name? ', (answer) => {
//   console.log(`Nice to meet you, Captain ${answer}.`);
//   name = answer;
//   rl.close();
// });
//
// if (name) { console.log(`Name: ${name} entered.`);}
// console.log(`Name: ${name} entered.`);
//
// console.log('Here is what the radar shows:');
//
// console.log(battleship.allShips);
// const grid1 = battleship.generateGrid();
// console.log(grid1);
//
// var readline = require('readline');
// var rl = readline.createInterface(process.stdin, process.stdout);
// rl.setPrompt('guess> ');
// rl.prompt();
// rl.on('line', function(line) {
//     if (line === "right") rl.close();
//     rl.prompt();
// }).on('close',function(){
//     process.exit(0);
// });
