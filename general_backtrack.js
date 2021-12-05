const { performance } = require("perf_hooks");
const fs = require("fs");

//Generate Array
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
const check1 = JSON.parse(JSON.stringify(arr));

// const check1 = JSON.parse(JSON.stringify(board1));

function isSafe(i, j, k, board) {
  if (k == 0) {
    return false;
  }

  // check row
  for (let index = 0; index < 9; index++) {
    if (index != j) {
      if (board[i][index] == k) {
        return false;
      }
    }
  }

  // check column
  for (let index = 0; index < 9; index++) {
    if (index != i) {
      if (board[index][j] == k) {
        return false;
      }
    }
  }

  // check subbox
  columnIndex = Math.floor(j / 3) * 3;
  rowIndex = Math.floor(i / 3) * 3;
  maxColumn = columnIndex + 3;
  maxRow = rowIndex + 3;

  for (let indexi = rowIndex; indexi < maxRow; indexi++) {
    for (let indexj = columnIndex; indexj < maxColumn; indexj++) {
      if (indexi != i || indexj != j) {
        if (board[indexi][indexj] == k) {
          return false;
        }
      }
    }
  }
  return true;
}

function solve(board, check) {
  let temp;
  let forward;

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (check[i][j] == 0) {
        temp = board[i][j] + 1;
        forward = true;
        for (let k = temp; k <= 10; k++) {
          if (isSafe(i, j, k, board)) {
            board[i][j] = k;
            break;
          }
        }

        if (board[i][j] > 9) {
          board[i][j] = 0;
          j -= 2;
          forward = false;
        }

        if (j < -1 && i > 0) {
          i--;
          j = 7;
        } else if (j < -1 && i == 0) {
          // console.log("no solution")
          return false;
        }
      } else if (check[i][j] != 0 && forward == false) {
        j -= 2;
        if (j < -1 && i > 0) {
          i--;
          j = 7;
        } else if (j < -1 && i == 0) {
          // console.log("no solution")
          return false;
        }
      }
    }
  }

  return true;
}

let startTime = performance.now();
for (let angka = 0; angka < arr.length; angka++) {
  solve(arr[angka], check1[angka]);
}
let endTime = performance.now();

console.log(`Call to solve took ${endTime - startTime} milliseconds`);

// Hardest
// const board1 = [
//   [0, 0, 0, 0, 0, 0, 0, 0, 8],
//   [0, 0, 3, 0, 0, 0, 4, 0, 0],
//   [0, 9, 0, 0, 2, 0, 0, 6, 0],
//   [0, 0, 0, 0, 7, 9, 0, 0, 0],
//   [0, 0, 0, 0, 6, 1, 2, 0, 0],
//   [0, 6, 0, 5, 0, 2, 0, 7, 0],
//   [0, 0, 8, 0, 0, 0, 5, 0, 0],
//   [0, 1, 0, 0, 0, 0, 0, 2, 0],
//   [4, 0, 5, 0, 0, 0, 0, 0, 3],
// ];
