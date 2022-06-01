import './style.css';
import * as PIXI from 'pixi.js';
import { gameOverStyle, replayText, scoreStyle } from './source/style.js';
import { eatingSound, gameOverSound } from './source/audio.js';
import { renderSnakeBody, fillYourName } from './source/functions';
import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  onValue,
  ref,
  set,
  push,
  query,
  limitToLast,
  orderByChild,
} from 'firebase/database';
const API_KEY = import.meta.env.VITE_API_KEY;
const AUTH_DOMAIN = import.meta.env.VITE_AUTH_DOMAIN;
const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
const STORAGE_BUCKET = import.meta.env.VITE_STORAGE_BUCKET;
const SENDER_ID = import.meta.env.VITE_SENDER_ID;
const APP_ID = import.meta.env.VITE_APP_ID;
const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

const firebaseConfig = {
  apiKey: { API_KEY },
  authDomain: { AUTH_DOMAIN },
  projectId: { PROJECT_ID },
  storageBucket: { STORAGE_BUCKET },
  messagingSenderId: { SENDER_ID },
  appId: { APP_ID },
  databaseURL:
    'https://high-score-220bc-default-rtdb.europe-west1.firebasedatabase.app',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

function writeUserData(name, score) {
  const db = getDatabase();
  const postListRef = ref(db, 'scores/');

  const newPostRef = push(postListRef);
  set(newPostRef, {
    username: name,
    score: score,
  });
}

const db = getDatabase();
const userScores = query(
  ref(db, 'scores/'),
  orderByChild('score'),
  limitToLast(1)
);

onValue(
  userScores,
  (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      let highScore = childSnapshot.val().score;
      let userName = childSnapshot.val().username;
      let div = document.createElement('div');
      div.innerHTML = `
      <p>Name: ${userName}</p>
      <p>High score: ${highScore}</p>
      `;
      div.style.position = 'absolute';
      div.style.top = '2%';
      div.style.right = '3%';
      div.style.color = '#2a3c2a';
      div.style.fontWeight = 'bold';
      div.style.fontFamily = 'Arial';
      document.body.appendChild(div);
    });
  },
  {
    onlyOnce: true,
  }
);

const { Application, Graphics, Text } = PIXI;

const app = new Application({
  width: 400,
  height: 400,
  backgroundAlpha: true,
  antialias: true,
});

app.renderer.backgroundColor = 0x2a3c2a;
document.body.appendChild(app.view);

const gameBoard = new Graphics();
const snakeHead = new Graphics();
const snakeFood = new Graphics();
const button = new Graphics();

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
let inputValue;

// Snake length
const snakeElements = [];
let snakeLength = 1;

fillYourName();

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
  checkFoodCollision();
  reloadButton();
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
var userNameInput = document.createElement('INPUT');
userNameInput.setAttribute('type', 'text');
userNameInput.setAttribute('value', '');
userNameInput.style.color = '#2a3c2a';
userNameInput.style.position = 'absolute';
userNameInput.style.top = '50%';
userNameInput.style.left = '50%';
userNameInput.style.transform = 'translate(-50%, -50%)';

var playButton = document.createElement('button');
playButton.innerHTML = 'Submit';
playButton.style.position = 'absolute';
playButton.style.top = '55%';
playButton.style.left = '50%';
playButton.style.transform = 'translate(-50%, -50%)';
document.body.appendChild(playButton);
document.body.appendChild(userNameInput);

const provideNameText = document.querySelector('.provide-name-text');

function inputUsername() {
  if (!userNameInput.value == '') {
    inputValue = userNameInput.value;
    updateScreen();
    if (provideNameText) {
      provideNameText.innerHTML = `Enjoy the Game, ${inputValue}!`;
      provideNameText.style.top = '215px';
      provideNameText.style.position = 'relative';
      provideNameText.style.color = 'red';
      provideNameText.classList.add('provide-name');
      userNameInput.remove();
      playButton.remove();
    }
  }
}

playButton.addEventListener('click', inputUsername);

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

function checkFoodCollision() {
  if (snakeFoodX === rectangleX && snakeFoodY == rectangleY) {
    snakeFoodX = Math.floor(Math.random() * rectanglesCount);
    snakeFoodY = Math.floor(Math.random() * rectanglesCount);
    snakeLength++;
    score++;
    speed += 0.25;
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
    writeUserData(inputValue, score);
  }
  if (rectangleX < 0) {
    stopGame = true;
    gameOverSound.play();
    writeUserData(inputValue, score);
  }
  if (rectangleY === rectanglesCount) {
    stopGame = true;
    gameOverSound.play();
    writeUserData(inputValue, score);
  }
  if (rectangleY < 0) {
    stopGame = true;
    gameOverSound.play();
    writeUserData(inputValue, score);
  }
  for (let i = 0; i < snakeElements.length; i++) {
    let element = snakeElements[i];
    if (element.x === rectangleX && element.y === rectangleY) {
      stopGame = true;
      gameOverSound.play();
      writeUserData(inputValue, score);
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

function reloadButton() {
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
