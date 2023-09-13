const { coordsArray, createArrayfromXY, arrX, arrY, checkCoordValidity, combCoordXY } = require("./functions");

//! Check if all Ships are sunken
describe("Coordinate validity", () => {
  // Testing Coordinate validity
  const arrXY = [...combCoordXY(arrX, arrY)];
  // Check CoordXY is
  test("Check CoordXY validity for B5", () => {
    const orientation = "H";
    const coordXY = "B5";
    expect(createArrayfromXY(coordXY, 4, orientation)).toMatchObject(["B5", "C5", "D5", "E5"]);
  });
  // Testing Coordinate validity
  test("Check CoordXY validity for B3", () => {
    const orientation = "V";
    const coordXY = "B3";
    expect(createArrayfromXY(coordXY, 4, orientation)).toMatchObject(["B3", "B4", "B5", "B6"]);
  });
  // Testing Coordinate validity
  test("Check CoordXY validity for J9", () => {
    const orientation = "V";
    const coordXY = "J9";
    expect(createArrayfromXY(coordXY, 1, orientation)).toMatchObject(["J9"]);
  });
  // Testing Coordinate validity
  test("Check CoordXY validity for A0", () => {
    const orientation = "V";
    const coordXY = "A0";
    expect(createArrayfromXY(coordXY, 2, orientation)).toMatchObject(["A0", "A1"]);
  });
  // Testing Looks in the Array
  test("Check CoordXY validity for A0", () => {
    const orientation = "V";
    const coordXY = "A0";
    const checkArray = [];
    expect(checkCoordValidity(coordXY, 2, orientation, [])).toBe("A0");
  });
  // Testing Looks in the Array
  test("Check CoordXY validity for A0", () => {
    const orientation = "V";
    const coordXY = "A0";
    const checkArray = ["A0"];
    expect(checkCoordValidity(coordXY, 2, orientation, checkArray)).toBe(false);
  });
  // Testing Looks in the Array
  test("Check CoordXY validity for C4", () => {
    const orientation = "H";
    const coordXY = "C4";
    const checkArray = ["B5", "C5", "D5", "E5"];
    expect(checkCoordValidity(coordXY, 2, orientation, checkArray)).toBe("C4");
  });
  // Testing Looks in the Array
  test("Check CoordXY validity for B5", () => {
    const orientation = "H";
    const coordXY = "B5";
    const checkArray = ["B3", "B4", "B5", "B6"];
    expect(checkCoordValidity(coordXY, 2, orientation, checkArray)).toBe(false);
  });
  test("Check CoordXY validity for D0", () => {
    const orientation = "V";
    const coordXY = "D0";
    const checkArray = ["A3", "B3", "C3", "D3"];
    expect(checkCoordValidity(coordXY, 4, orientation, checkArray)).toBe(false);
  });
});
