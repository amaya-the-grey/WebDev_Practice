const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  // takes 2D array of neutral chars ' ', holes '0', and one hat '^'
  constructor(array) {
    this.field = array;
    this.xMax = array[0].length;
    this.yMax = array.length;
    this.pathX = 0;
    this.pathY = 0;
    this.gameOver = false;
  }
  print() {
    var formatted = this.field.map((item) => {
      // map over each row in array and join, add new line at end
      var row = item;
      return row.join(" ");
    }).join("\n");
    console.log(formatted);
  }

  endGame() {
    this.gameOver = true;
    console.log('The game is over! Thanks for playing!')
  }

  updatePath() {
    const direction = prompt('u, d, l, or r?');
    if (direction === 'r') {
     this.pathX++;
    }
    if (direction === 'l') {
      this.pathX--;
    }
    if (direction === 'u') {
      this.pathY--;
    }
    if (direction === 'd') {
      this.pathY++;
    }
  }

  locationCheck() {
    if (this.pathX >= this.xMax || this.pathX < 0) {
      console.log('You went out of bounds!');
      this.endGame();
      return;
    }
    if (this.pathY >= this.yMax || this.pathY < 0) {
      console.log('You went out of bounds!');
      this.endGame();
      return;
    }
    if(this.field[this.pathY][this.pathX] === hole) {
      console.log('You fell into my trap!');
      this.endGame();
      return;
    }
    if(this.field[this.pathY][this.pathX] === hat) {
      console.log('You found your hat!');
      this.endGame();
      return;
    }
  }

  updateField() {
    this.locationCheck();
    if(this.gameOver === true) {
      return;
    }
    this.field[this.pathY][this.pathX] = '*';
  }

  runGame() {
    while (this.gameOver === false) {
      this.print();
      this.updatePath();
      this.updateField();
    }
  }

  static generateField(length, height, percentage) {
    if(length <= 0 || height <= 0) {
      console.log('Invalid input');
      return;
    }
    // generate empty field
    var field = Array(height);
    for (let i = 0; i < field.length; i++ ) {
      field[i] = Array(length).fill('░');
    }
    // check for number of holes
    const numHoles = Math.floor(length*height*percentage);

    // populate with holes
    for (let j = 0; j <= numHoles; j++) {
      // can't be 0,0
      let randX = Math.floor(Math.random()*(length - 1)) + 1;
      let randY = Math.floor(Math.random()*(height - 1)) + 1;
      field[randY][randX] = hole;
    }
    // place hat
    // can't be 0,0
    let randX = Math.floor(Math.random()*(length - 1)) + 1;
    let randY = Math.floor(Math.random()*(height - 1)) + 1;
    field[randY][randX] = hat;

    field[0][0] = '*';
    return field;
  }

}

const bigField = new Field(Field.generateField(10,12,0.2));
bigField.runGame();
