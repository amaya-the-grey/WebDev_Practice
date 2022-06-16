import {GameOfLife} from './GameOfLife.js'
const game = new GameOfLife()
game.setupGame()
window.onload = () => {
   document.querySelector("#start-random").addEventListener("click", () => {
       game.populateGridRandom();
       window.setInterval(() => {
           game.runGame();
       }, 300);
    })
  document.querySelector("#stop").addEventListener("click", () => {
       game.setupGame();
  })
}
