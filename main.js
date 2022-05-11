import './style.css';
import * as PIXI from 'pixi.js';

const Application = PIXI.Application;
let keys = {};
let keysDiv;

const app = new Application({
  width: 500,
  height: 500,
  transparent: false,
  antialias: true,
});

app.renderer.backgroundColor = '0x9ecce8';

app.renderer.resize(window.innerWidth, window.innerHeight);

app.renderer.view.style.position = 'absolute';

document.body.appendChild(app.view);

// snake object
const snake = new PIXI.Sprite.from('./converse.png');
snake.anchor.set(0.5, 0.5);
snake.x = app.view.width / 2;
snake.y = app.view.height / 2;
snake.width = 30;
snake.height = 30;
app.stage.addChild(snake);

const snakeFood = new PIXI.Sprite.from('./converse.png');
snakeFood.anchor.set(1.5, 0.5);
snakeFood.x = app.view.width / 4;
snakeFood.y = app.view.height / 4;
snakeFood.width = 30;
snakeFood.height = 30;
app.stage.addChild(snakeFood);

// Text Object
const style = new PIXI.TextStyle({
  fontFamily: 'Montserrat',
  fontSize: 48,
  fill: '#0579b3',
  stroke: '#ffffff',
  strokeThickness: 4,
  dropShadow: true,
  dropShadowDistance: 5,
  dropShadowAngle: Math.PI / 2,
  dropShadowBlur: 2,
  dropShadowColor: '#000000',
});

const myText = new PIXI.Text('Snake', style);
// myText.anchor.set(-0.5);
app.stage.addChild(myText);

// keyboard event handlers
window.addEventListener('keydown', keysDown);
window.addEventListener('keyup', keysUp);

// app.ticker.add(gameLoop);
keysDiv = document.querySelector('#app');

function keysDown(e) {
  // console.log(e.keyCode);
  keys[e.keyCode] = true;
}
function keysUp(e) {
  // console.log(e.keyCode);
  keys[e.keyCode] = false;
}
function gameOverText() {
  style.fill = 'red';
  // myText.style.align = 'center';
  myText.text = 'Game Over!';
}

let movingSnakeRight = 0.8;
let movingSnakeLeft = 0;
let movingSnakeUp = 0;
let movingSnakeDown = 0;

app.ticker.add(() => {
  keysDiv.innerHTML = JSON.stringify(keys);

  snake.x += movingSnakeRight;
  snake.x -= movingSnakeLeft;

  snake.y -= movingSnakeUp;
  snake.y += movingSnakeDown;

  if (snake.x > window.innerWidth - 15) {
    gameOverText();
    snake.x = window.innerWidth - 15;
  }

  if (snake.x <= 15) {
    gameOverText();
    snake.x = 15;
  }

  if (snake.y > window.innerHeight - 15) {
    gameOverText();
    snake.y = window.innerHeight - 15;
  }

  if (snake.y <= 15) {
    gameOverText();
    snake.y = 15;
  }

  // Moving Up
  if (keys['38']) {
    movingSnakeUp = 0.8;
    movingSnakeDown = 0;
    movingSnakeRight = 0;
    movingSnakeLeft = 0;
  }

  // Moving Down
  if (keys['40']) {
    movingSnakeUp = 0;
    movingSnakeDown = 0.8;
    movingSnakeRight = 0;
    movingSnakeLeft = 0;
  }

  // Moving Right
  if (keys['39']) {
    movingSnakeUp = 0;
    movingSnakeDown = 0;
    movingSnakeRight = 0.8;
    movingSnakeLeft = 0;
  }

  // Moving Left
  if (keys['37']) {
    movingSnakeUp = 0;
    movingSnakeDown = 0;
    movingSnakeRight = 0;
    movingSnakeLeft = 0.8;
  }
});
