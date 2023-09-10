// vv=======Mock Test=======vv
const objMock = (obj) => {
  return (obj = {
    name: "John",
    age: 30,
  });
};
// ^^=======Mock Test=======^^

//! Array Coordinates
const arrX = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const arrY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const combCoordXY = (arrX, arrY) => {
  const arrComb = [];
  arrX.forEach((elementX) => {
    arrY.forEach((elementY) => arrComb.push(`${elementX}${elementY}`));
  });
  return arrComb;
};

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
    node.ship.hit();
  }
}

// vv==================Export=======================vv
module.exports = {
  verifyCoordGridVertical,
  verifyCoordGridHorizontal,
  calcNeigborVertical,
  convert2Unicode,
  calcNeigborHorizontal,
  objMock,
  ShipCreator,
  GameBoard,
  combCoordXY,
  compareCoords,
  arrX,
  arrY,
};
// export { sumAll, multiAll, objMock, ships };
