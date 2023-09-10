// vv=======Mock Test=======vv
function objMock(obj) {
  return (obj = {
    name: "John",
    age: 30,
  });
}
// ^^=======Mock Test=======^^

//! Array Coordinates
const arrX = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const arrY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function combCoordXY(arrX, arrY) {
  const arrComb = [];
  arrX.forEach((elementX) => {
    arrY.forEach((elementY) => arrComb.push(`${elementX}${elementY}`));
  });
  return arrComb;
}

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

//! Create Nodes for GameBoard
class Node {
  constructor(coordXY) {
    this.coordXY = coordXY;
    this.left = null;
    this.right = null;
    this.ship = null;
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
  placeShip(coordXY, name, stats) {
    let node = this.find(coordXY);
    if (node === "not found") {
      return "Invalid Coordinates";
    }
    node.ship = new ShipCreator(name, stats);
    return node;
  }
}

// vv==================Export=======================vv
module.exports = { objMock, ShipCreator, GameBoard, combCoordXY, compareCoords };
// export { sumAll, multiAll, objMock, ships };
