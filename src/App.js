// import { Application } from 'pixi.js';
const Application = PIXI.Application;

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

const Graphics = PIXI.Graphics;
const rectangle = new Graphics();
rectangle
  .beginFill(0x3234a8)
  .lineStyle(4, 0x717beb, 1)
  .drawRect(500, 80, 350, 520)
  .endFill();

app.stage.addChild(rectangle);
// const poly = new Graphics();
