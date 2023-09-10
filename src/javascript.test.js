const {
  convert2Unicode,
  objMock,
  ShipCreator,
  GameBoard,
  combCoordXY,
  compareCoords,
  calcNeigborHorizontal,
  calcNeigborVertical,
} = require("./javascript.js");

//! Calculate neigbor Node Coordinates
describe("Neigbor Coordinates on Nodes", () => {
  // Testing calculation of neigbor Coordinates on Nodes on creation
  // Using semi-Caesar Cipher to create neigbor Coordinates
  const arrX = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const arrY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const arrXY = combCoordXY(arrX, arrY);
  const board = new GameBoard(arrXY);
  const node = board.find("A1");
  test("Calculate neigborNodes on Node", () => {
    expect(node.neigborNodes).toMatchObject({
      topNeihbor: null,
      botNeihbor: "A2",
      leftNeihbor: null,
      rightNeihbor: "B1",
    });
  });
  // Using semi-Caesar Cipher to create neigbor Coordinates
  const node2 = board.find("D5");
  test("Calculate neigborNodes on Node", () => {
    expect(node2.neigborNodes).toMatchObject({
      topNeihbor: "D4",
      botNeihbor: "D6",
      leftNeihbor: "C5",
      rightNeihbor: "E5",
    });
  });
  // Using semi-Caesar Cipher to create neigbor Coordinates
  const node3 = board.find("J10");
  console.log(node3);
  test("Calculate neigborNodes on Node", () => {
    expect(node3.neigborNodes).toMatchObject({
      topNeihbor: "J9",
      botNeihbor: null,
      leftNeihbor: "I10",
      rightNeihbor: null,
    });
  });
});

//! Calculate neigbor Coordinates Vertical
describe("Neigbor Coordinates Vertical", () => {
  // Testing calculation of neigbor Coordinates for Nodes
  // Using semi-Caesar Cipher to convert A1 to A2
  test("Convert from A1 to A2", () => {
    expect(calcNeigborVertical("A1", 1)).toBe("A2");
  });
  // Using semi-Caesar Cipher to convert B7 to B8
  test("Convert from B7 to B8", () => {
    expect(calcNeigborVertical("B7", 1)).toBe("B8");
  });
  // Using semi-Caesar Cipher to convert B7 to B8
  test("Convert from backwards J3 to J2", () => {
    expect(calcNeigborVertical("J3", -1)).toBe("J2");
  });
  // Using semi-Caesar Cipher to test out of bound
  test("Convert out of bound J3", () => {
    expect(calcNeigborVertical("J1", -1)).toBe(null);
  });
  // Using semi-Caesar Cipher to test out of bound
  test("Convert out of bound C10", () => {
    expect(calcNeigborVertical("C10", 1)).toBe(null);
  });
});

//! Calculate neigbor Coordinates Horizontal
describe("Neigbor Coordinates Horizontal", () => {
  // Testing calculation of neigbor Coordinates on Nodes
  // Using semi-Caesar Cipher to convert A1 to B1
  test("Convert from A1 to B1", () => {
    expect(calcNeigborHorizontal("A1", 1)).toBe("B1");
  });
  // Using semi-Caesar Cipher to convert N6 to M6
  test("Convert from N6 to M6", () => {
    expect(calcNeigborHorizontal("N6", -1)).toBe("M6");
  });
  // Using semi-Caesar Cipher to test out of bound
  test("Convert A1", () => {
    expect(calcNeigborHorizontal("A1", -1)).toBe(null);
  });
  // Using semi-Caesar Cipher to test out of bound
  test("Convert J1", () => {
    expect(calcNeigborHorizontal("J1", 1)).toBe(null);
  });
});

//! Caesar Cipher
describe("Convert unicode from letters and shift another letter", () => {
  // Convert unicode from letters and shift another letter
  // Test case 1: Convert from A to B
  test("A to B", () => {
    expect(convert2Unicode("A", 1)).toBe("B");
  });
  // Test case 2: Convert from S to T
  test("S to T", () => {
    expect(convert2Unicode("S", 1)).toBe("T");
  });
  // Test case 3: Convert backwards from L to K
  test("L to K", () => {
    expect(convert2Unicode("L", -1)).toBe("K");
  });
});

