let score = 0;
let cross = true;

const dino = document.querySelector('.dino');
const obstacle = document.querySelector('.obstacle');
const gameOver = document.querySelector('.gameOver');
const scoreCont = document.getElementById('scoreCont');
const audio = document.getElementById('bgMusic');
const audiogo = document.getElementById('gameOverSound');

let audioStarted = false;

function startAudio() {
    if (!audioStarted) {
        audio.play().catch(err => console.log("Autoplay blocked:", err));
        audioStarted = true;
    }
}

function jump() {
    const dino = document.querySelector('.dino');
    if (!dino.classList.contains('animateDino')) {
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 600); // Match with your animation duration
    }
}

// Touch event (fallback, in case you want tap anywhere to jump)
document.body.addEventListener('touchstart', function () {
    jump();
}, { passive: true });

function moveLeft() {
    let dinoX = parseInt(window.getComputedStyle(dino).getPropertyValue('left'));
    dino.style.left = (dinoX - 112) + "px";
}

function moveRight() {
    let dinoX = parseInt(window.getComputedStyle(dino).getPropertyValue('left'));
    dino.style.left = (dinoX + 112) + "px";
}

document.addEventListener('keydown', function (e) {
    startAudio();
    if (e.keyCode == 38) jump();
    if (e.keyCode == 37) moveLeft();
    if (e.keyCode == 39) moveRight();
});

// Touch controls
document.getElementById('jumpBtn').addEventListener('click', () => {
    startAudio();
    jump();
});
document.getElementById('leftBtn').addEventListener('click', () => {
    startAudio();
    moveLeft();
});
document.getElementById('rightBtn').addEventListener('click', () => {
    startAudio();
    moveRight();
});

setInterval(() => {
    let dx = parseInt(window.getComputedStyle(dino).getPropertyValue('left'));
    let dy = parseInt(window.getComputedStyle(dino).getPropertyValue('top'));

    let ox = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
    let oy = parseInt(window.getComputedStyle(obstacle).getPropertyValue('top'));

    let offsetX = Math.abs(dx - ox);
    let offsetY = Math.abs(dy - oy);

    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to Play Again";
    
        obstacle.classList.remove('obstacleAni');
        obstacle.style.animation = "none";
    
        audio.pause();        // stop background music immediately
        audio.currentTime = 0;
    
        audiogo.currentTime = 0;  // rewind to start
        audiogo.play();          // play game over sound
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            let aniDur = parseFloat(window.getComputedStyle(obstacle).getPropertyValue('animation-duration'));
            let newDur = aniDur - 0.1;
            if (newDur > 2) obstacle.style.animationDuration = newDur + 's';
        }, 500);
    }
}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score;
}

       
