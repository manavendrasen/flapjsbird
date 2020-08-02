// import { reset } from "./resetGame";

const player = document.querySelector(".player");
const playableArea = document.querySelector(".playable-area");
let gap = document.querySelector(".gap");
let block = document.querySelector(".block");
let score = document.querySelector(".score");
const gameOverScreen = document.querySelector(".gameover");
let finalScore = document.querySelector(".finalScore");
let scores = 0;
let pixels = 20;

console.log(screen.height);

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
  // player.style.transform = `translateY(${pixels}px) rotate(5deg)`;
  player.style.transform = `translateY(${pixels}px)`;
  pixels += 20;
}, 60); // The number indicates the no. of times the player will be pushed below

const scoring = setInterval(() => {
  scores += 1;
  score.innerHTML = scores + " points";
}, 3000);

function push() {
  if (screen.height > 768) {
    // player.style.transform = `translateY(${pixels - 750}px) rotate(-180deg)`;
    player.style.transform = `translateY(${pixels - 750}px)`;
    pixels -= 750;
  } else {
    // player.style.transform = `translateY(${pixels - 600}px) rotate(-180deg)`;
    player.style.transform = `translateY(${pixels - 600}px)`;
    pixels -= 600;
  }
}
document.querySelector(".playable-area").addEventListener("click", push); // pushes the player up when clicked in the screen

//Collision detection with Border
function showCoordinate() {
  var position = player.getBoundingClientRect();
  let y = position.top;
  let x = position.left;
  // console.log(x + ", " + y);
  return [x, y];
}

function checkBorderCollision([x, y]) {
  let groundCoordinate = screen.height;
  let skyCorrdinate = 0;
  if (screen.height > 768) {
    groundCoordinate = screen.height - 300;
    skyCorrdinate -= 300;
  }

  if (y >= groundCoordinate || y <= skyCorrdinate) {
    //the body is below ground level or above screen
    // console.log(screen.height + " " + y);

    return true; // Yes the body is below ground level We need to stop
  } else {
    // console.log(screen.height + " " + y);
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
  // console.log(random);
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

  // console.log("stopped falling");

  //Show Gameover screen
  finalScore.innerHTML = scores + " points";
  gameOverScreen.classList.add("make-visible");
}

//Block Collision Detection
function blockCollision([x, y]) {
  var gapPosition = gap.getBoundingClientRect();
  let gapTop = gapPosition.top;
  let gapBottom = gapPosition.bottom;
  let gapLeft = gapPosition.left;
  let gapRight = gapPosition.right;
  let xoffset = 110;
  let ytoffset = 50;
  let yboffset = 100;
  if (screen.height <= 900) {
    xoffset = 50;
    ytoffset = 30;
    yboffset = 70;
  }
  if (x + xoffset >= gapLeft && x <= gapRight) {
    console.log("andar");
    if (y + ytoffset <= gapTop || y + yboffset >= gapBottom) {
      console.log("call");
      return true;
    } else {
      console.log("nocoll");
      return false;
    }
  }
  // console.log("bahar");
}
