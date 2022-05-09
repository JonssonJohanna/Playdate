import './style.css';
import * as PIXI from 'pixi.js';

document.querySelector('#app').innerHTML = `
<h3>Simple Snake Game</h3>
<div id="keys"></div>
`;

const Application = PIXI.Application;
let keys = {};
let keysDiv;

const app = new Application({
  width: 500,
  height: 200,
  transparent: false,
  antialias: true,
});

app.renderer.backgroundColor = 0x9ecce8;

app.renderer.resize(window.innerWidth, window.innerWidth);

app.renderer.view.style.position = 'absolute';

document.body.appendChild(app.view);

// player object
const player = new PIXI.Sprite.from('./converse.png');
player.anchor.set(0.5);
player.x = app.view.width / 2;
player.y = app.view.height / 2;
player.width = 50;
player.height = 50;
app.stage.addChild(player);

// keyboard event handlers
window.addEventListener('keydown', keysDown);
window.addEventListener('keyup', keysUp);

app.ticker.add(gameLoop);
keysDiv = document.querySelector('#keys');

function keysDown(e) {
  console.log(e.keyCode);
  keys[e.keyCode] = true;
}
function keysUp(e) {
  console.log(e.keyCode);
  keys[e.keyCode] = false;
}

function gameLoop() {
  keysDiv.innerHTML = JSON.stringify(keys);

  if (keys['38']) {
    player.y -= 5;
  }
  if (keys['40']) {
    player.y += 5;
  }
  if (keys['37']) {
    player.x -= 5;
  }
  if (keys['39']) {
    player.x += 5;
  }
}
