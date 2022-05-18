import * as PIXI from 'pixi.js';
import { Snake } from './snake.js';

export function renderSnakeBody(
  snakeHead,
  gameBoard,
  rectangleX,
  rectangleY,
  rectanglesCount,
  rectangleSize,
  snakeElements,
  snakeLength
) {
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

  while (snakeElements.length > snakeLength) {
    snakeElements.shift();
  }
}
