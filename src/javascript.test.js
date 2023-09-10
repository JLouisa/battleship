const { sumAll, multiAll, objMock, ships } = require("./javascript.js");

test("Sum", () => {
  expect(sumAll(2, 2)).toBe(4);
});
test("Sum", () => {
  expect(sumAll(4, 2)).toBe(6);
});
test("Sum", () => {
  expect(sumAll(2, 7)).toBe(9);
});

test("Multiply", () => {
  expect(multiAll(2, 7)).toBe(14);
});
test("Multiply", () => {
  expect(multiAll(2, 4)).toBe(8);
});
test("Multiply", () => {
  expect(multiAll(2, 9)).toBe(18);
});

test("objMock", () => {
  expect(objMock("John", 30)).toMatchObject({
    name: "John",
    age: 30,
  });
});

test("Ship Class Object", () => {
  expect(ships("ShipBig", 3)).toMatchObject({
    name: "ShipBig",
    length: 3,
    health: 3,
    sunken: false,
  });
});
