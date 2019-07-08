//
// GRID // // // // // // // // // // // // // // // // // // // // // // // //
const generateGrid = () => {
  const grid = [];
  for (var i = 0; i < 10; i++) {
    const row = [];
    for (var i2 = 0; i2 < 10; i2++) { row.push(null) }
    grid.push(row)
  }
  return grid;
}
//
// allShips // // // // // // // // // // // // // // // // // // // // // // //
const allShips = [
['battleship', 5],
['destroyer', 4 ],
['destroyer', 4 ]
]
//
// randomInt // // // // // // // // // // // // // // // // // // // // // // /
const randomInt = (max) => {
  return Math.floor(Math.random() * max)
}
//
// getShipCoordinates // // // // // // // // // // // // // // // // // // // /
const getShipCoordinates = (ship) => {
  const shipLength = ship[1];
  const maxCoord = ship[0] === 'battleship' ? 5 : 6;
  const startPoint = [randomInt(maxCoord), randomInt(maxCoord)];
  const randomDirection = randomInt(2);
  const finalCoordinates = []
  // TODO: REFACTOR THE BELOW!!!
  if (randomDirection > 0) {
    finalCoordinates.push(startPoint);
    const endPoint = [startPoint[0], startPoint[1]+shipLength-1];
    for (i = (startPoint[1]+1); i < (startPoint[1]+shipLength-1); i++ ) {
      finalCoordinates.push([startPoint[0], i])
    }
    finalCoordinates.push(endPoint)
  } else {
    finalCoordinates.push(startPoint);
    const endPoint = [startPoint[0]+shipLength-1, startPoint[1]];
    for (i = (startPoint[0]+1); i < (startPoint[0]+shipLength-1); i++ ) {
      finalCoordinates.push([i, startPoint[1]])
    }
    finalCoordinates.push(endPoint)
  }
  return finalCoordinates
}
//
// areCoordinatesDuplicated // // // // // // // // // // // // // // // // // /
const areCoordinatesDuplicated = (ship1, ship2) => {
  let match = false;
  ship1.forEach((coordinate) => {
    ship2.forEach((ship2Coordinate) => {
      if (JSON.stringify(coordinate) === JSON.stringify(ship2Coordinate)) {
        match = true;
      }
    })
  })
  return match;
}
//
// Plotting Ships // // // // // // // // // // // // // // // // // // // // //
const battleship = getShipCoordinates(allShips[0])

let destroyer1 = getShipCoordinates(allShips[1])
while (areCoordinatesDuplicated(battleship, destroyer1)) {
  destroyer1 = getShipCoordinates(allShips[1])
}

let destroyer2 = getShipCoordinates(allShips[2])
while (areCoordinatesDuplicated(destroyer2, destroyer1) || areCoordinatesDuplicated(destroyer2, battleship)) {
  destroyer2 = getShipCoordinates(allShips[2])
}
// // // // // // // // // // // // // // // // // // // // // // // // // // //
// PLOT SHIPS ON GRID
const grid = generateGrid();
// TODO: TURN THE BELOW INTO FUNCTIONS!!!
battleship.forEach((coordinate) => {
  grid[coordinate[0]][coordinate[1]] = 'B';
})
destroyer1.forEach((coordinate) => {
  grid[coordinate[0]][coordinate[1]] = 'D1';
})
destroyer2.forEach((coordinate) => {
  grid[coordinate[0]][coordinate[1]] = 'D2';
})
//
const movesSoFar = [];
//

const hasShotBeenFiredBefore = (movesSoFarArray, xCoord, yCoord) => {
  let result = false
  movesSoFar.forEach((moveSoFar) => {
    if (xCoord === moveSoFar[0][0] && yCoord === moveSoFar[0][1]) {
      // console.log('HIT1');
      result = true;
    }
  });
  return result;
}

const doesShotSinkBattleShip = (movesSoFarArray, xCoord, yCoord) => {
  console.log('1:movesSoFarArray:', movesSoFarArray);
  console.log('2:xCoord:', xCoord);
  console.log('3:3yCoord:', yCoord);
}

