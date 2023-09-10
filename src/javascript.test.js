const { objMock, ShipCreator, GameBoard, combCoordXY, compareCoords } = require("./javascript.js");

//! Placement a ship on a Coordinate(s)
describe("Ship Placement", () => {
  // Test case 1: Ship Placement
  const arrX = ["A", "B", "C"];
  const arrY = [1, 2, 3];
  const arrXY = combCoordXY(arrX, arrY);
  let board = new GameBoard(arrXY);
  test("Create a Big ship with length and health set to 3", () => {
    let ship1 = board.placeShip("A1", "Dreadnought", 4);
    expect(ship1).toMatchObject({
      coordXY: "A1",
      left: null,
      right: null,
      ship: { name: "Dreadnought", length: 4, health: 4, sunken: false },
    });
  });
});

//! Find Node on gameBoard XY
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
  test("should set sunken to true when health is 0", () => {
    const ship = new ShipCreator("ShipName", 3);
    ship.health = 0; // Simulate a ship with 0 health
    ship.isSunk();
    expect(ship.sunken).toBe(true);
  });

  // Test case 2: Check if isSunk() does not set sunken to true when health is greater than 0
  test("should not set sunken to true when health is greater than 0", () => {
    const ship = new ShipCreator("ShipName", 3);
    ship.health = 2; // Simulate a ship with 2 health
    ship.isSunk();
    expect(ship.sunken).toBe(false);
  });

  // Test case 3: Check if isSunk() does set sunken to true when health is negative
  test("should set sunken to true when health is negative", () => {
    const ship = new ShipCreator("ShipName", 3);
    ship.health = -1; // Simulate a ship with negative health
    ship.isSunk();
    expect(ship.sunken).toBe(true);
  });
});

//! Describe the ShipCreator class and it's hit() & isSunk() methods
describe("ShipCreator", () => {
  // Test case 1: Check if isSunk() sets sunken to true when hit() health is 0
  test("should set sunken to true when health is 0", () => {
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
