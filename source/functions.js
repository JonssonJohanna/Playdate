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

export function fillYourName() {
  let div = document.createElement('div');
  div.innerHTML = `<p class="provide-name-text">To start provide your name!</p>`;
  div.style.position = 'absolute';
  div.style.top = '45%';
  div.style.left = '50%';
  div.style.fontWeight = 'bold';
  div.style.fontFamily = 'Arial';
  div.style.transform = 'translate(-50%, -50%)';
  div.style.color = 'white';
  document.body.appendChild(div);
}
