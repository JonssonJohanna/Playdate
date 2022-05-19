import * as PIXI from 'pixi.js';
// Text Object "Game over"
export const gameOverStyle = new PIXI.TextStyle({
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

export const replayText = new PIXI.TextStyle({
  fontFamily: 'Arial',
  fontSize: 30,
  fill: '#2a3c2a',
});
