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
  expect(ships("Mikasa", 2)).toMatchObject({
    name: "Mikasa",
    length: 2,
    health: 2,
    sunken: false,
  });
});

test("Ship Class Object", () => {
  expect(ships("Yamato", 4)).toMatchObject({
    name: "Yamato",
    length: 4,
    health: 4,
    sunken: false,
  });
});
