// vv=======Mock Test=======vv
function objMock(obj) {
  return (obj = {
    name: "John",
    age: 30,
  });
}
// ^^=======Mock Test=======^^

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

//! Array Coordinates
const coordY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const coordX = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

function combCoordXY(arrX, arrY) {
  const arrComb = [];
  arrX.forEach((elementX) => {
    arrY.forEach((elementY) => arrComb.push([`${elementX}${elementY}`]));
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

//! Compare Coordinates and determine which is bigger
const CompareCoords = (coord1, coord2) => {
  if (coord1[0] > coord2[0]) {
    return true;
  }
  if (coord1[0] < coord2[0]) {
    return false;
  }
  if (coord1[0] === coord2[0]) {
    return null;
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

//! Create GameBoard Class
class GameBoard {
  constructor(arrXY) {
    this.coord = "Head";
    this.root = createTree(arrXY, 0, arrXY.length - 1);
  }
  // Find node in BST
  find(coordXY, current = this.root) {
    if (coordXY === current) {
      return current;
    }
    if (CompareCoords(coordXY, current)) {
      current = current.left;
      return this.find(coordX, current);
    }
  }
  // Place ships at specific coordinates
  placeShip(coordXY) {}
}

// vv==================Export=======================vv
module.exports = { objMock, ShipCreator, GameBoard, combCoordXY, CompareCoords };
// export { sumAll, multiAll, objMock, ships };
