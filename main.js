import './style.css';
import * as PIXI from 'pixi.js';
import { Snake } from './source/snake.js';
import { gameOverStyle } from './source/style.js';
import { eatingSound, gameOverSound } from './source/audio.js';

const Application = PIXI.Application;

const app = new Application({
  width: 400,
  height: 400,
  backgroundAlpha: true,
  antialias: true,
});

app.renderer.backgroundColor = 0x2a3c2a;

document.body.appendChild(app.view);
console.log(app.view.width, app.view.height);

//This is wehere we create out objects
const Graphics = PIXI.Graphics;
const gameBoard = new Graphics();
const snakeHead = new Graphics();
const snakeFood = new Graphics();

// Showing the Text
const myText = new PIXI.Text('Game Over', gameOverStyle);
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
  snakeHead.clear(); // clears the screen when the snake moves across the screen
  snakeFood.clear();
  checkFoodColision();
  renderSnakeFood();
  renderSnakeBody();
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

// Drawing the snake
function renderSnakeBody() {
  snakeHead
    .beginFill(0xffff00)
    .drawRect(
      rectangleX * rectanglesCount,
      rectangleY * rectanglesCount,
      rectangleSize,
      rectangleSize
    )
    .endFill();

  for (let i = 0; i < snakeElements.length; i++) {
    let element = snakeElements[i];
    snakeHead
      .beginFill(0xffff00)
      .drawRect(
        element.x * rectanglesCount,
        element.y * rectanglesCount,
        rectangleSize,
        rectangleSize
      )
      .endFill();
    gameBoard.addChild(snakeHead);
  }
  snakeElements.push(new Snake(rectangleX, rectangleY));

  if (snakeElements.length > snakeLength) {
    snakeElements.shift();
  }
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
