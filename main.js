import './style.css';
import * as PIXI from 'pixi.js';
import { Snake } from './source/snake.js';
import { gameOverStyle, replayText, scoreStyle } from './source/style.js';
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
const button = new Graphics();

// Showing the Text
const myText = new Text('Game Over', gameOverStyle);
myText.anchor.set(-0.4, -1.2);

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
let score = 0;

// Snake length
const snakeElements = [];
let snakeLength = 1;

//Game Loop
function updateScreen() {
  changeRectanglePosition();
  const gameOver = checkStopGame();
  if (gameOver) {
    return;
  }
  clearScreen();
  snakeHead.clear();
  snakeFood.clear();
  checkFoodColision();
  realoadButton();
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
  showScore();
  setTimeout(updateScreen, 1000 / speed);
}

function clearScreen() {
  gameBoard
    .beginFill(0x2a3c2a)
    .drawRect(0, 0, app.view.width, app.view.height)
    .endFill();

  app.stage.addChild(gameBoard);
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
    score++;
    speed += 0.25;
    console.log(score);
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

function checkStopGame() {
  let stopGame = false;

  if (speedY === 0 && speedX === 0) {
    return false;
  }

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
  for (let i = 0; i < snakeElements.length; i++) {
    let element = snakeElements[i];
    if (element.x === rectangleX && element.y === rectangleY) {
      stopGame = true;
      gameOverSound.play();
      break;
    }
  }

  if (stopGame) {
    return app.stage.addChild(button) && app.stage.addChild(myText);
  }
  return stopGame;
}

function showScore() {
  const scoreText = new Text(`Score ${score}`, scoreStyle);
  scoreText.anchor.set(-0.2, -0.2);
  app.stage.addChild(scoreText);
}

// Replay Button
function realoadButton() {
  button
    .beginFill(0xffff00)
    .drawRoundedRect(app.view.height / 3, app.view.width / 2, 130, 50)
    .lineStyle(2, 0xffffff)
    .endFill();
  button.interactive = true;
  button.buttonMode = true;
  button.on('click', onClick);
}
const font = new Text('Replay', replayText);
font.x = 200;
font.y = 225;
font.anchor.set(0.5);
button.addChild(font);

function onClick() {
  window.location.reload();
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
