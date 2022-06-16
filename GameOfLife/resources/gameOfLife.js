
// getting canvas
const canvas = document.querySelector("#game-grid");
const ctx = canvas.getContext("2d");

// updating parameters
const cellSize = 20;
const width = canvas.width / cellSize;
const height = canvas.height / cellSize;

// getting colors
var vaporwave = new Rainbow();
vaporwave.setSpectrum('#8B61AC', '#79E2FF', '#FF97C6');
vaporwave.setNumberRange(0, width);
vaporwave.colourAt(number);

class GameOfLife {
  constructor() {
    this.deadColor = 'dark-grey';
    this.cellSize = cellSize;
    this.width = width;
    this.height = height;
    this.grid = [];
  }

  initGrid() {
    for (let y = 0; y < this.height; y++) {
      let row = [];
      for(let x = 0; x < this.width; x++) {
        row.push( {
          isAlive: false,
          aliveColor: vaporwave.colourAt(x),
          xCoord: x,
          yCoord: y,
          numNeighbors: 0
          });
        }
      }
  }

  countNeighbors(xCoord,yCoord) {
    let numNeighbors = 0;

    // check below
    if (yCoord + 1 === this.height) {
      // do nothing if last row in grid

    } else {
      if (this.grid()[yCoord + 1][xCoord].isAlive) {
        numNeighbors++;
      }
    }

    // check above
    if (yCoord - 1 <  0) {
      // do nothing if last row in grid

    } else {
      if(this.grid()[yCoord - 1][xCoord].isAlive) {
      numNeighbors++;
      }
    }

    // check right
    if (xCoord + 1 === this.width) {
      // do nothing if last column in grid

    } else {
      if(this.grid()[yCoord][xCoord + 1].isAlive) {
      numNeighbors++;
      }
    }

    // check left
    if (xCoord - 1 <  0) {
      // do nothing if last row in grid

    } else {
      if (this.grid()[yCoord][xCoord - 1].isAlive) {
      numNeighbors++;
      }
    }

    return numNeighbors;
  }

  updateNeighbors() {
    for(let y = 0; y < this.height; y++) {
      for(let x = 0; x < this.width; x++) {
        this.grid()[y][x].numNeighbors = countNeighbors(x,y);
      }
    }
  }

  updateCell(xCoord, yCoord) {
    let numNeighbors = this.grid()[yCoord][xCoord].numNeighbors;
    // logic if the cell is already alive
    if (this.grid()[yCoord][xCoord].isAlive) {
      // living cell dies
      if(numNeighbors > 3 || numNeighbors < 3) {
        this.grid()[yCoord][xCoord].isAlive = false;
      }
    } else {
      // dead cell comes to life
      if (numNeighbors === 3) {
        this.grid()[yCoord][xCoord].isAlive = true;
      }
    }
  }

  updateGrid() {
    for(let y = 0; y < this.height; y++) {
      for(let x = 0; x < this.width; x++) {
        updateCell(x,y);
      }
    }
  }

  populateGridRandom() {
    for(let y = 0; y < this.height; y++) {
      for(let x = 0; x < this.width; x++) {
        if(Math.random() > 0.5) {
          this.grid()[y][x].isAlive = true;

        }
      }
    }
  }

  displayGrid() {
    for(let y = 0; y < this.height; y++) {
      for(let x = 0; x < this.width; x++) {
        if (this.grid()[y][x].isAlive === true) {
          ctx.fillStyle = this.grid()[y][x].aliveColor;
          ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
        } else {
          ctx.fillStyle = this.grid()[y][x].deadColor;
          ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
        }
      }
    }
  }

  setupGame() {
    initGrid();
    populateGridRandom();
    displayGrid();
  }

  runGame() {
    updateNeighbors();
    updateGrid();
    displayGrid();
  }

}

export class GameOfLife;