//! Placement a ship on a Coordinate(s)
describe("Ship Placement", () => {
  // Testing Ship Placement on specific Nodes
  const arrX = ["A", "B", "C"];
  const arrY = [1, 2, 3];
  const arrXY = combCoordXY(arrX, arrY);
  let board = new GameBoard(arrXY);
  // Test case 1: Ship Placement on A1
  test("Create a Big ship with length and health set to 4", () => {
    const ship1 = board.placeShip("A1", "Dreadnought", 4);
    expect(ship1).toMatchObject({
      coordXY: "A1",
      left: null,
      right: null,
      ship: { name: "Dreadnought", length: 4, health: 4, sunken: false },
    });
  });
  // Test case 2: Ship Placement on C3
  test("Create a Big ship with length and health set to 2", () => {
    const ship1 = board.placeShip("C3", "Mikasa", 2);
    expect(ship1).toMatchObject({
      coordXY: "C3",
      left: null,
      right: null,
      ship: { name: "Mikasa", length: 2, health: 2, sunken: false },
    });
  });
  // Test case 3: Ship Placement on B2
  test("Inpsect Ship after creation on Node", () => {
    const ship1 = board.placeShip("B2", "Yamato", 2);
    expect(ship1.ship).toMatchObject({ name: "Yamato", length: 2, health: 2, sunken: false });
  });
});

//! Find Node on in BS Tree
describe("Find Node in Tree", () => {
  // Create gameBoard Tree and find a specific Node
  const arrX = ["A", "B", "C"];
  const arrY = [1, 2, 3];
  const arrXY = combCoordXY(arrX, arrY);
  const board = new GameBoard(arrXY);
  // Test case 1: Find A1
  test("Find A1", () => {
    expect(board.find("A1")).toMatchObject({
      coordXY: "A1",
      left: null,
      right: null,
      ship: null,
    });
  });
  // Test case 2: Find C3
  test("Find C3", () => {
    expect(board.find("C3")).toMatchObject({
      coordXY: "C3",
      left: null,
      right: null,
      ship: null,
    });
  });
  // Test case 3: Find O3 which is not in the tree
  test("Find O3", () => {
    expect(board.find("O3")).toBe("not found");
  });
});

//! Create gameBoard Tree
describe("GameBoard Tree", () => {
  // Test case 1: Create gameBoard Tree
  test("Create gameBoard", () => {
    const arrX = ["A", "B"];
    const arrY = [1, 2];
    const arrXY = combCoordXY(arrX, arrY);
    const board = new GameBoard(arrXY);
    expect(board).toMatchObject({
      coordXY: "Head",
      root: {
        coordXY: "A2",
        left: {
          coordXY: "A1",
          left: null,
          right: null,
          ship: null,
        },
        right: {
          coordXY: "B1",
          left: null,
          right: {
            coordXY: "B2",
            left: null,
            right: null,
            ship: null,
          },
          ship: null,
        },
        ship: null,
      },
    });
  });
});

//! Compare Node size
describe("Compare coordinates", () => {
  // Test case 1: Compare A1 with A2
  test("Compare A1 with A2", () => {
    expect(compareCoords("A1", "A2")).toBe(false);
  });
  // Test case 2: Compare A1 with B1
  test("Create gameBoard", () => {
    expect(compareCoords("A1", "B1")).toBe(false);
  });
  // Test case 3: Compare B1 with A2
  test("Compare B1 with A2", () => {
    expect(compareCoords("B1", "A2")).toBe(true);
  });
  // Test case 4: Compare C1 with A2
  test("Compare C1 with A2", () => {
    expect(compareCoords("C1", "A2")).toBe(true);
  });
  // Test case 4: Compare same value
  test("Compare C1 with C1", () => {
    expect(compareCoords("C1", "C1")).toBe("same");
  });
});

