// let bgMusic = document.getElementById('bgMusic');
// let gameOverSound = document.getElementById('gameOverSound');

// // Play background music when the game starts
// document.addEventListener('keydown', function() {
//   if (bgMusic.paused) {
//     bgMusic.play(); // Play background music when user presses a key
//   }
// });

// let score = 0;
// let cross = true;
// let gameEnded = false;

// const dino = document.getElementById('dino');
// const obstacle = document.getElementById('obstacle');
// const gameOver = document.getElementById('gameOver');
// const scoreCont = document.getElementById('scoreCont');

// document.onkeydown = function (e) {
//   const dinoLeft = parseInt(window.getComputedStyle(dino).left);

//   if (e.key === "ArrowUp") {
//     // Trigger the jump animation only when the dino is not already jumping
//     if (!dino.classList.contains('animateDino')) {
//       dino.classList.add('animateDino');
//       setTimeout(() => {
//         dino.classList.remove('animateDino');
//       }, 1000); // Duration of the jump animation
//     }
//   }

//   if (e.key === "ArrowRight") {
//     dino.style.left = (dinoLeft + 112) + "px";
//   }

//   if (e.key === "ArrowLeft") {
//     dino.style.left = Math.max(0, dinoLeft - 112) + "px";
//   }
// };

// setInterval(() => {
//   const dx = parseInt(window.getComputedStyle(dino).left);
//   const dy = parseInt(window.getComputedStyle(dino).top);

//   const ox = parseInt(window.getComputedStyle(obstacle).left);
//   const oy = parseInt(window.getComputedStyle(obstacle).top);

//   const offsetX = Math.abs(dx - ox);
//   const offsetY = Math.abs(dy - oy);

//   if (offsetX < 120 && offsetY < 52 && !gameEnded) {
//     gameOver.innerHTML = "Game Over - Reload to Start";
//     obstacle.classList.remove('obstacleAni');
//     bgMusic.pause();
//     gameOverSound.play();
//     gameEnded = true;
//   }

//   else if (offsetX < 145 && cross) {
//     score += 1;
//     updateScore(score);
//     cross = false;
//     setTimeout(() => {
//       cross = true;
//     }, 1000);
//   }
// }, 100);

// function updateScore(score) {
//   scoreCont.innerHTML = "Your Score: " + score;
// }

// document.addEventListener('DOMContentLoaded', () => {
//   let bgMusic = document.getElementById('bgMusic');

//   document.addEventListener('keydown', function () {
//     if (bgMusic.paused) {
//       bgMusic.play().catch((e) => {
//         console.error("Playback failed:", e);
//       });
//     }
//   });
// });

// if (offsetX < 120 && offsetY < 52 && !gameEnded) {
//   gameOver.innerHTML = "Game Over - Reload to Start";
//   obstacle.classList.remove('obstacleAni');
//   bgMusic.pause();
//   bgMusic.currentTime = 0;

//   gameOverSound.pause();
//   gameOverSound.currentTime = 0;
//   gameOverSound.play().catch(err => {
//     console.log("Failed to play gameOverSound:", err);
//   });

//   gameEnded = true;
// }



let bgMusic = document.getElementById('bgMusic');
let gameOverSound = document.getElementById('gameOverSound');

let score = 0;
let cross = true;
let gameEnded = false;

const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');
const gameOver = document.getElementById('gameOver');
const scoreCont = document.getElementById('scoreCont');

// Start music on user key press
document.addEventListener('keydown', function () {
  if (bgMusic.paused && !gameEnded) {
    bgMusic.play().catch(err => console.log("Music play blocked:", err));
  }
});

document.onkeydown = function (e) {
  const dinoLeft = parseInt(window.getComputedStyle(dino).left);

  if (e.key === "ArrowUp") {
    dino.classList.add('animateDino');
    setTimeout(() => {
      dino.classList.remove('animateDino');
    }, 700);
  }

  if (e.key === "ArrowRight") {
    dino.style.left = (dinoLeft + 112) + "px";
  }

  if (e.key === "ArrowLeft") {
    dino.style.left = Math.max(0, dinoLeft - 112) + "px";
  }
};

setInterval(() => {
  const dx = parseInt(window.getComputedStyle(dino).left);
  const dy = parseInt(window.getComputedStyle(dino).top);

  const ox = parseInt(window.getComputedStyle(obstacle).left);
  const oy = parseInt(window.getComputedStyle(obstacle).top);

  const offsetX = Math.abs(dx - ox);
  const offsetY = Math.abs(dy - oy);

  if (offsetX < 120 && offsetY < 52 && !gameEnded) {
    gameOver.innerHTML = "Game Over - Reload to Start";
    obstacle.classList.remove('obstacleAni');
    bgMusic.pause();
    bgMusic.currentTime = 0;

    gameOverSound.pause();
    gameOverSound.currentTime = 0;
    gameOverSound.play().catch(err => console.log("Game over sound blocked:", err));
    
    gameEnded = true;
  } else if (offsetX < 145 && cross) {
    score += 1;
    updateScore(score);
    cross = false;
    setTimeout(() => cross = true, 1000);
  }
}, 100);

function updateScore(score) {
  scoreCont.innerHTML = "Your Score: " + score;
}