const fire = (x, y, grid) => {
  // hasShotBeenFiredBefore?
  if ( hasShotBeenFiredBefore(movesSoFar, x, y) ) {
    console.log('ALREADY SHOT HERE, CHOOSE AGAIN');
    return;
  }
  //
  if (grid[x][y] === 'B') {
    grid[x][y] = 'HIT-B';
    movesSoFar.push([[x, y], 'HIT-B']);
  }
  if (grid[x][y] === 'D1') {
    grid[x][y] = 'HIT-D1';
    movesSoFar.push([[x, y], 'HIT-D1']);
  }
  if (grid[x][y] === 'D2') {
    grid[x][y] = 'HIT-D2';
    movesSoFar.push([[x, y], 'HIT-D2']);
  }
  if (grid[x][y] === null) {
    grid[x][y] = 'MISS';
    movesSoFar.push([[x, y], 'MISS']);
  }
  // doesShotSinkBattleShip?
  doesShotSinkBattleShip(movesSoFar, x, y);
  // check if movesSoFar has either 5 'HIT-B's OR 4 'HIT-D1/2's
  //
  return [x, y];
}
//
// fire(0,2);
// fire(2,2);
// fire(2,4);
// fire(3,5);
// fire(7,8);
// fire(9,9);
// console.log('BATTLESHIP', battleship);
// console.log('DESTROYER1', destroyer1);
// console.log('DESTROYER2', destroyer2);
// console.log('GRID');
// console.log(grid);
// console.log('movesSoFar');
// console.log(movesSoFar);
//
// ::|1|::find a way to prevent move from being fired if it already exists in movesSoFar;
// // // // // // // // // // // // // // // // // // // // // // // // // // //
// create a testGrid
const testGrid = generateGrid();
// create testShips
const testBattleship = [[ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ]];
const testDestroyer1 = [[ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ]];
const testDestroyer2 = [[ 1, 3 ], [ 1, 4 ], [ 1, 5 ], [ 1, 6 ]];

// console.log('testGrid', testGrid);
console.log('testBattleship', testBattleship);
console.log('testDestroyer1', testDestroyer1);
console.log('testDestroyer2', testDestroyer2);
testBattleship.forEach((coordinate) => {
  testGrid[coordinate[0]][coordinate[1]] = 'B';
})
testDestroyer1.forEach((coordinate) => {
  testGrid[coordinate[0]][coordinate[1]] = 'D1';
})
testDestroyer2.forEach((coordinate) => {
  testGrid[coordinate[0]][coordinate[1]] = 'D2';
})
console.log('testGridW/Ships');
// console.log(testGrid);
fire(0,2, testGrid)
// console.log('movesSoFar');
// console.log(movesSoFar);
// console.log('testGridAfter1stShotTo0,2');
// console.log(testGrid);
fire(0,3, testGrid)
// console.log('movesSoFar');
// console.log(movesSoFar);
// console.log('testGridAfter2ndShotTo0,3');
// console.log(testGrid);
fire(0,4, testGrid)
// console.log('movesSoFar');
// console.log(movesSoFar);
// console.log('testGridAfter3rdShotTo0,4');
// console.log(testGrid);
// TRY TO DISABLE IF IT HITS THE SAME SHOT NOW!!!!
// fire(0,4, testGrid)
// console.log('movesSoFar');
// console.log(movesSoFar);
// console.log('testGridAfter4rdShotDuplicateTo0,4');
// console.log(testGrid);

//
// ::|2|::find a way to sink a ship if all coordinates have been hit.
// // // // // // // // // // // // // // // // // // // // // // // // // // //
fire(0,1, testGrid)
// console.log('movesSoFar');
console.log(movesSoFar);
// console.log('testGridAfter4rdShotDuplicateTo0,4');
console.log(testGrid);













// DEEP NOTES
// Create a function that fires missiles
// if null - miss
// if ship - hit
// if ship is finally hit - sink
// -store name of ship that was hit
// -before end of function, check over whole matrix
// -- if same ship still exists
// -- (e.g. if 'B', are there any 'B's left on the grid?) -> do nothing
// -- if same ship doesn't exist, return SINK!
//
