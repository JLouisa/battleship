// vv=======Mock Test=======vv
const objMock = (obj) => {
  return (obj = {
    name: "John",
    age: 30,
  });
};
// ^^=======Mock Test=======^^

// ^^================================================^^

//! DOM Caches
const playerBoxEl = document.querySelector(".playerBox");
const CPUBoxEl = document.querySelector(".CPUBox");

const playerGridContentEl = document.querySelector(".playerGridContent");
const CPUGridContentEl = document.querySelector(".CPUGridContent");

const winningBoardEl = document.getElementById("winningBoard");
const winnerEl = document.querySelectorAll(".winner");
const winTextEl = document.getElementById("winText");

const newGameBtn = document.getElementById("newGame");
const randomBtn = document.getElementById("randomBtn");
const resetBtn = document.getElementById("resetBtn");
const startBtn = document.getElementById("startBtn");

// ^^================================================^^

//! Listen to the DOM
newGameBtn.addEventListener("click", () => {
  winningBoardEl.style.display = "none";
  endGameReset();
});
randomBtn.addEventListener("click", () => {
  endGameReset();
  random();
});
// startBtn.addEventListener("click", );
resetBtn.addEventListener("click", endGameReset);

//! Combine array X and array Y
const combCoordXY = (arrX, arrY) => {
  const arrComb = [];
  arrX.forEach((elementX) => {
    arrY.forEach((elementY) => arrComb.push(`${elementX}${elementY}`));
  });
  return arrComb;
};

//! Array Coordinates
const arrX = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const arrY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const arrXY = [...combCoordXY(arrX, arrY)];

//! Create the BST module
const createTree = (arrXY, beginIndex, lastIndex) => {
  if (beginIndex > lastIndex) {
    return null;
  } else {
    const mid = Number(Math.floor((beginIndex + lastIndex) / 2));
    const node = new Node(arrXY[mid]);
    node.left = createTree(arrXY, beginIndex, mid - 1);
    node.right = createTree(arrXY, mid + 1, lastIndex);
    return node;
  }
};

//! Compare Coordinates and determine arg1 is bigger than arg2
const compareCoords = (coord1, coord2) => {
  if (coord1 > coord2) {
    return true;
  }
  if (coord1 < coord2) {
    return false;
  }
  if (coord1 === coord2) {
    return "same";
  }
};

//! Semi-Caesar Cipher // Calculate neigbor Node Coordinates
const convert2Unicode = (coordX, change) => {
  let unicode = coordX.charCodeAt(0);
  return String.fromCharCode(unicode + change);
};

const calcNeigborHorizontal = (coordXY, change) => {
  let newCoord = coordXY.split("");
  if ((newCoord[0] === "A" && change === -1) || (newCoord[0] === "J" && change === 1)) {
    return null;
  }
  newCoord[0] = convert2Unicode(newCoord[0], change);
  return newCoord.join("");
};

const calcNeigborVertical = (coordXY, change) => {
  let newCoord = coordXY.split("");
  if ((newCoord[1] === "0" && change === -1) || (newCoord[1] === "9" && change === 1)) {
    return null;
  }
  newCoord[1] = Number(newCoord[1]) + change;
  return newCoord.join("");
};

//! Verify Coordinates fits on grid
const verifyCoordGridVertical = (coordXY, stats) => {
  if (coordXY < `${coordXY[0]}${10 - stats}`) {
    return coordXY;
  } else return `${coordXY[0]}${10 - stats}`;
};

const verifyCoordGridHorizontal = (coordXY, stats) => {
  if (coordXY > `${convert2Unicode("K", -stats)}${coordXY[1]}`) {
    return `${convert2Unicode("K", -stats)}${coordXY[1]}`;
  } else return coordXY;
};

//! Create Nodes for GameBoard
class Node {
  constructor(coordXY) {
    this.coordXY = coordXY;
    this.left = null;
    this.right = null;
    this.ship = null;
    this.display = "";
    this.DOM = document.createElement("div");
    this.neigborNodes = {
      topNeihbor: calcNeigborVertical(coordXY, -1),
      botNeihbor: calcNeigborVertical(coordXY, 1),
      leftNeihbor: calcNeigborHorizontal(coordXY, -1),
      rightNeihbor: calcNeigborHorizontal(coordXY, 1),
    };
  }
}

