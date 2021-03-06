<img src="https://media.giphy.com/media/Q933iQnuEYGQw/giphy.gif" alt="Snake game.">

# Playdate - Snake

This is a group assignment, the purpose was to create a game or an experience using JavaScript. The project had to utilize a third-party WebGL framework, we chose to create Snake using Pixi.js.

Link to Netlify:[Snake Game](https://snake-game-pixi.netlify.app/)

# Installation

Create account in [Firebase](https://firebase.google.com/)
Create .env file and paste your database credentials. Use .env.example file as reference.
Clone the repository, `run npm install` and `npm run dev`.

# Changelog

-   [#1-7 - Performed tests](#)
-   [#8 - Setup, installed PIXI.js and VITE](https://github.com/JonssonJohanna/Playdate/pull/8)
-   [#9 - Test moving image around screen](https://github.com/JonssonJohanna/Playdate/pull/9)
-   [#10 - Added snake food and Game Over text](https://github.com/JonssonJohanna/Playdate/pull/10)
-   [#11 - Snake Game draft 1](https://github.com/JonssonJohanna/Playdate/pull/11)
-   [#12 - Added Sound and new file structure](https://github.com/JonssonJohanna/Playdate/pull/12)
-   [#13 - Reconstructing PIXI](https://github.com/JonssonJohanna/Playdate/pull/13)
-   [#14 - Added canvas walls and game over text. Edited the file structure.](https://github.com/JonssonJohanna/Playdate/pull/14)
-   [#15 - Added a favicon and fixed snake body collision.](https://github.com/JonssonJohanna/Playdate/pull/15)
-   [#16 - Added button that is only displayed when 'game over'.](https://github.com/JonssonJohanna/Playdate/pull/16)
-   [#17 - Added score feature and some text in README.md.](https://github.com/JonssonJohanna/Playdate/pull/17)
-   [#18 - Test to see if audio works on Netlify. Added public folder.](https://github.com/JonssonJohanna/Playdate/pull/18)
-   [#19 - Added database.](https://github.com/JonssonJohanna/Playdate/pull/19)
-   [#20 - Test with Database to see if it works on Netlify.](https://github.com/JonssonJohanna/Playdate/pull/20)
-   [#21 - Display high score from firebase.](https://github.com/JonssonJohanna/Playdate/pull/21)
-   [#22 - Display high score from firebase.](https://github.com/JonssonJohanna/Playdate/pull/22)

# Code Review

1. main.js:296 - You might want to change onClick() to something that explains the function better.
2. General - All your functions are not in your function file.
3. General - Would be nice with some more comments to easier understand the code.
4. main.js - Your database configuration code could be in a separate file.
5. Main.js:280 + 214 - Make sure to check your spelling. (realoadButton + checkFoodColision)
6. General - You could split the code into different files for easier understanding. (For example your controls in one file etc.)
7. Main.js:57 - You are mixing arrow functions with other functions. Try to be consistent.
8. Main.js:64 + functions.js:45 - instead of using innerHTML you could use pixi text elements!
9. license file - Don't forget to add a LICENSE.
10. General - Nice game, well done! We like the instructive arrows, it???s very good for the accessibility! :)

# Testers

Tested by the following people:

1. Linnea Eriksson
2. Sofia R??nnkvist
3. Amanda Karlsson
4. Jennifer Andersson

Tested by the following muggles (non-coders):

1. Arthur Meland
2. Ebba Meland
3. Ivan Marinov
4. Galya Marinova
