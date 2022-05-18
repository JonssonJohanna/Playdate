import './style.css';
import * as PIXI from 'pixi.js';
import { Snake } from './source/snake.js';
import { gameOverStyle } from './source/style.js';
import { eatingSound, gameOverSound } from './source/audio.js';
import { renderSnakeBody } from './source/functions';
// import { rectangleX, rectangleY } from './source/variables';

const { Application, Graphics, Text } = PIXI;

const app = new Application({
  width: 400,
  height: 400,
  backgroundAlpha: true,
  antialias: true,
});

app.renderer.backgroundColor = 0x2a3c2a;

document.body.appendChild(app.view);
// console.log(app.view.width, app.view.height);

//This is wehere we create out objects
const gameBoard = new Graphics();
const snakeHead = new Graphics();
const snakeFood = new Graphics();

// Showing the Text
const myText = new Text('Game Over', gameOverStyle);
myText.anchor.set(-0.3, -1.2);
// app.stage.addChild(myText);

// Creating grid
let speed = 3;
let rectanglesCount = 20;
let rectangleSize = app.view.width / rectanglesCount - 2;
let rectangleX = 10;
let rectangleY = 10;

let speedX = 0;
let speedY = 0;

let snakeFoodX = 5;
let snakeFoodY = 5;

// Snake length
const snakeElements = [];
let snakeLength = 1;

//Game Loop
function updateScreen() {
  clearScreen();
  changeRectanglePosition();
  const gameOver = gameOverText();
  if (gameOver) {
    return;
  }
  snakeHead.clear(); // clears the screen when the snake moves across the screen
  snakeFood.clear();
  checkFoodColision();
  renderSnakeFood();
  renderSnakeBody(
    snakeHead,
    gameBoard,
    rectangleX,
    rectangleY,
    rectanglesCount,
    rectangleSize,
    snakeElements,
    snakeLength
  );
  setTimeout(updateScreen, 1000 / speed);
}
//
function clearScreen() {
  gameBoard
    .beginFill(0x2a3c2a)
    .drawRect(0, 0, app.view.width, app.view.height)
    .endFill();

  app.stage.addChild(gameBoard);
  // gameBoard.addChild(myText);
}

function renderSnakeFood() {
  snakeFood
    .beginFill(0x27fa07)
    .drawRect(
      snakeFoodX * rectanglesCount,
      snakeFoodY * rectanglesCount,
      rectangleSize,
      rectangleSize
    )
    .endFill();

  gameBoard.addChild(snakeFood);
}

function changeRectanglePosition() {
  rectangleX = rectangleX + speedX;
  rectangleY = rectangleY + speedY;
}

function checkFoodColision() {
  if (snakeFoodX === rectangleX && snakeFoodY == rectangleY) {
    snakeFoodX = Math.floor(Math.random() * rectanglesCount);
    snakeFoodY = Math.floor(Math.random() * rectanglesCount);
    snakeLength++;

    //eating audio when check for collision
    eatingSound.play();
    setTimeout(function () {
      eatingSound.play();

      setTimeout(function () {
        eatingSound.pause();
        eatingSound.currentTime = 0;
      }, 600);
    });
  }
}

function gameOverText() {
  let stopGame = false;
  if (rectangleX === rectanglesCount) {
    stopGame = true;
    gameOverSound.play();
  }
  if (rectangleX < 0) {
    stopGame = true;
    gameOverSound.play();
  }
  if (rectangleY === rectanglesCount) {
    stopGame = true;
    gameOverSound.play();
  }
  if (rectangleY < 0) {
    stopGame = true;
    gameOverSound.play();
  }
  if (stopGame) {
    return app.stage.addChild(myText);
  }
}

document.body.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowUp') {
    if (speedY == 1) return;
    speedY = -1;
    speedX = 0;
  }
  if (e.key === 'ArrowDown') {
    if (speedY == -1) return;
    speedY = 1;
    speedX = 0;
  }
  if (e.key === 'ArrowLeft') {
    if (speedX == 1) return;
    speedY = 0;
    speedX = -1;
  }
  if (e.key === 'ArrowRight') {
    if (speedX == -1) return;
    speedY = 0;
    speedX = 1;
  }
});

updateScreen();
