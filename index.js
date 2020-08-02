// import { reset } from "./resetGame";

const player = document.querySelector(".player");
const playableArea = document.querySelector(".playable-area");
let gap = document.querySelector(".gap");
let block = document.querySelector(".block");

let pixels = 20;

console.log(screen.height);

//gravity
var falling;
falling = setInterval(() => {
  if (checkBorderCollision(showCoordinate())) {
    //if true = the body has collided and we need to end game
    gameOver();
  }
  player.style.transform = `translateY(${pixels}px) rotate(5deg)`;
  pixels += 20;
}, 50); // The number indicates the no. of times the player will be pushed below

function push() {
  if (screen.height > 768) {
    player.style.transform = `translateY(${pixels - 750}px) rotate(-180deg)`;
    pixels -= 750;
  } else {
    player.style.transform = `translateY(${pixels - 600}px) rotate(-180deg)`;
    pixels -= 600;
  }
}
document.querySelector(".playable-area").addEventListener("click", push); // pushes the player up when clicked in the screen

//Collision detection with Border
function showCoordinate() {
  var position = player.getBoundingClientRect();
  let y = position.top;
  let x = position.left;
  console.log(x + ", " + y);
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

  //Stop Pushing
  clearInterval(falling);

  // console.log("stopped falling");

  //Show Gameover screen
  document.querySelector(".gameover").classList.add("make-visible");
}
