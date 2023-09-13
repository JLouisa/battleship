/* =====================Pseudo Code======================

// 1. Take an coordinate XY from gridXY array.
// 2. If orientation is "H".
//       add number of coordinates from index(XY) x ship length times.
// 3. If orantation is "V".
//       create coordinates with calcNeigborVertical function and addd to array
4. Compare the array and verify all coordinates are present in lookUpArray
5. If all coordinates are not present, repeat step 1.
6. If all coordinates are present, splice the all out the lookUpArray
   Send to ship grid after.

 ^^======================================================^^ */

//  getRandomIndex(65, 74), getRandomIndex(0, 9)

let theArrayXYLimit = [
  ["A", "J", 0, 9],
  ["A", "I", 0, 8],
  ["A", "H", 0, 7],
  ["A", "G", 0, 6],
];

let coordsArray = [
  [combining[theArrayXYLimit[0]]],
  [combining[theArrayXYLimit[1]]],
  [combining[theArrayXYLimit[2]]],
  [combining[theArrayXYLimit[3]]],
];

// function combining(l1, l2, num1, num2) {
function combining(arrXY) {
  let arr = [];
  let l1 = arrXY[0].charCodeAt(0);
  let l2 = arrXY[1].charCodeAt(0);
  console.log(l1);
  console.log(l2);
  for (let j = l1; j <= l2; j++) {
    for (let i = arrXY[2]; i <= arrXY[3]; i++) {
      arr.push(String.fromCharCode(j) + i);
    }
  }
  console.log(arr);
  return arr;
}

const orientationX = "H";
const orientationY = "V";

const coordXY = "B5";

const checkArray = [];

//! Check Validity
function checkCoordValidity(coordXY, num, orient, arr) {
  let tempArr = createArrayfromXY(coordXY, num, orient);
  let allAvaidable = true;

  if (arr.length === 0) {
    return coordXY;
  }
  if (tempArr.some((cord) => arr.includes(cord))) {
    allAvaidable = false;
  } else {
    allAvaidable = true;
  }
  if (allAvaidable) {
    arr = [...tempArr];
    return coordXY;
  }
  // checkCoordValidity(coordXY, num, orient);
  return false;
}

function createArrayfromXY(cXY, num, ornt) {
  let array = [];
  let temp = cXY.slice();

  if (ornt === "H") {
    for (let i = 0; i < num; i++) {
      temp = calcNeigborHorizontal(cXY, i);

      array.push(temp);
    }
    return array;
  }

  if (ornt === "V") {
    for (let i = 0; i < num; i++) {
      temp = calcNeigborVertical(cXY, i);

      array.push(temp);
    }
    return array;
  }
}

//======================================================

//! Combine array X and array Y
function combCoordXY(arrayX, arrayY) {
  const arrComb = [];
  arrayX.forEach((elementX) => {
    arrayY.forEach((elementY) => arrComb.push(`${elementX}${elementY}`));
  });
  return arrComb;
}

const convert2Unicode = (coordX, change) => {
  let unicode = coordX.charCodeAt(0);
  return String.fromCharCode(unicode + change);
};

function calcNeigborHorizontal(coordXY, change) {
  let newCoord = coordXY.split("");
  // if ((newCoord[0] === "A" && change === -1) || (newCoord[0] === "J" && change === 1)) {
  //   return null;
  // }
  newCoord[0] = convert2Unicode(newCoord[0], change);
  return newCoord.join("");
}

function calcNeigborVertical(coordXY, change) {
  let newCoord = coordXY.split("");
  // if ((newCoord[1] === "0" && change === -1) || (newCoord[1] === "9" && change === 1)) {
  //   return null;
  // }
  newCoord[1] = Number(newCoord[1]) + change;
  return newCoord.join("");
}

//! Array Coordinates
const arrX = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const arrY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// const arrXY = [...combCoordXY(arrX, arrY)];

module.exports = { coordsArray, arrX, arrY, checkCoordValidity, combCoordXY, createArrayfromXY };
