var fs = require("fs");

const create = () => {
  try {
    let data = fs.readFileSync("dataset/hard.txt", "utf8");
    let arrString = data.toString().split(/\r?\n/);
    let hasil = [];
    arrString.map((val) => {
      let arrTemp = [];
      for (let i = 0; i < 9; i++) {
        let arrTemp2 = [];
        for (let j = 0; j < 9; j++) {
          if (val.charAt(i * 9 + j) == ".") {
            arrTemp2.push(0);
          } else {
            arrTemp2.push(parseInt(val.charAt(i * 9 + j)));
          }
        }
        arrTemp.push(arrTemp2);
      }
      hasil.push(arrTemp);
    });
    return hasil;
    // for (let i = 0; i < )
  } catch (e) {
    console.log("Error:", e.stack);
  }
};

const arr = create();
console.log(arr);

const arr2 = [
  [0, 0, 3, 4, 0, 0, 0, 8, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 3],
  [7, 0, 0, 0, 0, 0, 0, 0, 0],
  [2, 0, 0, 0, 9, 0, 0, 0, 0],
  [0, 0, 0, 5, 0, 0, 8, 0, 0],
  [0, 6, 0, 0, 0, 7, 0, 4, 0],
  [0, 0, 5, 1, 0, 0, 0, 0, 8],
  [0, 7, 0, 0, 0, 5, 0, 0, 0],
  [9, 0, 0, 0, 6, 2, 0, 5, 0],
];