//! Create Ships objects with different properties
class ShipCreator {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.health = length;
    this.sunken = false;
  }
  //When the ship has been hit
  hit() {
    this.health--;
    this.isSunk();
  }
  //See if the ship is already sunken
  isSunk() {
    if (this.health <= 0) {
      this.sunken = true;
    }
  }
}

//! Create GameBoard Class
class GameBoard {
  constructor(arrXY, user) {
    this.coordXY = "Head";
    this.user = user;
    this.root = createTree(arrXY, 0, arrXY.length - 1);
    this.missedAttackArr = [];
    this.hitAttackArr = [];
    this.attackedNodeArr = [];
    this.allShipArr = [];
    this.inOrderArr = [...this.inOrder()];
  }
  // Create inOrder Array
  inOrder() {
    let current = this.root;
    let traversal = [];
    return this.getInOrder(current, traversal);
  }
  getInOrder(node, arr) {
    if (node === null) {
      return;
    } else {
      this.getInOrder(node.left, arr);
      if (this.user) {
        node.DOM.addEventListener("click", () => {
          gameLoop(node);
        });
      }
      arr.push(node);
      this.getInOrder(node.right, arr);
      return arr;
    }
  }
  // Render the array in DOM
  render(board) {
    this.inOrderArr.forEach((node) => {
      board.appendChild(node.DOM);
      if (node.ship) {
        node.DOM.classList.add("myShips");
      }
    });
    this.renderContent();
  }
  renderContent() {
    this.attackedNodeArr.forEach((node) => {
      if (node.display) {
        node.DOM.textContent = node.display;
      }
      if (!node.ship) {
        node.DOM.classList = "missMyShip";
      }
      if (node.ship) {
        node.DOM.classList = "hitMyShip";
      }
    });
  }
  // Find node in BST
  find(coordXY, current = this.root) {
    if (current === null) {
      return "not found";
    }
    if (compareCoords(coordXY, current.coordXY) === "same") {
      return current;
    }
    if (compareCoords(coordXY, current.coordXY)) {
      current = current.right;
      return this.find(coordXY, current);
    } else {
      current = current.left;
      return this.find(coordXY, current);
    }
  }
  // Place ships at specific coordinates
  placeShip(coordXY, name, stats, orient) {
    let ship = new ShipCreator(name, stats);
    this.allShipArr.push(ship);

    switch (orient) {
      case "H": {
        // let current = verifyCoordGridHorizontal(coordXY, stats);
        let rightNeihbor = "rightNeihbor";
        // return this.createMultipleShips(current, ship, stats, rightNeihbor);
        return this.createMultipleShips(coordXY, ship, stats, rightNeihbor);
        break;
      }
      case "V": {
        // let current = verifyCoordGridVertical(coordXY, stats);
        let botNeihbor = "botNeihbor";
        // return this.createMultipleShips(current, ship, stats, botNeihbor);
        return this.createMultipleShips(coordXY, ship, stats, botNeihbor);
        break;
      }
    }
  }
  // PlaceShip DRY
  createMultipleShips(current, ship, stats, neihbor) {
    for (let i = 0; i < stats; i++) {
      let node = this.find(current);
      if (node === "not found") {
        return "Invalid Coordinates";
      }
      node.ship = ship;
      current = node.neigborNodes[neihbor];
    }
    return ship;
  }
  // Receive attack Controller
  receiveAttack(coordXY) {
    let node = this.find(coordXY);
    if (node.ship) {
      node.ship.hit();
      node.display = "X";
      this.hitAttackArr.push(node.coordXY);
      this.attackedNodeArr.push(node);
      console.log(`${turnManager.currentPlayer} has hit a ship. Nice hit!`);
    } else {
      node.display = "o";
      this.missedAttackArr.push(node.coordXY);
      this.attackedNodeArr.push(node);
      console.log(`${turnManager.currentPlayer} has missed`);
      turnManager.switchTurn();
    }
    this.renderContent();
    this.allShipSunkenCheck();
  }
  allShipSunkenCheck() {
    if (this.allShipArr.every((ship) => ship.sunken === true)) {
      let theWinner = turnManager.currentPlayer.slice();
      turnManager.currentPlayer = "end";
      setTimeout(() => {
        gameOver(theWinner);
      }, 1000);
    }
  }
  reset() {
    this.missedAttackArr.splice(0, this.missedAttackArr.length);
    this.hitAttackArr.splice(0, this.hitAttackArr.length);
    this.attackedNodeArr.splice(0, this.attackedNodeArr.length);
    this.allShipArr.splice(0, this.allShipArr.length);
    this.inOrderArr.splice(0, this.inOrderArr.length);
    this.inOrderArr = [...this.inOrder()];
    this.inOrderArr.forEach((node) => {
      node.ship = null;
      node.display = "";
      node.DOM.textContent = "";
      node.DOM.className = "";
    });
  }
}

