import * as PIXI from 'pixi.js';

export let speed = 3;
export let rectanglesCount = 20;

const { Application, Graphics, Text } = PIXI;

const app = new Application({
  width: 400,
  height: 400,
  backgroundAlpha: true,
  antialias: true,
});

export let rectangleX = 10,
  rectangleY = 10;
// export let rectangleY = 10;

export let speedX = 0;
export let speedY = 0;

export let snakeFoodX = 5;
export let snakeFoodY = 5;

// Snake length
export const snakeElements = [];
export let snakeLength = 1;
