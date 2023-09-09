module.exports = { sumAll, multiAll, objMock };

function sumAll(a, b) {
  return a + b;
}

function multiAll(a, b) {
  return a * b;
}

function objMock(obj) {
  return (obj = {
    name: "John",
    age: "Doe",
  });
}
