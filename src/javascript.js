module.exports = { sumAll, multiAll, objMock, ships };
// export { sumAll, multiAll, objMock, ships };

// vv=======Mock Test=======vv
function sumAll(a, b) {
  return a + b;
}

function multiAll(a, b) {
  return a * b;
}

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

function ships(name, length) {
  return new ShipCreator(name, length);
}

let ship1 = ships("Yamato", 2);
let ship2 = ships("Dreadnought", 4);
let ship3 = ships("Mikasa", 4);

console.log(ship1);
console.log(ship2);
console.log(ship3);

ship3.hit();
console.log(ship3);
