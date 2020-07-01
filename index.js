const player = document.querySelector(".player");
let pixels = 20;
//gravity
setInterval(() => {
  player.style.transform = `translateY(${pixels}px)`;
  pixels += 20;
  console.log("move");
}, 50);

function sayHi() {
  player.style.transform = `translateY(${pixels - 750}px)`;
  pixels -= 750;
}

document.querySelector(".playable-area").addEventListener("click", sayHi);
