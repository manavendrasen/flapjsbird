const player = document.querySelector(".player");
const playableArea = document.querySelector(".playable-area");
let pixels = 20;

console.log(screen.height);
//gravity
var falling;
falling = setInterval(() => {
  if (checkGroundCollision(showCoordinate())) {
    //if true = the body has collided and we need to shop falling
    stopFalling();
  }
  player.style.transform = `translateY(${pixels}px)`;
  pixels += 20;
}, 100); // The number indicates the no. of times the player will be pushed below

function stopFalling() {
  clearInterval(falling);
  alert("game over");
}

function push() {
  player.style.transform = `translateY(${pixels - 750}px)`;
  pixels -= 750;
}

document.querySelector(".playable-area").addEventListener("click", push); // pushes the player up when clicked in the screen

//Collision detection with ground
function showCoordinate() {
  var position = player.getBoundingClientRect();
  let y = position.top;
  let x = position.left;
  return [x, y];
}

function checkGroundCollision([x, y]) {
  let groundCoordinate = screen.height - 300;

  if (y >= groundCoordinate) {
    //the body is below ground level
    console.log(screen.height + " " + y);
    playableArea.removeChild(player);
    return true; // Yes the body is below ground level We need to stop
  } else {
    console.log("else wlal");
    return false; //The body is on screen we are fine
  }
}