//! Game Module
function gameOver(winner) {
  winningBoardEl.style.display = "block";
  winnerEl.forEach((win) => (win.textContent = winner));
  console.log("All ships are sunken!");
  console.log(`${winnerEl[0].textContent} has won the game!`);
}

function gameLoop(node) {
  if (turnManager.currentPlayer !== PLAYER) {
    return console.log("It's not your turn");
  }
  console.log(node.coordXY);
  gameBoardOne.renderContent();
  gameBoardTwo.renderContent();
  if (turnManager.currentPlayer === PLAYER) {
    attack(node.coordXY);
  } else {
    intellisense(arrCPU);
  }
}

function endGameReset() {
  gameBoardOne.reset();
  gameBoardTwo.reset();

  let grid = randomObj();

  grid.playerArr.forEach((ship) => gameBoardOne.placeShip(ship[0], ship[1], ship[2], ship[3]));
  grid.CPUArr.forEach((ship) => gameBoardTwo.placeShip(ship[0], ship[1], ship[2], ship[3]));

  gameBoardOne.render(playerGridContentEl);
  gameBoardTwo.render(CPUGridContentEl);

  turnManager.currentPlayer = PLAYER;
  arrCPU.splice(0, arrCPU.length);
  arrCPU = [...combCoordXY(arrX, arrY)];
}

//! Player
class Player {
  constructor(name, turn) {
    this.name = name;
    this.turn = turn;
  }
}

// =======================Randomize Coordinates=======================
/*
A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74
*/

//==============
let theArrayXYLimit = [
  ["A", "J", 0, 9],
  ["A", "I", 0, 8],
  ["A", "H", 0, 7],
  ["A", "G", 0, 6],
];

let coordsArray = [
  combining(theArrayXYLimit[0]),
  combining(theArrayXYLimit[1]),
  combining(theArrayXYLimit[2]),
  combining(theArrayXYLimit[3]),
];

function combining(arrXY) {
  let arr = [];
  let l1 = arrXY[0].charCodeAt(0);
  let l2 = arrXY[1].charCodeAt(0);
  for (let j = l1; j <= l2; j++) {
    for (let i = arrXY[2]; i <= arrXY[3]; i++) {
      arr.push(String.fromCharCode(j) + i);
    }
  }
  return arr;
}

function getRandomArrayItem(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}
//============

//! Verification array
let checkArray = [];

