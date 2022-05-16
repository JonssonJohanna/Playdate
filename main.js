import './style.css';
import * as PIXI from 'pixi.js';

class Snake {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const Application = PIXI.Application;
// let keys = {};
// let keysDiv;

const app = new Application({
  width: 400,
  height: 400,
  backgroundAlpha: true,
  antialias: true,
});

app.renderer.backgroundColor = 0x2a3c2a;

// app.renderer.resize(window.innerWidth, window.innerHeight);

// app.renderer.view.style.position = 'absolute';

document.body.appendChild(app.view);
// console.log(app.view.width, app.view.height);

const Graphics = PIXI.Graphics;
const rectangle = new Graphics();
const rect = new Graphics();
const foodRectangle = new Graphics();
// rect.beginFill(0xffffff).drawRect(200, 150, 20, 20).endFill();
// app.stage.addChild(rect);

// Text Object
const style = new PIXI.TextStyle({
  fontFamily: 'Montserrat',
  fontSize: 48,
  fill: 'red',
  stroke: '#ffffff',
  strokeThickness: 4,
  dropShadow: true,
  dropShadowDistance: 5,
  dropShadowAngle: Math.PI / 2,
  dropShadowBlur: 2,
  dropShadowColor: '#000000',
});

// Showing the Text
const myText = new PIXI.Text('Game Over', style);
myText.anchor.set(-0.3, -1.2);
app.stage.addChild(myText);

// Test
let speed = 2;
let rectanglesCount = 20;
let rectangleSize = app.view.width / rectanglesCount - 2;
let rectangleX = 10;
let rectangleY = 10;

let speedX = 0;
let speedY = 0;

let foodRectangleX = 5;
let foodRectangleY = 5;

const snakeElements = [];
let rectanglesLength = 2;

//Game Loop
function updateScreen() {
  clearScreen();
  changeRectanglePosition();
  rect.clear();
  foodRectangle.clear();

  checkFoodColision();
  renderSnakeFood();
  renderSnakeBody();
  setTimeout(updateScreen, 1000 / speed);
}

function clearScreen() {
  rectangle
    .beginFill(0x2a3c2a)
    .drawRect(0, 0, app.view.width, app.view.height)
    .endFill();

  app.stage.addChild(rectangle);
  // rectangle.addChild(myText);
}

// Drawing a small rectangle
function renderSnakeBody() {
  rect
    .beginFill(0xffff00)
    .drawRect(
      rectangleX * rectanglesCount,
      rectangleY * rectanglesCount,
      rectangleSize,
      rectangleSize
    )
    .endFill();

  rectangle.addChild(rect);

  for (let i = 0; i < snakeElements.length; i++) {
    let element = snakeElements[i];
    rect
      .beginFill(0xffff00)
      .drawRect(
        element.x * rectanglesCount,
        element.y * rectanglesCount,
        rectangleSize,
        rectangleSize
      )
      .endFill();
    rectangle.addChild(rect);
  }
  snakeElements.push(new Snake(rectangleX, rectangleY));

  if (snakeElements.length > rectanglesLength) {
    snakeElements.shift();
  }
}

function renderSnakeFood() {
  foodRectangle
    .beginFill(0x27fa07)
    .drawRect(
      foodRectangleX * rectanglesCount,
      foodRectangleY * rectanglesCount,
      rectangleSize,
      rectangleSize
    )
    .endFill();

  rectangle.addChild(foodRectangle);
}

function changeRectanglePosition() {
  rectangleX = rectangleX + speedX;
  rectangleY = rectangleY + speedY;
}

function checkFoodColision() {
  if (foodRectangleX === rectangleX && foodRectangleY == rectangleY) {
    foodRectangleX = Math.floor(Math.random() * rectanglesCount);
    foodRectangleY = Math.floor(Math.random() * rectanglesCount);
    rectanglesLength++;
    // score++;
    // gulpSound.play();
  }
}

document.body.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowUp') {
    // rect.y -= 18;
    if (speedY == 1) return;
    speedY = -1;
    speedX = 0;
  }
  if (e.key === 'ArrowDown') {
    // rect.y += 18
    if (speedY == -1) return;
    speedY = 1;
    speedX = 0;
  }
  if (e.key === 'ArrowLeft') {
    // rect.x -= 18
    if (speedX == 1) return;
    speedY = 0;
    speedX = -1;
  }
  if (e.key === 'ArrowRight') {
    // rect.x += 18
    if (speedX == -1) return;
    speedY = 0;
    speedX = 1;
  }
});

updateScreen();
