//import Rainbow from 'rainbowvis.js';
// getting canvas
const canvas = document.querySelector("#game-grid");
const ctx = canvas.getContext("2d");

// updating parameters
const cellSize = 20;
const width = (canvas.width / cellSize);
const height = (canvas.height / cellSize);

// getting colors
//var vaporwave = new Rainbow();
//vaporwave.setSpectrum('#8B61AC', '#79E2FF', '#FF97C6');
//vaporwave.setNumberRange(0, width);




export class GameOfLife {
  constructor() {
    this.deadColor = '	#404040';
    this.cellSize = cellSize;
    this.width = width;
    this.height = height;
    this.grid = [];

    this.initGrid = () => {
      for (let y = 0; y < this.height; y++) {
        let row = [];
        for(let x = 0; x < this.width; x++) {
          row.push( {
            isAlive: false,
            //aliveColor: vaporwave.colourAt(x),
            aliveColor: 'whitesmoke',
            xCoord: x,
            yCoord: y,
            numNeighbors: 0
            });
          }
        this.grid.push(row);
        }
      };

    this.countNeighbors = (xCoord,yCoord) => {
      let numNeighbors = 0;
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          // make sure y neighbors are inbounds
          if(yCoord + i != this.height && yCoord + i >= 0) {
            if(xCoord + j != this.width && xCoord + j >= 0) {
              if(i === 0 && j === 0){
                continue;
              } else {
                if (this.grid[yCoord + i][xCoord + j].isAlive) {
                  numNeighbors++;
                }
              }
            }
          }
        }
      }

      return numNeighbors;
    };

    this.updateNeighbors = () => {
      for(let y = 0; y < this.height; y++) {
        for(let x = 0; x < this.width; x++) {
          this.grid[y][x].numNeighbors = this.countNeighbors(x,y);
        }
      }
    };

    this.updateCell = (xCoord, yCoord) => {
      let numNeighbors = this.grid[yCoord][xCoord].numNeighbors;
      // logic if the cell is already alive
      if (this.grid[yCoord][xCoord].isAlive) {
        // living cell dies
        if(numNeighbors > 3 || numNeighbors < 2) {
          this.grid[yCoord][xCoord].isAlive = false;
        }
      } else {
        // dead cell comes to life
        if (numNeighbors === 3) {
          this.grid[yCoord][xCoord].isAlive = true;
        }
      }
    };

    this.updateGrid = () => {
      for(let y = 0; y < this.height; y++) {
        for(let x = 0; x < this.width; x++) {
          this.updateCell(x,y);
        }
      }
    };

    this.populateGridRandom = () => {
      for(let y = 0; y < this.height; y++) {
        for(let x = 0; x < this.width; x++) {
          if(Math.random() > 0.5) {
            this.grid[y][x].isAlive = true;
          }
          this.grid[y][x].aliveColor = 'rgb(100, ' + Math.floor(0.8*(255 - (225 / this.width) * x)) + ', ' +
                         Math.floor(255 - (115 / this.height) * y) + ')';
          }

      }
      this.updateNeighbors();
    };

    this.displayGrid = () => {
      let color = this.deadColor;
      for(let y = 0; y < this.height; y++) {
        for(let x = 0; x < this.width; x++) {
          if (this.grid[y][x].isAlive) {
            ctx.fillStyle = this.grid[y][x].aliveColor;
          } else {
            ctx.fillStyle = this.deadColor;
          }

          ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
        }
      }
    };

    this.setupGame = () => {
      this.initGrid();
      this.populateGridRandom();
    };

    this.runGame = () => {
      this.displayGrid();
      this.updateGrid();
      this.updateNeighbors();
    };

    this.stop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

  }
}
