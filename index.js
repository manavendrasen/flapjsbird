const player = document.querySelector(".player");
const playableArea = document.querySelector(".playable-area");
let gap = document.querySelector(".gap");
let block = document.querySelector(".block");
let score = document.querySelector(".score");
const gameOverScreen = document.querySelector(".gameover");
let finalScore = document.querySelector(".finalScore");
let scores = 0;
let pixels = 20;

//sw;
window.addEventListener("load", () => {
  registerSW();
});

async function registerSW() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("./sw.js");
    } catch (e) {
      console.log(`SW registration failed`);
    }
  }
}

// Debugging
// console.log(screen.height);

//gravity
var falling;
falling = setInterval(() => {
  if (
    checkBorderCollision(showCoordinate()) ||
    blockCollision(showCoordinate())
  ) {
    //if true = the body has collided and we need to end game
    gameOver();
  }
  player.style.transform = `translateY(${pixels}px) rotate(5deg)`;
  pixels += 20;
}, 60); // The number indicates the no. of times the player will be pushed below

const scoring = setInterval(() => {
  scores += 1;
  score.innerHTML = scores + " Points";
}, 1000);

function push() {
  if (screen.height > 900) {
    player.style.transform = `translateY(${pixels - 750}px) rotate(-210deg)`;
    pixels -= 750;
  } else {
    player.style.transform = `translateY(${pixels - 600}px) rotate(-210deg)`;
    pixels -= 600;
  }
}
document.querySelector(".playable-area").addEventListener("click", push); // pushes the player up when clicked in the screen

//Collision detection with Border
function showCoordinate() {
  var position = player.getBoundingClientRect();
  let y = position.top;
  let x = position.left;
  return [x, y];
}

function checkBorderCollision([x, y]) {
  let groundCoordinate = screen.height;
  let skyCorrdinate = 0;
  if (screen.height > 900) {
    groundCoordinate = screen.height - 300;
    skyCorrdinate -= 300;
  }

  if (y >= groundCoordinate || y <= skyCorrdinate) {
    //the body is below ground level or above screen
    return true; // Yes the body is below ground level We need to stop
  } else {
    return false; //The body is on screen we are fine
  }
}
//reset game
document.querySelector(".reset-button").addEventListener("click", reset);
function reset() {
  location.reload();
}

//gap
gap.addEventListener("animationiteration", () => {
  let random = Math.random() * 50 + 10;
  gap.style.top = random + "%";
});

//gameover
function gameOver() {
  //Removed elements
  playableArea.removeChild(block);
  playableArea.removeChild(gap);
  playableArea.removeChild(player);
  playableArea.removeChild(score);

  //Stop Pushing
  clearInterval(falling);

  //Show Gameover screen
  finalScore.innerHTML = scores + " Points";
  gameOverScreen.classList.add("make-visible");
}

//Block Collision Detection
function blockCollision([x, y]) {
  var gapPosition = gap.getBoundingClientRect();
  let gapTop = gapPosition.top;
  let gapBottom = gapPosition.bottom;
  let gapLeft = gapPosition.left;
  let gapRight = gapPosition.right;
  let xoffset = 120;
  let ytoffset = 50;
  let yboffset = 100;

  if (screen.height < 900) {
    xoffset = 80;
    ytoffset = 30;
    yboffset = 70;
  }
  if (x + xoffset >= gapLeft && x <= gapRight) {
    if (y + ytoffset <= gapTop || y + yboffset >= gapBottom) {
      return true;
    } else {
      return false;
    }
  }
}