//! Create Combine Coordinate ArrayXY
describe("Combine Coordinate", () => {
  // Test case 1: Combine Coordinate
  test(/*.only*/ "Combine Coordinate 2x2", () => {
    const arrX = ["A", "B"];
    const arrY = [1, 2];
    expect(combCoordXY(arrX, arrY)).toMatchObject(["A1", "A2", "B1", "B2"]);
  });
  // Test case 1: Combine Coordinate
  test(/*.only*/ "Combine Coordinate 3x3", () => {
    const arrX = ["A", "B", "C"];
    const arrY = [1, 2, 3];
    expect(combCoordXY(arrX, arrY)).toMatchObject(["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]);
  });
});

//! Testing Mock Object
describe("Mock Object", () => {
  test("Test Mock object properties", () => {
    const ship = objMock("John", 30);
    expect(ship).toMatchObject({
      name: "John",
      age: 30,
    });
  });
});

//! Describe the ShipCreator class and created objects
describe("Ship Creator", () => {
  // Test case 1: Create a Big ship
  test("Create a Big ship with length and health set to 3", () => {
    const ship = new ShipCreator("Dreadnought", 4);
    expect(ship).toMatchObject({
      name: "Dreadnought",
      length: 4,
      health: 4,
      sunken: false,
    });
  });
  // Test case 2: Create a Big ship
  test("Create a Big ship with length and health set to 3", () => {
    const ship = new ShipCreator("Mikasa", 2);
    expect(ship).toMatchObject({
      name: "Mikasa",
      length: 2,
      health: 2,
      sunken: false,
    });
  });
  // Test case 3: Create a Big ship
  test("Create a Big ship with length and health set to 3", () => {
    const ship = new ShipCreator("Yamato", 3);
    expect(ship).toMatchObject({
      name: "Yamato",
      length: 3,
      health: 3,
      sunken: false,
    });
  });
});

//! Describe the Ship being hit with hit() method
describe("ShipCreator", () => {
  // Test case 1: Ship with 4 health being hit
  test("Big ship with health 4 set to 3", () => {
    const ship = new ShipCreator("Dreadnought", 4);
    ship.hit(); // Simulate a ship taking one hit
    expect(ship).toMatchObject({
      name: "Dreadnought",
      length: 4,
      health: 3,
      sunken: false,
    });
  });
  // Test case 2: Small Ship with 3 health being hit
  test("Small ship with health 2 set to 1", () => {
    const ship = new ShipCreator("Mikasa", 2);
    ship.hit(); // Simulate a ship taking one hit
    expect(ship).toMatchObject({
      name: "Mikasa",
      length: 2,
      health: 1,
      sunken: false,
    });
  });
  // Test case 3: Create a Big ship
  test("Medium ship with health 3 set to 2", () => {
    const ship = new ShipCreator("Yamato", 3);
    ship.hit(); // Simulate a ship taking one hit
    expect(ship).toMatchObject({
      name: "Yamato",
      length: 3,
      health: 2,
      sunken: false,
    });
  });
});

//! Describe the ShipCreator class and it's isSunk() methods
describe("ShipCreator", () => {
  // Test case 1: Check if isSunk() sets sunken to true when health is 0
  test("Should set sunken to true when health is 0", () => {
    const ship = new ShipCreator("ShipName", 3);
    ship.health = 0; // Simulate a ship with 0 health
    ship.isSunk();
    expect(ship.sunken).toBe(true);
  });

  // Test case 2: Check if isSunk() does not set sunken to true when health is greater than 0
  test("Should not set sunken to true when health is greater than 0", () => {
    const ship = new ShipCreator("ShipName", 3);
    ship.health = 2; // Simulate a ship with 2 health
    ship.isSunk();
    expect(ship.sunken).toBe(false);
  });

  // Test case 3: Check if isSunk() does set sunken to true when health is negative
  test("Should set sunken to true when health is negative", () => {
    const ship = new ShipCreator("ShipName", 3);
    ship.health = -1; // Simulate a ship with negative health
    ship.isSunk();
    expect(ship.sunken).toBe(true);
  });
});

//! Describe the ShipCreator class and it's hit() & isSunk() methods
describe("ShipCreator", () => {
  // Test case 1: Check if isSunk() sets sunken to true when hit() health is 0
  test("Should set sunken to true when health is 0", () => {
    const ship = new ShipCreator("Boat", 1);
    ship.hit();
    expect(ship).toMatchObject({
      name: "Boat",
      length: 1,
      health: 0,
      sunken: true,
    });
  });
});
