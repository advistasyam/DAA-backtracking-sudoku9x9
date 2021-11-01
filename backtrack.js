const board = [
  [0, 0, 0, 4, 0, 6, 0, 0, 0],
  [0, 0, 9, 3, 0, 0, 2, 0, 6],
  [0, 8, 0, 2, 7, 0, 0, 3, 0],
  [0, 2, 4, 0, 3, 7, 6, 0, 8],
  [9, 6, 0, 0, 0, 1, 0, 0, 7],
  [8, 0, 0, 0, 0, 2, 4, 1, 0],
  [0, 9, 0, 7, 2, 0, 0, 6, 1],
  [6, 0, 0, 1, 0, 5, 0, 0, 3],
  [7, 0, 0, 0, 6, 0, 8, 0, 0],
];

const check = [
  [0, 0, 0, 4, 0, 6, 0, 0, 0],
  [0, 0, 9, 3, 0, 0, 2, 0, 6],
  [0, 8, 0, 2, 7, 0, 0, 3, 0],
  [0, 2, 4, 0, 3, 7, 6, 0, 8],
  [9, 6, 0, 0, 0, 1, 0, 0, 7],
  [8, 0, 0, 0, 0, 2, 4, 1, 0],
  [0, 9, 0, 7, 2, 0, 0, 6, 1],
  [6, 0, 0, 1, 0, 5, 0, 0, 3],
  [7, 0, 0, 0, 6, 0, 8, 0, 0],
];

function isSafe(i, j, k) {
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

function solve() {
  let temp;
  let forward;

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (check[i][j] == 0) {
        temp = board[i][j] + 1;
        forward = true;
        for (let k = temp; k <= 10; k++) {
          if (isSafe(i, j, k)) {
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
          return false;
        }
      } else if (check[i][j] != 0 && forward == false) {
        j -= 2;
        if (j < -1 && i > 0) {
          i--;
          j = 7;
        } else if (j < -1 && i == 0) {
          return false;
        }
      }
    }
  }

  return true;
}

solve();
console.log(board);