//! Randomize grid generator
// Function to get a random integer between min and max (inclusive)
function getRandomIndex(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to randomly select "H" (horizontal) or "V" (vertical)
function VorH() {
  return getRandomIndex(1, 4) <= 2 ? "H" : "V";
}

// Function to generate an array of random ship data
function randomArrNums() {
  // Arrays to store ship names and their corresponding lengths
  const shipNames = ["Dreadnought", "Bretagne", "Mikasa", "Kongo", "Yamato", "King", "Monitor", "Nagato"];
  const coordsXYs = ["D9", "B7", "J2", "E0", "A1", "H7", "G4", "B4"];
  const shipLengths = [4, 3, 3, 3, 2, 2, 2, 1];
  const randomArr = [];

  // Generate data for 8 ships
  for (let i = 0; i < 8; i++) {
    const shipName = shipNames[i];
    const shipLength = shipLengths[i];
    const coordsXY = getRandomArrayItem(coordsArray[shipLength - 1]);
    const shipOrientation = VorH().slice();

    // Check Validity
    let theCoordXY = checkCoordValidity(coordsXY, shipLength, shipOrientation);

    // Add ship data to the randomArr array
    randomArr.push([theCoordXY[0], shipName, theCoordXY[1], theCoordXY[2]]);
  }
  console.log(randomArr);
  checkArray = [];
  return randomArr;
}

// Function to generate a random object containing player and CPU ship data
function randomObj() {
  // Create arrays of random ship data for the player and CPU
  // Create an object to hold the ship data
  const obj = {
    playerArr: [...randomArrNums()],
    CPUArr: [...randomArrNums()],
  };

  return obj;
}

//-----------------------------------------------------
function checkCoordValidity(coordXY, num, orient) {
  let tempArr = createArrayfromXY(coordXY, num, orient);
  let allAvaidable = true;

  // Check if any of the coordinates are already occupied
  if (tempArr.some((cord) => checkArray.includes(cord))) {
    allAvaidable = false;
  } else {
    allAvaidable = true;
  }

  if (allAvaidable === true) {
    checkArray.push(...tempArr);
    return [coordXY, num, orient];
  }
  return checkCoordValidity(getRandomArrayItem(coordsArray[num - 1]), num, orient);
}

function createArrayfromXY(cXY, num, ornt) {
  let array = [];
  let temp = cXY.slice();

  if (ornt === "H") {
    for (let i = 0; i < num; i++) {
      temp = cXY.split("");
      temp[0] += i;
      array.push(temp.join(""));
    }
    return array;
  }

  if (ornt === "V") {
    for (let i = 0; i < num; i++) {
      temp = cXY.split("");
      temp[1] += i;
      array.push(temp.join(""));
    }
    return array;
  }
}
//-----------------------------------------------------

// =======================Start Up=======================
const shipOne = ["D9", "Dreadnought", 4, "H"];
const shipBigOne = ["B7", "Bretagne", 3, "H"];
const shipBigTwo = ["J2", "Mikasa", 3, "V"];
const shipMediumOne = ["E0", "Kongo", 2, "H"];
const shipMediumTwo = ["A1", "Yamato", 2, "H"];
const shipSmallOne = ["H1", "King", 1, "H"];
const shipSmallTwo = ["G4", "Monitor", 1, "H"];
const shipSamllThree = ["B4", "Nagato", 1, "H"];
const shipGridArr1 = [
  shipOne,
  shipBigOne,
  shipBigTwo,
  shipMediumOne,
  shipMediumTwo,
  shipSmallOne,
  shipSmallTwo,
  shipSamllThree,
];

const shipOne2 = ["D8", "Dreadnought", 4, "H"];
const shipBigOne2 = ["J0", "Bretagne", 3, "V"];
const shipBigTwo2 = ["G2", "Mikasa", 3, "V"];
const shipMediumOne2 = ["E3", "Kongo", 2, "V"];
const shipMediumTwo2 = ["A1", "Yamato", 2, "H"];
const shipSmallOne2 = ["H0", "King", 1, "H"];
const shipSmallTwo2 = ["E1", "Monitor", 1, "H"];
const shipSamllThree2 = ["I8", "Nagato", 1, "H"];

const shipGridArr2 = [
  shipOne2,
  shipBigOne2,
  shipBigTwo2,
  shipMediumOne2,
  shipMediumTwo2,
  shipSmallOne2,
  shipSmallTwo2,
  shipSamllThree2,
];

const playerOne = new Player("Player 1", true);
const CPU = new Player("CPU", false);

let arrCPU = [...combCoordXY(arrX, arrY)];

const gameBoardOne = new GameBoard(arrXY, false);
const gameBoardTwo = new GameBoard(arrXY, true);

let grid = randomObj();

function random() {
  grid = randomObj();

  grid.playerArr.forEach((ship) => gameBoardOne.placeShip(ship[0], ship[1], ship[2], ship[3]));
  grid.CPUArr.forEach((ship) => gameBoardTwo.placeShip(ship[0], ship[1], ship[2], ship[3]));
}

shipGridArr1.forEach((ship) => gameBoardTwo.placeShip(ship[0], ship[1], ship[2], ship[3]));
shipGridArr2.forEach((ship) => gameBoardOne.placeShip(ship[0], ship[1], ship[2], ship[3]));

// ^^===========================================^^

// Constants to represent players
const PLAYER = "Player";
const CPUP = "CPU";

//! Attacking
console.log("It's Player's turn");
console.log("Type attack('Coordinates')");

// Function to generate a random index between min and max (inclusive)
function getRandomIndex(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function for CPU's attack
const attackCPU = (arr) => {
  // Check if it's the CPU's turn
  if (turnManager.currentPlayer !== CPUP) {
    return;
  }
  // Get a random index in the attack array
  let index = getRandomIndex(0, arr.length - 1);

  // Check if the CPU's attack is a miss
  if (gameBoardOne.missedAttackArr.includes(arr[index]) || gameBoardOne.hitAttackArr.includes(arr[index])) {
    // If it's a miss, recursively call attackCPU until a valid attack is found
    return attackCPU(arr);
  } else {
    // If it's a hit, pass the attack coordinates to the playersTurn function
    console.log(`CPU attacked Coordinates ${arr[index]}`);
    gameBoardOne.receiveAttack(arr[index]);
    arr.splice(index, 1);
    // turnManager.switchTurn();
    console.log(`It's ${turnManager.currentPlayer}'s turn`);
    if (turnManager.currentPlayer === CPUP) {
      // Schedule the CPU's turn after a delay of 2000 milliseconds (2 seconds)
      setTimeout(() => {
        intellisense(arrCPU);
      }, 2000);
    }
  }
};

// Function for player's attack
const attack = (coordXY) => {
  if (gameBoardTwo.missedAttackArr.includes(coordXY) || gameBoardTwo.hitAttackArr.includes(coordXY)) {
    // Check if the player already attacked this coordinate
    return "You already attacked this coordinate, please choose another coordinate";
  }
  // Check if it's the player's turn
  if (turnManager.currentPlayer !== PLAYER) {
    return "It's not your turn!";
  }
  {
    // If it's a valid attack, pass the attack coordinates to the playersTurn function
    gameBoardTwo.receiveAttack(coordXY);

    console.log(`It's ${turnManager.currentPlayer}'s turn`);
    if (turnManager.currentPlayer === CPUP) {
      // Schedule the CPU's turn after a delay of 2000 milliseconds (2 seconds)
      setTimeout(() => {
        intellisense(arrCPU);
      }, 2000);
    }
  }
};

//Turn Logic Module
let turnManager = {
  currentPlayer: PLAYER, // Initialize with the starting player
  switchTurn: function () {
    // Logic to switch the current player
    this.currentPlayer = this.currentPlayer === PLAYER ? CPUP : PLAYER;
  },
};

// =====================Intellisense====================

// Function to get neighboring nodes of a given node
function getNeighborNodes(node) {
  const neighbors = [];
  for (const neighbor in node.neigborNodes) {
    if (node.neigborNodes.hasOwnProperty(neighbor) && node.neigborNodes[neighbor] !== null) {
      neighbors.push(node.neigborNodes[neighbor]);
    }
  }
  return neighbors;
}

// Function to find available ship options from hitAttackArr
function findShipOptions(hitAttackArr) {
  const shipOptions = [];
  hitAttackArr.forEach((coordXY) => {
    const node = gameBoardOne.find(coordXY);
    if (node.ship.health > 0) {
      shipOptions.push(...getNeighborNodes(node));
    }
  });
  return shipOptions;
}

function intellisense(arr) {
  if (gameBoardOne.hitAttackArr.length === 0) {
    attackCPU(arr);
  } else {
    const shipOptionsArr = findShipOptions(gameBoardOne.hitAttackArr);

    if (shipOptionsArr.length === 0) {
      attackCPU(arr);
    } else {
      attackCPU(shipOptionsArr);
    }
  }
}

// =====================Start Game======================

gameBoardOne.render(playerGridContentEl);
gameBoardTwo.render(CPUGridContentEl);

/* =====================Pseudo Code======================

1. Take an coordinate XY from gridXY array.
2. If orientation is "H".
      add number of coordinates from index(XY) x ship length times.
3. If orantation is "V".
      create coordinates with calcNeigborVertical function and addd to array
4. Compare the array and verify all coordinates are present in lookUpArray
5. If all coordinates are not present, repeat step 1.
6. If all coordinates are present, splice the all out the lookUpArray
   Send to ship grid after.

 vv==================Export=======================vv */
// module.exports = {
//   verifyCoordGridVertical,
//   verifyCoordGridHorizontal,
//   calcNeigborVertical,
//   convert2Unicode,
//   calcNeigborHorizontal,
//   objMock,
//   ShipCreator,
//   GameBoard,
//   combCoordXY,
//   compareCoords,
//   arrX,
//   arrY,
// };
// export { sumAll, multiAll, objMock, ships };
