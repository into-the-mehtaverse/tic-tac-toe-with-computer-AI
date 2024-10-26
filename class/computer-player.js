const TTT = require("../class/ttt");

class ComputerPlayer {

  static getValidMoves(grid) {
    let validMoves = [];
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] === ' ') {
          validMoves.push({ row: row, col: col })
        }
      }
    }
    return validMoves;
  }

  static randomMove(grid) {
    let validMoves = this.getValidMoves(grid);

    let randomMove = Math.floor(Math.random() * (validMoves.length - 1));

    return validMoves[randomMove];

  }

  static getWinningMoves(grid, symbol) {


    let moves = this.getValidMoves(grid);

    for (let i = 0; i < moves.length; i++) {

      let alteredGrid = JSON.parse(JSON.stringify(grid));

      alteredGrid[moves[i].row][moves[i].col] = symbol;

      if (TTT.checkWin(alteredGrid) === symbol) {
        return moves[i]
      }
    };

    return null

  }

  static getBlockingMoves (grid, symbol) {
    let moves = this.getValidMoves(grid);

    let opposition;

    if (symbol === 'X') {
      opposition = 'O';
    } else {
      opposition === 'X';
    }

    for (let i = 0; i < moves.length; i++) {

      let alteredGrid = JSON.parse(JSON.stringify(grid));

      alteredGrid[moves[i].row][moves[i].col] = opposition;

      if (TTT.checkWin(alteredGrid) === opposition) {
        return moves[i]
      }
    };

    return null
  }

  static oneMoveAhead (grid, symbol) {

    let moves = this.getValidMoves(grid);

    let opposition;

    if (symbol === 'X') {
      opposition = 'O';
    } else {
      opposition === 'X';
    }


    for (let i = 0; i < moves.length; i++) {

      let alteredGrid = JSON.parse(JSON.stringify(grid));

      // check each move
      alteredGrid[moves[i].row][moves[i].col] = symbol;

      // let opponent pick random move if there is space on the board;
      if (this.getValidMoves(alteredGrid).length > 0) {
      let oppMove = this.getWinningMoves(alteredGrid);
          if (oppMove) {
            alteredGrid[oppMove.row][oppMove.col] = opposition;
          } else {
            let oppMoveAlt = this.randomMove(alteredGrid)
            alteredGrid[oppMoveAlt.row][oppMoveAlt.col] = opposition
          }
      // find winning move;
      let smartMove = this.getWinningMoves(alteredGrid, symbol);

      if (smartMove) return smartMove;
    }
  }
}

// Choose a corner if available
static chooseCorner(grid) {
  const corners = [
    { row: 0, col: 0 },
    { row: 0, col: 2 },
    { row: 2, col: 0 },
    { row: 2, col: 2 }
  ];

  for (let corner of corners) {
    if (grid[corner.row][corner.col] === ' ') {
      return corner;
    }
  }

  return null;  // No corners available
}

// Choose the center if it's available
static chooseCenter(grid) {
  if (grid[1][1] === ' ') {
    return { row: 1, col: 1 };
  }
  return null;
}

// Choose an edge if available
static chooseEdge(grid) {
  const edges = [
    { row: 0, col: 1 },
    { row: 1, col: 0 },
    { row: 1, col: 2 },
    { row: 2, col: 1 }
  ];

  for (let edge of edges) {
    if (grid[edge.row][edge.col] === ' ') {
      return edge;
    }
  }

  return null;  // No edges available
}

static getSmartMove(grid, symbol) {
  // 1. Try to win
  let winningMove = this.getWinningMoves(grid, symbol);
  if (winningMove) return winningMove;

  // 2. Try to block opponent's win
  let blockingMove = this.getBlockingMoves(grid, symbol);
  if (blockingMove) return blockingMove;

  // 3. Choose the center if available
  let centerMove = this.chooseCenter(grid);
  if (centerMove) return centerMove;

  // 4. Choose a corner if available
  let cornerMove = this.chooseCorner(grid);
  if (cornerMove) return cornerMove;

  // 5. Choose an edge if available
  return this.chooseEdge(grid);
}

}

// local test;

let cpu;
let grid;

cpu = new ComputerPlayer();

grid = [['X','X',' '],
        ['O',' ',' '],
        ['O',' ',' ']]

console.log(ComputerPlayer.getWinningMoves(grid, 'X'))



module.exports = ComputerPlayer;
