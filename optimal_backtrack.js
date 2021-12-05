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
  } catch (e) {
    console.log("Error:", e.stack);
  }
};

const arr = create();

function isSafe(board, row, col, num) {
  for (let d = 0; d < board.length; d++) {
    // check
    if (board[row][d] == num) {
      return false;
    }
  }

  for (let r = 0; r < board.length; r++) {
    // Check kalo ada number yang exist
    if (board[r][col] == num) {
      return false;
    }
  }

  let sqrt = Math.floor(Math.sqrt(board.length));
  let boxRowStart = row - (row % sqrt);
  let boxColStart = col - (col % sqrt);

  for (let r = boxRowStart; r < boxRowStart + sqrt; r++) {
    for (let d = boxColStart; d < boxColStart + sqrt; d++) {
      if (board[r][d] == num) {
        return false;
      }
    }
  }

  return true;
}

function solveSudoku(board, n) {
  let row = -1;
  let col = -1;
  let isEmpty = true;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] == 0) {
        row = i;
        col = j;

        // Masih ada missing value
        isEmpty = false;
        break;
      }
    }
    if (!isEmpty) {
      break;
    }
  }

  if (isEmpty) {
    return true;
  }

  for (let num = 1; num <= n; num++) {
    if (isSafe(board, row, col, num)) {
      board[row][col] = num;
      if (solveSudoku(board, n)) {
        // print(board, n);
        return true;
      } else {
        board[row][col] = 0;
      }
    }
  }
  return false;
}

var startTime = performance.now();
for (let angka = 0; angka < arr.length; angka++) {
  solveSudoku(arr[angka], arr[angka].length);
}
var endTime = performance.now();

console.log(`Call to solve took ${endTime - startTime} milliseconds`);

// Driver Code
// let grid = [
//     [0, 0, 0, 4, 0, 6, 0, 0, 0],
//     [0, 0, 9, 3, 0, 0, 2, 0, 6],
//     [0, 8, 0, 2, 7, 0, 0, 3, 0],
//     [0, 2, 4, 0, 3, 7, 6, 0, 8],
//     [9, 6, 0, 0, 0, 1, 0, 0, 7],
//     [8, 0, 0, 0, 0, 2, 4, 1, 0],
//     [0, 9, 0, 7, 2, 0, 0, 6, 1],
//     [6, 0, 0, 1, 0, 5, 0, 0, 3],
//     [7, 0, 0, 0, 6, 0, 8, 0, 0],
// ]