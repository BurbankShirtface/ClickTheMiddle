const playButton = document.querySelector(".play");
let playAgain = document.querySelector(".play-again");
const container = document.querySelector(".container");
const gamebox = document.querySelector(".game-box");
const rules = document.querySelector(".rules-container");
const result = document.querySelector(".result");
let crosshairs = document.querySelector(".user-crosshairs");
let containerInfo = container.getBoundingClientRect();
let gameMaxWidth = Math.round(containerInfo.width);
let gameMaxHeight = Math.round(containerInfo.height);
let xMiddle,
  yMiddle,
  gameboxHeight,
  gameboxWidth,
  xCloseToMiddle,
  yCloseToMiddle,
  totalMiss,
  clickX,
  clickY;

window.addEventListener("resize", function () {
  containerInfo = container.getBoundingClientRect();
  gameMaxWidth = Math.round(containerInfo.width);
  gameMaxHeight = Math.round(containerInfo.height);
  return gameMaxHeight, gameMaxWidth;
});

function makebox(maxHeight, maxWidth) {
  gameboxHeight = Math.round(maxHeight / (Math.floor(Math.random() * 10) + 1));
  gameboxWidth = Math.round(maxWidth / (Math.floor(Math.random() * 10) + 1));
  let x = Math.floor(Math.random() * (maxWidth - gameboxWidth));
  let y = Math.floor(Math.random() * (maxHeight - gameboxHeight));
  let xAxis = 300 + x;
  let yAxis = 300 + y;
  if (xAxis > maxWidth) {
    x = Math.abs(x - 300);
  }
  if (yAxis > maxHeight) {
    y = Math.abs(y - 300);
  }
  crosshairs.style.display = "none";
  gamebox.style.width = gameboxWidth + "px";
  gamebox.style.height = gameboxHeight + "px";
  gamebox.style.top = y + "px";
  gamebox.style.left = x + "px";
  gamebox.style.border = "solid 2px black";
  gamebox.style.borderRadius = "5px";
  gamebox.style.minWidth = "300px";
  gamebox.style.minHeight = "300px";
}
window.addEventListener("keydown", function (e) {
  if (e.key == " " || e.code == "Space") {
    playGame();
  }
});
playButton.addEventListener("click", playGame);
playAgain.addEventListener("click", playGame);

function playGame() {
  result.style.display = "none";
  container.style.border = "none";
  container.style.backgroundColor = "#fff2d3";
  rules.style.display = "none";
  makebox(gameMaxHeight, gameMaxWidth);

  xMiddle = Math.round(gamebox.getBoundingClientRect().width / 2);
  yMiddle = Math.round(gamebox.getBoundingClientRect().height / 2);

  function middleClick(event) {
    let clickX = event.offsetX;
    let clickY = event.offsetY;

    xCloseToMiddle = Math.abs(clickX - xMiddle);
    yCloseToMiddle = Math.abs(clickY - yMiddle);
    totalMiss = yCloseToMiddle + xCloseToMiddle;
    // totalMiss = 0;

    let crossY = clickY - 10;
    let crossX = clickX - 10;

    crosshairs.style.display = "unset";
    crosshairs.style.top = crossY + "px";
    crosshairs.style.left = crossX + "px";

    playButton.style.display = "none";
    result.style.display = "unset";
    if (totalMiss === 0) {
      result.innerHTML = "YOU WIN!!! 🎯";
      confetti();
    } else {
      result.innerHTML = `You were ${xCloseToMiddle} pixels away from the middle on the x axis.<br>${yCloseToMiddle} pixels away from the middle on the y axis.<br>Your total score is ${totalMiss}.`;
    }

    playAgain.style.display = "unset";
    gamebox.removeEventListener("click", middleClick);
  }
  gamebox.addEventListener("click", middleClick);
}

// make it more responsive
// high score counter?
// timer?
// some equation that compares time/click score?
