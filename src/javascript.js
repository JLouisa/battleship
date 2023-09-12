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

// ^^================================================^^

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
  constructor(arrXY) {
    this.coordXY = "Head";
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
      node.DOM.addEventListener("click", () => {
        gameLoop(node);
      });
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
        let current = verifyCoordGridHorizontal(coordXY, stats);
        let rightNeihbor = "rightNeihbor";
        return this.createMultipleShips(current, ship, stats, rightNeihbor);
        break;
      }
      case "V": {
        let current = verifyCoordGridVertical(coordXY, stats);
        let botNeihbor = "botNeihbor";
        return this.createMultipleShips(current, ship, stats, botNeihbor);
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
      console.log("All ships are sunken!");
      turnManager.currentPlayer = "end";
      // endGameReset(turnManager.currentPlayer);
      return true;
    } else {
      return false;
    }
  }
  reset() {
    this.missedAttackArr = [];
    this.hitAttackArr = [];
    this.attackedNodeArr = [];
    this.allShipArr = [];
    this.inOrderArr = [];
    this.inOrderArr = [...this.inOrder()];
  }
}

// let yourturn = true;

function gameLoop(node) {
  console.log(node.coordXY);
  gameBoardOne.renderContent();
  gameBoardTwo.renderContent();
  if (turnManager.currentPlayer === PLAYER) {
    attack(node.coordXY);
  } else {
    attackCPU(arrCPU);
  }
}

function endGameReset(winner) {
  console.log(`${winner} has won the game!`);
  gameBoardOne.inOrderArr.forEach((node) => {
    node.ship = null;
    node.display = "";
    node.DOM.textContent = "";
    node.DOM.className = "";
  });
  gameBoardTwo.inOrderArr.forEach((node) => {
    node.ship = null;
    node.display = "";
    node.DOM.textContent = "";
    node.DOM.className = "";
  });
  gameBoardOne.placeShip();
  gameBoardTwo.placeShip();

  gameBoardOne.reset();
  gameBoardTwo.reset();

  shipGridArr1.forEach((ship) => gameBoardOne.placeShip(ship[0], ship[1], ship[2], ship[3]));
  shipGridArr2.forEach((ship) => gameBoardTwo.placeShip(ship[0], ship[1], ship[2], ship[3]));

  gameBoardOne.render(playerGridContentEl);
  gameBoardTwo.render(CPUGridContentEl);

  turnManager.currentPlayer = PLAYER;
}

//! Player
class Player {
  constructor(name, turn) {
    this.name = name;
    this.turn = turn;
  }
}

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

let gameBoardOne = new GameBoard(arrXY);
let gameBoardTwo = new GameBoard(arrXY);

shipGridArr1.forEach((ship) => gameBoardOne.placeShip(ship[0], ship[1], ship[2], ship[3]));
shipGridArr2.forEach((ship) => gameBoardTwo.placeShip(ship[0], ship[1], ship[2], ship[3]));
// ^^===========================================^^

// Constants to represent players
const PLAYER = "PLAYER";
const CPUP = "CPU";

//! Attacking
console.log("It's Player's turn");
console.log("Type attack('Coordinates')");

// Function to generate a random index between min and max (inclusive)
const getRandomIndex = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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
        attackCPU(arrCPU);
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
        attackCPU(arrCPU);
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

// =====================Start Game=======================

gameBoardOne.render(playerGridContentEl);
gameBoardTwo.render(CPUGridContentEl);

// vv==================Export=======================vv
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
