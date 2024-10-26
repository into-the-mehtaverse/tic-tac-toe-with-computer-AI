const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]



    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    this.cursor = new Cursor(3, 3);
    this.moveCount = 0;

    // Replace this with real commands
    Screen.addCommand('u', 'move cursor up', this.moveUp.bind(this))
    Screen.addCommand('d', 'move cursor down', this.moveDown.bind(this))
    Screen.addCommand('l', 'move cursor left', this.moveLeft.bind(this))
    Screen.addCommand('r', 'move cursor right', this.moveRight.bind(this))
    Screen.addCommand('x', 'play X', this.playX.bind(this))
    Screen.addCommand("o", 'play O', this.playO.bind(this))
    Screen.render();
    Screen.printCommands()

  }

  moveUp () {
    this.cursor.up()
    Screen.render();
    Screen.printCommands()
  }

  moveDown () {
    this.cursor.down();
    Screen.render();
    Screen.printCommands()
  }

  moveLeft () {
    this.cursor.left();
    Screen.render();
    Screen.printCommands()
  }

  moveRight () {
    this.cursor.right();
    Screen.render();
    Screen.printCommands()
  }

  playX () {
    let row = this.cursor.row;
    let col = this.cursor.col;
    if (Screen.grid[row][col] !== ' ') {
      return;
    }
    Screen.setGrid(row, col, "X");
    this.moveCount++
    if (this.moveCount >= 3) {
      let outcome = TTT.checkWin(Screen.grid);
      if (outcome === "X" || outcome === "O") {
        Screen.render()
        Screen.setQuitMessage("congrats! Player 'X' has won the game")
        Screen.quit()
    }
  }
    Screen.render()
  }

  playO () {
    let row = this.cursor.row;
    let col = this.cursor.col;
    if (Screen.grid[row][col] !== ' ') {
      return;
    }
    Screen.setGrid(row, col, "O");
    this.moveCount++
    if (this.moveCount >= 3) {
     let outcome = TTT.checkWin(Screen.grid);
      if (outcome === "X" || outcome === "O") {
        Screen.render()
        Screen.setQuitMessage("congrats! Player 'O' has won the game")
        Screen.quit()
     }
    }
    Screen.render()
  }

  static checkWin(grid) {

    let flat = grid.flat();
    if (!flat.includes('X') && !flat.includes('O')) {
      return false;
    }

    for (let i = 0; i < grid.length; i++) {
      if (grid[i][0] === grid[i][1] && grid[i][1] === grid[i][2] && grid[i][0] !== ' ') {
        return grid[i][0];
      }
      if (grid[0][i] === grid[1][i] && grid[1][i] === grid[2][i] && grid[0][i] !== ' ') {
        return grid[0][i]
      }
    }

    if (grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2] && grid[0][0] !== ' '){
      return grid[0][0];
    } else if (grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0] && grid[0][2] !== ' ') {
      return grid[0][2];
    }

    if (!flat.includes(' ')) {
      return "T"
    }

    return false;


  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }


}

module.exports = TTT;
