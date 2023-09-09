const { sumAll, multiAll, objMock } = require("./javascript.js");

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

test("Object", () => {
  expect(objMock("Kyle")).toMatchObject({ name: "John", age: "Doe" });
});
