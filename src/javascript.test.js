const { objMock, ShipCreator, GameBoard, combCoordXY } = require("./javascript.js");

//! Placement a ship on a Coordinate(s)
describe("Ship Placement", () => {
  // Test case 1: Ship Placement
  test.skip("Create a Big ship with length and health set to 3", () => {
    const ship = new ShipCreator("Dreadnought", 4);
    const gameGoard = new GameBoard([["A1"], ["A2"], ["A3"], ["B1"], ["B2"], ["B3"], ["C1"]]);
    gameGoard.placeShip(["B2"]);
    expect(ship).toMatchObject({
      name: "Dreadnought",
      length: 4,
      health: 4,
      sunken: false,
    });
  });
});

//! Create gameBoard XY
describe("GameBoard XY", () => {
  // Test case 1: Create gameBoard
  test(/*.only*/ "Create gameBoard", () => {
    expect(combCoordXY(["A", "B"], [1, 2])).toMatchObject([["A1"], ["A2"], ["B1"], ["B2"]]);
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
describe("ShipCreator", () => {
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
