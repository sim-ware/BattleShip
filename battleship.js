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
// Generate Ships Coordinates // // // // // // // // // // // // // // // // // // // // //
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
// Plot Ships on Grid
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
      result = true;
    }
  });
  return result;
}
//
let battleshipAlreadySunk = false;
let destroyer1AlreadySunk = false;
let destroyer2AlreadySunk = false;
const doesShotSinkBattleShip = (movesSoFarArray) => {
  const hitTallies = [];
  movesSoFarArray.forEach((moveSoFar) => {
    hitTallies.push(moveSoFar[1])
  });
  let numOfBs = hitTallies.filter(function(x){ return x === "HIT-B"; }).length;
  if (numOfBs === 5 && !battleshipAlreadySunk) {
    console.log('Battleship SUNK');
    battleshipAlreadySunk = true;
  }
  let numOfD1s = hitTallies.filter(function(x){ return x === "HIT-D1"; }).length;
  if (numOfD1s === 4 && !destroyer1AlreadySunk) {
    console.log('Destroyer1 SUNK');
    destroyer1AlreadySunk = true;
  }
  let numOfD2s = hitTallies.filter(function(x){ return x === "HIT-D2"; }).length;
  if (numOfD2s === 4 && !destroyer2AlreadySunk) {
    console.log('Destroyer2 SUNK');
    destroyer2AlreadySunk = true;
  }
}
//
const fire = (x, y, grid) => {
  // hasShotBeenFiredBefore?
  if ( hasShotBeenFiredBefore(movesSoFar, x, y) ) {
    console.log('ALREADY SHOT HERE, CHOOSE AGAIN');
    return;
  }
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
  doesShotSinkBattleShip(movesSoFar);
  return [x, y];
}

module.exports = {
    allShips: allShips,
    generateGrid: generateGrid
};
