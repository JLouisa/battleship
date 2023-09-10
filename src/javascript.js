// vv=======Mock Test=======vv
function objMock(obj) {
  return (obj = {
    name: "John",
    age: 30,
  });
}
// ^^=======Mock Test=======^^
class ShipCreator {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.health = length;
    this.sunken = false;
  }
  hit() {
    this.health--;
  }
  isSunk() {
    if (this.health <= 0) {
      this.sunken = true;
    }
  }
}

//==================Export=======================
module.exports = { ShipCreator, objMock };
// export { sumAll, multiAll, objMock, ships };
