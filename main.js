let posList = document.querySelectorAll(".position");
let dearList = document.querySelectorAll(".small");
let tigerList = document.querySelectorAll(".big");
let start = document.querySelector(".start");
document.querySelector(".player1").style.backgroundColor = "rgb(41, 41, 201)";

let posClick = false;
let dearClick = false;
let tigerClick = false;
let turn = -1; //No one played his/her turn
let dearNo = -1;
let tigerNo = -1;
let begin = 0;
let dearCount = 20;

let flag1 = 0;
let flag2 = 0;
globalThis.tigerElement = null;
globalThis.dearElement = null;
globalThis.posNo = -1;
let movePosition = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 2, 0],
  [0, 3, 0],
  [0, 4, 0],
  [1, 0, 0],
  [1, 1, 5],
  [1, 2, 0],
  [1, 3, 5],
  [1, 4, 0],
  [2, 0, 1],
  [2, 1, 0],
  [2, 2, 0],
  [2, 3, 0],
  [2, 4, 1],
  [3, 0, 0],
  [3, 1, 5],
  [3, 2, 0],
  [3, 3, 5],
  [3, 4, 0],
  [4, 0, 0],
  [4, 1, 0],
  [4, 2, 0],
  [4, 3, 0],
  [4, 4, 0],
];
let dearPosList = [
  6, 6, 6, 6, 6, 8, 8, 8, 8, 8, 16, 16, 16, 16, 16, 18, 18, 18, 18, 18,
]; // This array keeps track of all the dears
let tigerPosList = [10, 14];
// top value of 2nd row
const rowTop = parseInt(getComputedStyle(document.querySelector(".dear1")).top);

// left value of 2nd column
const rowLeft = parseInt(
  getComputedStyle(document.querySelector(".dear1")).left
);

const dearTopPosList = [
  -10,
  -10,
  -10,
  -10,
  -10,
  rowTop,
  rowTop,
  rowTop,
  rowTop,
  rowTop,
  rowTop + (rowTop + 10),
  rowTop + (rowTop + 10),
  rowTop + (rowTop + 10),
  rowTop + (rowTop + 10),
  rowTop + (rowTop + 10),
  rowTop + 2 * (rowTop + 10),
  rowTop + 2 * (rowTop + 10),
  rowTop + 2 * (rowTop + 10),
  rowTop + 2 * (rowTop + 10),
  rowTop + 2 * (rowTop + 10),
  rowTop + 3 * (rowTop + 10),
  rowTop + 3 * (rowTop + 10),
  rowTop + 3 * (rowTop + 10),
  rowTop + 3 * (rowTop + 10),
  rowTop + 3 * (rowTop + 10),
]; // This array keeps track of the top distance in pixel of dears
const dearLeftPosList = [
  -10,
  rowLeft,
  rowLeft + (rowLeft + 10),
  rowLeft + 2 * (rowLeft + 10),
  rowLeft + 3 * (rowLeft + 10),
  -10,
  rowLeft,
  rowLeft + (rowLeft + 10),
  rowLeft + 2 * (rowLeft + 10),
  rowLeft + 3 * (rowLeft + 10),
  -10,
  rowLeft,
  rowLeft + (rowLeft + 10),
  rowLeft + 2 * (rowLeft + 10),
  rowLeft + 3 * (rowLeft + 10),
  -10,
  rowLeft,
  rowLeft + (rowLeft + 10),
  rowLeft + 2 * (rowLeft + 10),
  rowLeft + 3 * (rowLeft + 10),
  -10,
  rowLeft,
  rowLeft + (rowLeft + 10),
  rowLeft + 2 * (rowLeft + 10),
  rowLeft + 3 * (rowLeft + 10),
]; // This array keeps track of the left distance in pixel of dears


const tigerLeft1 = parseInt(
  getComputedStyle(document.querySelector(".big1")).left
);
const tigerLeft2 = parseInt(
  getComputedStyle(document.querySelector(".big2")).left
);
const tigerLeft3 = parseInt(
  getComputedStyle(document.querySelector(".big3")).left
);
const tigerLeft4 = parseInt(
  getComputedStyle(document.querySelector(".big4")).left
);
const tigerLeft5 = parseInt(
  getComputedStyle(document.querySelector(".big5")).left
);

const tigerTopPosList = [
  tigerLeft1,
  tigerLeft1,
  tigerLeft1,
  tigerLeft1,
  tigerLeft1,
  tigerLeft2,
  tigerLeft2,
  tigerLeft2,
  tigerLeft2,
  tigerLeft2,
  tigerLeft3,
  tigerLeft3,
  tigerLeft3,
  tigerLeft3,
  tigerLeft3,
  tigerLeft4,
  tigerLeft4,
  tigerLeft4,
  tigerLeft4,
  tigerLeft4,
  tigerLeft5,
  tigerLeft5,
  tigerLeft5,
  tigerLeft5,
  tigerLeft5,
]; // This array keeps track of the top distance in pixel of tigers
const tigerLeftPosList = [
  tigerLeft1,
  tigerLeft2,
  tigerLeft3,
  tigerLeft4,
  tigerLeft5,
  tigerLeft1,
  tigerLeft2,
  tigerLeft3,
  tigerLeft4,
  tigerLeft5,
  tigerLeft1,
  tigerLeft2,
  tigerLeft3,
  tigerLeft4,
  tigerLeft5,
  tigerLeft1,
  tigerLeft2,
  tigerLeft3,
  tigerLeft4,
  tigerLeft5,
  tigerLeft1,
  tigerLeft2,
  tigerLeft3,
  tigerLeft4,
  tigerLeft5,
]; // This array keeps track of the left distance in pixel of tigers

start.addEventListener("click", () => {
  begin = 1;
  turn = 0;
  return;
});
dearList.forEach((dear) => {
  dear.addEventListener("click", dearMoveHandling);
});

posList.forEach((pos) => {
  pos.addEventListener("click", posHandling);
});

// Handling the movement of dears
function dearMoveHandling(event) {
  dearClick = true;
  tigerClick = false;
  dearNo = event.target.closest(".small").getAttribute("dear-no");
  dearElement = event.target;
}

// Handling the positions of the board
function posHandling(event) {
  if (begin === 1) {
    // Game starts only when start button is clicked
    posClick = true;
    let posNo = event.target.closest(".position").getAttribute("index");

    if (dearClick && dearElement != null && turn === 0) {
      if (
        (movePosition[posNo][2] === 0 &&
          ((movePosition[dearPosList[dearNo]][0] === 1 &&
            movePosition[dearPosList[dearNo]][1] === 1) ||
            (movePosition[dearPosList[dearNo]][0] === 1 &&
              movePosition[dearPosList[dearNo]][1] === 3) ||
            (movePosition[dearPosList[dearNo]][0] === 2 &&
              movePosition[dearPosList[dearNo]][1] === 2) ||
            (movePosition[dearPosList[dearNo]][0] === 3 &&
              movePosition[dearPosList[dearNo]][1] === 1) ||
            (movePosition[dearPosList[dearNo]][0] === 3 &&
              movePosition[dearPosList[dearNo]][1] === 3) ||
            (movePosition[dearPosList[dearNo]][0] === 0 &&
              movePosition[dearPosList[dearNo]][1] === 2) ||
            (movePosition[dearPosList[dearNo]][0] === 2 &&
              movePosition[dearPosList[dearNo]][1] === 4) ||
            (movePosition[dearPosList[dearNo]][0] === 4 &&
              movePosition[dearPosList[dearNo]][1] === 2) ||
            (movePosition[dearPosList[dearNo]][0] === 2 &&
              movePosition[dearPosList[dearNo]][1] === 0) ||
            (movePosition[dearPosList[dearNo]][0] === 0 &&
              movePosition[dearPosList[dearNo]][1] === 0) ||
            (movePosition[dearPosList[dearNo]][0] === 0 &&
              movePosition[dearPosList[dearNo]][1] === 4) ||
            (movePosition[dearPosList[dearNo]][0] === 4 &&
              movePosition[dearPosList[dearNo]][1] === 0) ||
            (movePosition[dearPosList[dearNo]][0] === 4 &&
              movePosition[dearPosList[dearNo]][1] === 4)) &&
          ((movePosition[dearPosList[dearNo]][0] - 1 ===
            movePosition[posNo][0] &&
            movePosition[dearPosList[dearNo]][1] === movePosition[posNo][1]) ||
            (movePosition[dearPosList[dearNo]][1] - 1 ===
              movePosition[posNo][1] &&
              movePosition[dearPosList[dearNo]][0] ===
                movePosition[posNo][0]) ||
            (movePosition[dearPosList[dearNo]][0] + 1 ===
              movePosition[posNo][0] &&
              movePosition[dearPosList[dearNo]][1] ===
                movePosition[posNo][1]) ||
            (movePosition[dearPosList[dearNo]][1] + 1 ===
              movePosition[posNo][1] &&
              movePosition[dearPosList[dearNo]][0] ===
                movePosition[posNo][0]) ||
            (movePosition[dearPosList[dearNo]][1] + 1 ===
              movePosition[posNo][1] &&
              movePosition[dearPosList[dearNo]][0] + 1 ===
                movePosition[posNo][0]) ||
            (movePosition[dearPosList[dearNo]][1] - 1 ===
              movePosition[posNo][1] &&
              movePosition[dearPosList[dearNo]][0] - 1 ===
                movePosition[posNo][0]) ||
            (movePosition[dearPosList[dearNo]][1] - 1 ===
              movePosition[posNo][1] &&
              movePosition[dearPosList[dearNo]][0] + 1 ===
                movePosition[posNo][0]) ||
            (movePosition[dearPosList[dearNo]][1] + 1 ===
              movePosition[posNo][1] &&
              movePosition[dearPosList[dearNo]][0] - 1 ===
                movePosition[posNo][0]))) ||
        (movePosition[posNo][2] === 0 &&
          movePosition[dearPosList[dearNo]][0] - 1 === movePosition[posNo][0] &&
          movePosition[dearPosList[dearNo]][1] === movePosition[posNo][1]) ||
        (movePosition[posNo][2] === 0 &&
          movePosition[dearPosList[dearNo]][1] - 1 === movePosition[posNo][1] &&
          movePosition[dearPosList[dearNo]][0] === movePosition[posNo][0]) ||
        (movePosition[posNo][2] === 0 &&
          movePosition[dearPosList[dearNo]][0] + 1 === movePosition[posNo][0] &&
          movePosition[dearPosList[dearNo]][1] === movePosition[posNo][1]) ||
        (movePosition[posNo][2] === 0 &&
          movePosition[dearPosList[dearNo]][1] + 1 === movePosition[posNo][1] &&
          movePosition[dearPosList[dearNo]][0] === movePosition[posNo][0])
      ) {
        movePosition[dearPosList[dearNo]][2] -= 1;

        movePosition[posNo][2] = 1;
        dearPosList[dearNo] = posNo;

        dearElement.style.top = dearTopPosList[posNo] + "px";
        dearElement.style.left = dearLeftPosList[posNo] + "px";
        dearElement.style.transition = "0.5s";
        CapturedCheck();
        dearClick = false;
        turn = 1; // switch turn
        document.querySelector(".player1").style.background = "transparent";
        document.querySelector(".player2").style.backgroundColor = "orangered";
      }
    } else if (tigerClick && tigerElement != null && turn === 1) {
      if (
        (movePosition[posNo][2] === 0 &&
          ((movePosition[tigerPosList[tigerNo]][0] === 1 &&
            movePosition[tigerPosList[tigerNo]][1] === 1) ||
            (movePosition[tigerPosList[tigerNo]][0] === 1 &&
              movePosition[tigerPosList[tigerNo]][1] === 3) ||
            (movePosition[tigerPosList[tigerNo]][0] === 2 &&
              movePosition[tigerPosList[tigerNo]][1] === 2) ||
            (movePosition[tigerPosList[tigerNo]][0] === 3 &&
              movePosition[tigerPosList[tigerNo]][1] === 1) ||
            (movePosition[tigerPosList[tigerNo]][0] === 3 &&
              movePosition[tigerPosList[tigerNo]][1] === 3) ||
            (movePosition[tigerPosList[tigerNo]][0] === 0 &&
              movePosition[tigerPosList[tigerNo]][1] === 2) ||
            (movePosition[tigerPosList[tigerNo]][0] === 2 &&
              movePosition[tigerPosList[tigerNo]][1] === 4) ||
            (movePosition[tigerPosList[tigerNo]][0] === 4 &&
              movePosition[tigerPosList[tigerNo]][1] === 2) ||
            (movePosition[tigerPosList[tigerNo]][0] === 2 &&
              movePosition[tigerPosList[tigerNo]][1] === 0) ||
            (movePosition[tigerPosList[tigerNo]][0] === 0 &&
              movePosition[tigerPosList[tigerNo]][1] === 0) ||
            (movePosition[tigerPosList[tigerNo]][0] === 0 &&
              movePosition[tigerPosList[tigerNo]][1] === 4) ||
            (movePosition[tigerPosList[tigerNo]][0] === 4 &&
              movePosition[tigerPosList[tigerNo]][1] === 0) ||
            (movePosition[tigerPosList[tigerNo]][0] === 4 &&
              movePosition[tigerPosList[tigerNo]][1] === 4)) &&
          ((movePosition[tigerPosList[tigerNo]][0] - 1 ===
            movePosition[posNo][0] &&
            movePosition[tigerPosList[tigerNo]][1] ===
              movePosition[posNo][1]) ||
            (movePosition[tigerPosList[tigerNo]][1] - 1 ===
              movePosition[posNo][1] &&
              movePosition[tigerPosList[tigerNo]][0] ===
                movePosition[posNo][0]) ||
            (movePosition[tigerPosList[tigerNo]][0] + 1 ===
              movePosition[posNo][0] &&
              movePosition[tigerPosList[tigerNo]][1] ===
                movePosition[posNo][1]) ||
            (movePosition[tigerPosList[tigerNo]][1] + 1 ===
              movePosition[posNo][1] &&
              movePosition[tigerPosList[tigerNo]][0] ===
                movePosition[posNo][0]) ||
            (movePosition[tigerPosList[tigerNo]][1] + 1 ===
              movePosition[posNo][1] &&
              movePosition[tigerPosList[tigerNo]][0] + 1 ===
                movePosition[posNo][0]) ||
            (movePosition[tigerPosList[tigerNo]][1] - 1 ===
              movePosition[posNo][1] &&
              movePosition[tigerPosList[tigerNo]][0] - 1 ===
                movePosition[posNo][0]) ||
            (movePosition[tigerPosList[tigerNo]][1] - 1 ===
              movePosition[posNo][1] &&
              movePosition[tigerPosList[tigerNo]][0] + 1 ===
                movePosition[posNo][0]) ||
            (movePosition[tigerPosList[tigerNo]][1] + 1 ===
              movePosition[posNo][1] &&
              movePosition[tigerPosList[tigerNo]][0] - 1 ===
                movePosition[posNo][0]))) ||
        (movePosition[posNo][2] === 0 &&
          movePosition[tigerPosList[tigerNo]][0] - 1 ===
            movePosition[posNo][0] &&
          movePosition[tigerPosList[tigerNo]][1] === movePosition[posNo][1]) ||
        (movePosition[posNo][2] === 0 &&
          movePosition[tigerPosList[tigerNo]][1] - 1 ===
            movePosition[posNo][1] &&
          movePosition[tigerPosList[tigerNo]][0] === movePosition[posNo][0]) ||
        (movePosition[posNo][2] === 0 &&
          movePosition[tigerPosList[tigerNo]][0] + 1 ===
            movePosition[posNo][0] &&
          movePosition[tigerPosList[tigerNo]][1] === movePosition[posNo][1]) ||
        (movePosition[posNo][2] === 0 &&
          movePosition[tigerPosList[tigerNo]][1] + 1 ===
            movePosition[posNo][1] &&
          movePosition[tigerPosList[tigerNo]][0] === movePosition[posNo][0])
      ) {
        movePosition[tigerPosList[tigerNo]][2] -= 1;
        movePosition[posNo][2] = 1;
        tigerPosList[tigerNo] = posNo;
        tigerElement.style.top = tigerTopPosList[posNo] + "px";
        tigerElement.style.left = tigerLeftPosList[posNo] + "px";
        tigerElement.style.transition = "0.5s";
        turn = 0;
        document.querySelector(".player1").style.backgroundColor =
          "rgb(41, 41, 201)";
        document.querySelector(".player2").style.background = "transparent";
        tigerClick = false;
      } else if (
        (movePosition[posNo][2] === 0 &&
          ((movePosition[tigerPosList[tigerNo]][0] === 1 &&
            movePosition[tigerPosList[tigerNo]][1] === 1) ||
            (movePosition[tigerPosList[tigerNo]][0] === 1 &&
              movePosition[tigerPosList[tigerNo]][1] === 3) ||
            (movePosition[tigerPosList[tigerNo]][0] === 2 &&
              movePosition[tigerPosList[tigerNo]][1] === 2) ||
            (movePosition[tigerPosList[tigerNo]][0] === 3 &&
              movePosition[tigerPosList[tigerNo]][1] === 1) ||
            (movePosition[tigerPosList[tigerNo]][0] === 3 &&
              movePosition[tigerPosList[tigerNo]][1] === 3) ||
            (movePosition[tigerPosList[tigerNo]][0] === 0 &&
              movePosition[tigerPosList[tigerNo]][1] === 2) ||
            (movePosition[tigerPosList[tigerNo]][0] === 2 &&
              movePosition[tigerPosList[tigerNo]][1] === 4) ||
            (movePosition[tigerPosList[tigerNo]][0] === 4 &&
              movePosition[tigerPosList[tigerNo]][1] === 2) ||
            (movePosition[tigerPosList[tigerNo]][0] === 2 &&
              movePosition[tigerPosList[tigerNo]][1] === 0) ||
            (movePosition[tigerPosList[tigerNo]][0] === 0 &&
              movePosition[tigerPosList[tigerNo]][1] === 0) ||
            (movePosition[tigerPosList[tigerNo]][0] === 0 &&
              movePosition[tigerPosList[tigerNo]][1] === 4) ||
            (movePosition[tigerPosList[tigerNo]][0] === 4 &&
              movePosition[tigerPosList[tigerNo]][1] === 0) ||
            (movePosition[tigerPosList[tigerNo]][0] === 4 &&
              movePosition[tigerPosList[tigerNo]][1] === 4)) &&
          ((movePosition[tigerPosList[tigerNo]][0] - 2 ===
            movePosition[posNo][0] &&
            movePosition[tigerPosList[tigerNo]][1] === movePosition[posNo][1] &&
            movePosition[
              (Number(tigerPosList[tigerNo]) + Number(posNo)) / 2
            ][2] >= 1) ||
            (movePosition[tigerPosList[tigerNo]][1] - 2 ===
              movePosition[posNo][1] &&
              movePosition[tigerPosList[tigerNo]][0] ===
                movePosition[posNo][0] &&
              movePosition[
                (Number(tigerPosList[tigerNo]) + Number(posNo)) / 2
              ][2] >= 1) ||
            (movePosition[tigerPosList[tigerNo]][0] + 2 ===
              movePosition[posNo][0] &&
              movePosition[tigerPosList[tigerNo]][1] ===
                movePosition[posNo][1] &&
              movePosition[
                (Number(tigerPosList[tigerNo]) + Number(posNo)) / 2
              ][2] >= 1) ||
            (movePosition[tigerPosList[tigerNo]][1] + 2 ===
              movePosition[posNo][1] &&
              movePosition[tigerPosList[tigerNo]][0] ===
                movePosition[posNo][0] &&
              movePosition[
                (Number(tigerPosList[tigerNo]) + Number(posNo)) / 2
              ][2] >= 1) ||
            (movePosition[tigerPosList[tigerNo]][1] + 2 ===
              movePosition[posNo][1] &&
              movePosition[tigerPosList[tigerNo]][0] + 2 ===
                movePosition[posNo][0] &&
              movePosition[
                (Number(tigerPosList[tigerNo]) + Number(posNo)) / 2
              ][2] >= 1) ||
            (movePosition[tigerPosList[tigerNo]][1] - 2 ===
              movePosition[posNo][1] &&
              movePosition[tigerPosList[tigerNo]][0] - 2 ===
                movePosition[posNo][0] &&
              movePosition[
                (Number(tigerPosList[tigerNo]) + Number(posNo)) / 2
              ][2] >= 1) ||
            (movePosition[tigerPosList[tigerNo]][1] - 2 ===
              movePosition[posNo][1] &&
              movePosition[tigerPosList[tigerNo]][0] + 2 ===
                movePosition[posNo][0] &&
              movePosition[
                (Number(tigerPosList[tigerNo]) + Number(posNo)) / 2
              ][2] >= 1) ||
            (movePosition[tigerPosList[tigerNo]][1] + 2 ===
              movePosition[posNo][1] &&
              movePosition[tigerPosList[tigerNo]][0] - 2 ===
                movePosition[posNo][0] &&
              movePosition[
                (Number(tigerPosList[tigerNo]) + Number(posNo)) / 2
              ][2] >= 1))) ||
        (movePosition[tigerPosList[tigerNo]][0] - 2 ===
          movePosition[posNo][0] &&
          movePosition[tigerPosList[tigerNo]][1] === movePosition[posNo][1] &&
          movePosition[
            (Number(tigerPosList[tigerNo]) + Number(posNo)) / 2
          ][2] >= 1) ||
        (movePosition[tigerPosList[tigerNo]][1] - 2 ===
          movePosition[posNo][1] &&
          movePosition[tigerPosList[tigerNo]][0] === movePosition[posNo][0] &&
          movePosition[
            (Number(tigerPosList[tigerNo]) + Number(posNo)) / 2
          ][2] >= 1) ||
        (movePosition[tigerPosList[tigerNo]][0] + 2 ===
          movePosition[posNo][0] &&
          movePosition[tigerPosList[tigerNo]][1] === movePosition[posNo][1] &&
          movePosition[
            (Number(tigerPosList[tigerNo]) + Number(posNo)) / 2
          ][2] >= 1) ||
        (movePosition[tigerPosList[tigerNo]][1] + 2 ===
          movePosition[posNo][1] &&
          movePosition[tigerPosList[tigerNo]][0] === movePosition[posNo][0] &&
          movePosition[
            (Number(tigerPosList[tigerNo]) + Number(posNo)) / 2
          ][2] >= 1)
      ) {
        movePosition[tigerPosList[tigerNo]][2] -= 1;
        movePosition[posNo][2] = 1;
        let searchDear = 0;
        for (let i = 0; i < dearPosList.length; i++) {
          let midPos = (Number(tigerPosList[tigerNo]) + Number(posNo)) / 2;
          if (Number(dearPosList[i]) === midPos) {
            searchDear = i;
            break;
          }
        }

        dearList.forEach((dear) => {
          if (Number(dear.getAttribute("dear-no")) === searchDear) {
            movePosition[dearPosList[searchDear]][2] -= 1;
            dearPosList[searchDear] = -1;
            dearCount -= 1;
            dear.style.display = "none";
            return;
          }
        });
        if (dearCount < 6) {
          document.querySelector(".announce").innerHTML = "Player 2 is Winner";
          document.querySelector(".announce").style.backgroundColor =
            "rgb(14, 252, 14)";
          begin = 0; // when one win the game, the game will stopped immediately
        }
        tigerPosList[tigerNo] = posNo;
        tigerElement.style.top = tigerTopPosList[posNo] + "px";
        tigerElement.style.left = tigerLeftPosList[posNo] + "px";
        tigerElement.style.transition = "0.5s";
        turn = 0;
        document.querySelector(".player1").style.backgroundColor =
          "rgb(41, 41, 201)";
        document.querySelector(".player2").style.background = "transparent";
        tigerClick = false;
      }
    }
  } else {
    alert("Click the start button to start");
  }
}

tigerList.forEach((tiger) => {
  tiger.addEventListener("click", tigerMoveHandling);
});

// Handling the movement of tiger
function tigerMoveHandling(event) {
  tigerClick = true;
  dearClick = false;
  tigerNo = event.target.closest(".big").getAttribute("tiger-no");
  tigerElement = event.target;
}

// The function which checks if the tiger is captured or not
function CapturedCheck() {
  const pos1 = Number(tigerPosList[0]);
  const pos2 = Number(tigerPosList[1]);

  if (
    (pos1 === 6 || pos1 === 16) &&
    movePosition[pos1 - 6][2] >= 1 &&
    movePosition[pos1 - 5][2] >= 1 &&
    movePosition[pos1 - 4][2] >= 1 &&
    movePosition[pos1 + 1][2] >= 1 &&
    movePosition[pos1 + 2][2] >= 1 &&
    movePosition[pos1 - 1][2] >= 1 &&
    movePosition[pos1 + 4][2] >= 1 &&
    movePosition[pos1 + 5][2] >= 1 &&
    movePosition[pos1 + 6][2] >= 1
  ) {
    if (
      pos1 === 6 &&
      movePosition[pos1 + 10][2] >= 1 &&
      movePosition[pos1 + 12][2] >= 1
    ) {
      flag1 = 1;
      document.querySelector(".announce").innerHTML = "Tiger1 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    } else if (
      pos1 === 16 &&
      movePosition[pos1 - 10][2] >= 1 &&
      movePosition[pos1 - 8][2] >= 1
    ) {
      flag1 = 1;
      document.querySelector(".announce").innerHTML = "Tiger1 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    }
  } else if (
    (pos1 === 8 || pos1 === 18) &&
    movePosition[pos1 - 6][2] >= 1 &&
    movePosition[pos1 - 5][2] >= 1 &&
    movePosition[pos1 - 4][2] >= 1 &&
    movePosition[pos1 + 1][2] >= 1 &&
    movePosition[pos1 - 2][2] >= 1 &&
    movePosition[pos1 - 1][2] >= 1 &&
    movePosition[pos1 + 4][2] >= 1 &&
    movePosition[pos1 + 5][2] >= 1 &&
    movePosition[pos1 + 6][2] >= 1
  ) {
    if (
      pos1 === 18 &&
      movePosition[pos1 - 10][2] >= 1 &&
      movePosition[pos1 - 12][2] >= 1
    ) {
      flag1 = 1;
      document.querySelector(".announce").innerHTML = "Tiger1 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    } else if (
      pos1 === 8 &&
      movePosition[pos1 + 10][2] >= 1 &&
      movePosition[pos1 + 8][2] >= 1
    ) {
      flag1 = 1;
      document.querySelector(".announce").innerHTML = "Tiger1 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    }
  } else if (
    (pos1 === 0 || pos1 === 4) &&
    movePosition[pos1 + 5][2] >= 1 &&
    movePosition[pos1 + 10][2] >= 1
  ) {
    if (
      pos1 === 0 &&
      movePosition[pos1 + 1][2] >= 1 &&
      movePosition[pos1 + 2][2] >= 1 &&
      movePosition[pos1 + 6][2] >= 1 &&
      movePosition[pos1 + 12][2] >= 1
    ) {
      flag1 = 1;
      document.querySelector(".announce").innerHTML = "Tiger1 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    } else if (
      pos1 === 4 &&
      movePosition[pos1 - 1][2] >= 1 &&
      movePosition[pos1 - 2][2] >= 1 &&
      movePosition[pos1 + 4][2] >= 1 &&
      movePosition[pos1 + 8][2] >= 1
    ) {
      flag1 = 1;
      document.querySelector(".announce").innerHTML = "Tiger1 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    }
  } else if (
    (pos1 === 20 || pos1 === 24) &&
    movePosition[pos1 - 5][2] >= 1 &&
    movePosition[pos1 - 10][2] >= 1
  ) {
    if (
      pos1 === 20 &&
      movePosition[pos1 + 1][2] >= 1 &&
      movePosition[pos1 + 2][2] >= 1 &&
      movePosition[pos1 - 4][2] >= 1 &&
      movePosition[pos1 - 8][2] >= 1
    ) {
      flag1 = 1;
      document.querySelector(".announce").innerHTML = "Tiger1 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    } else if (
      pos1 === 24 &&
      movePosition[pos1 - 1][2] >= 1 &&
      movePosition[pos1 - 2][2] >= 1 &&
      movePosition[pos1 - 6][2] >= 1 &&
      movePosition[pos1 - 12][2] >= 1
    ) {
      flag1 = 1;
      document.querySelector(".announce").innerHTML = "Tiger1 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    }
  } else if (
    (pos1 === 2 || pos1 === 22) &&
    movePosition[pos1 - 1][2] >= 1 &&
    movePosition[pos1 - 2][2] >= 1 &&
    movePosition[pos1 + 1][2] >= 1 &&
    movePosition[pos1 + 2][2] >= 1
  ) {
    if (
      pos1 === 2 &&
      movePosition[pos1 + 4][2] >= 1 &&
      movePosition[pos1 + 8][2] >= 1 &&
      movePosition[pos1 + 6][2] >= 1 &&
      movePosition[pos1 + 12][2] >= 1 &&
      movePosition[pos1 + 5][2] >= 1 &&
      movePosition[pos1 + 10][2] >= 1
    ) {
      flag1 = 1;
      document.querySelector(".announce").innerHTML = "Tiger1 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    } else if (
      pos1 === 22 &&
      movePosition[pos1 - 4][2] >= 1 &&
      movePosition[pos1 - 8][2] >= 1 &&
      movePosition[pos1 - 6][2] >= 1 &&
      movePosition[pos1 - 12][2] >= 1 &&
      movePosition[pos1 - 5][2] >= 1 &&
      movePosition[pos1 - 10][2] >= 1
    ) {
      flag1 = 1;
      document.querySelector(".announce").innerHTML = "Tiger1 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    }
  } else if (
    (pos1 === 10 || pos1 === 14) &&
    movePosition[pos1 - 5][2] >= 1 &&
    movePosition[pos1 - 10][2] >= 1 &&
    movePosition[pos1 + 5][2] >= 1 &&
    movePosition[pos1 + 10][2] >= 1
  ) {
    if (
      pos1 === 10 &&
      movePosition[pos1 + 1][2] >= 1 &&
      movePosition[pos1 + 2][2] >= 1 &&
      movePosition[pos1 - 4][2] >= 1 &&
      movePosition[pos1 - 8][2] >= 1 &&
      movePosition[pos1 + 6][2] >= 1 &&
      movePosition[pos1 + 12][2] >= 1
    ) {
      flag1 = 1;
      document.querySelector(".announce").innerHTML = "Tiger1 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    } else if (
      pos1 === 14 &&
      movePosition[pos1 - 1][2] >= 1 &&
      movePosition[pos1 - 2][2] >= 1 &&
      movePosition[pos1 - 6][2] >= 1 &&
      movePosition[pos1 - 12][2] >= 1 &&
      movePosition[pos1 + 4][2] >= 1 &&
      movePosition[pos1 + 8][2] >= 1
    ) {
      flag1 = 1;
      document.querySelector(".announce").innerHTML = "Tiger1 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    }
  } else if (
    (pos1 === 1 || pos1 === 3 || pos1 === 5 || pos1 === 9) &&
    movePosition[pos1 + 5][2] >= 1 &&
    movePosition[pos1 + 10][2] === 1
  ) {
    if (
      pos1 === 1 &&
      movePosition[pos1 + 2][2] >= 1 &&
      movePosition[pos1 - 1][2] >= 1 &&
      movePosition[pos1 + 1][2] >= 1
    ) {
      flag1 = 1;
      document.querySelector(".announce").innerHTML = "Tiger1 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    } else if (
      pos1 === 3 &&
      movePosition[pos1 - 2][2] >= 1 &&
      movePosition[pos1 - 1][2] >= 1 &&
      movePosition[pos1 + 1][2] >= 1
    ) {
      flag1 = 1;
      document.querySelector(".announce").innerHTML = "Tiger1 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    } else if (
      pos1 === 5 &&
      movePosition[pos1 + 2][2] >= 1 &&
      movePosition[pos1 - 5][2] >= 1 &&
      movePosition[pos1 + 1][2] >= 1
    ) {
      flag1 = 1;
      document.querySelector(".announce").innerHTML = "Tiger1 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    } else if (
      pos1 === 9 &&
      movePosition[pos1 - 2][2] >= 1 &&
      movePosition[pos1 - 5][2] >= 1 &&
      movePosition[pos1 - 1][2] >= 1
    ) {
      flag1 = 1;
      document.querySelector(".announce").innerHTML = "Tiger1 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    }
  } else if (
    (pos1 === 21 || pos1 === 23 || pos1 === 15 || pos1 === 19) &&
    movePosition[pos1 - 5][2] >= 1 &&
    movePosition[pos1 - 10][2] >= 1
  ) {
    if (
      pos1 === 21 &&
      movePosition[pos1 + 2][2] >= 1 &&
      movePosition[pos1 - 1][2] >= 1 &&
      movePosition[pos1 + 1][2] >= 1
    ) {
      flag1 = 1;
      document.querySelector(".announce").innerHTML = "Tiger1 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    } else if (
      pos1 === 23 &&
      movePosition[pos1 - 2][2] >= 1 &&
      movePosition[pos1 - 1][2] >= 1 &&
      movePosition[pos1 + 1][2] >= 1
    ) {
      flag1 = 1;
      document.querySelector(".announce").innerHTML = "Tiger1 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    }
    if (
      pos1 === 15 &&
      movePosition[pos1 + 2][2] >= 1 &&
      movePosition[pos1 + 5][2] >= 1 &&
      movePosition[pos1 + 1][2] >= 1
    ) {
      flag1 = 1;
      document.querySelector(".announce").innerHTML = "Tiger1 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    } else if (
      pos1 === 19 &&
      movePosition[pos1 - 2][2] >= 1 &&
      movePosition[pos1 - 1][2] >= 1 &&
      movePosition[pos1 + 5][2] >= 1
    ) {
      flag1 = 1;
      document.querySelector(".announce").innerHTML = "Tiger1 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    }
  } else if (
    (pos1 === 7 || pos1 === 11 || pos1 === 13 || pos1 === 17) &&
    movePosition[pos1 + 1][2] >= 1 &&
    movePosition[pos1 - 1][2] >= 1 &&
    movePosition[pos1 + 5][2] >= 1 &&
    movePosition[pos1 - 5][2] >= 1
  ) {
    if (
      pos1 === 7 &&
      movePosition[pos1 - 2][2] >= 1 &&
      movePosition[pos1 + 2][2] >= 1 &&
      movePosition[pos1 + 10][2] >= 1
    ) {
      flag1 = 1;
      document.querySelector(".announce").innerHTML = "Tiger1 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    } else if (
      pos1 === 11 &&
      movePosition[pos1 + 2][2] >= 1 &&
      movePosition[pos1 + 10][2] >= 1 &&
      movePosition[pos1 - 10][2] >= 1
    ) {
      flag1 = 1;
      document.querySelector(".announce").innerHTML = "Tiger1 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    } else if (
      pos1 === 13 &&
      movePosition[pos1 - 2][2] >= 1 &&
      movePosition[pos1 + 10][2] >= 1 &&
      movePosition[pos1 - 10][2] >= 1
    ) {
      flag1 = 1;
      document.querySelector(".announce").innerHTML = "Tiger1 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    } else if (
      pos1 === 17 &&
      movePosition[pos1 + 2][2] >= 1 &&
      movePosition[pos1 - 2][2] >= 1 &&
      movePosition[pos1 - 10][2] >= 1
    ) {
      flag1 = 1;
      document.querySelector(".announce").innerHTML = "Tiger1 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    }
  } else if (
    pos1 === 12 &&
    movePosition[13][2] >= 1 &&
    movePosition[14][2] >= 1 &&
    movePosition[10][2] >= 1 &&
    movePosition[11][2] >= 1 &&
    movePosition[2][2] >= 1 &&
    movePosition[7][2] >= 1 &&
    movePosition[17][2] >= 1 &&
    movePosition[22][2] >= 1 &&
    movePosition[6][2] >= 1 &&
    movePosition[0][2] >= 1 &&
    movePosition[8][2] >= 1 &&
    movePosition[4][2] >= 1 &&
    movePosition[16][2] >= 1 &&
    movePosition[20][2] >= 1 &&
    movePosition[18][2] >= 1 &&
    movePosition[24][2] >= 1
  ) {
    flag1 = 1;
    document.querySelector(".announce").innerHTML = "Tiger1 Captured";
    document.querySelector(".announce").style.backgroundColor = "gold";
  }
  if (
    (pos2 === 6 || pos2 === 16) &&
    movePosition[pos2 - 6][2] >= 1 &&
    movePosition[pos2 - 5][2] >= 1 &&
    movePosition[pos2 - 4][2] >= 1 &&
    movePosition[pos2 + 1][2] >= 1 &&
    movePosition[pos2 + 2][2] >= 1 &&
    movePosition[pos2 - 1][2] >= 1 &&
    movePosition[pos2 + 4][2] >= 1 &&
    movePosition[pos2 + 5][2] >= 1 &&
    movePosition[pos2 + 6][2] >= 1
  ) {
    if (
      pos2 === 6 &&
      movePosition[pos2 + 10][2] >= 1 &&
      movePosition[pos2 + 12][2] >= 1
    ) {
      flag2 = 1;
      document.querySelector(".announce").innerHTML = "Tiger2 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    } else if (
      pos2 === 16 &&
      movePosition[pos2 - 10][2] >= 1 &&
      movePosition[pos2 - 8][2] >= 1
    ) {
      flag2 = 1;
      document.querySelector(".announce").innerHTML = "Tiger2 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    }
  } else if (
    (pos2 === 8 || pos2 === 18) &&
    movePosition[pos2 - 6][2] >= 1 &&
    movePosition[pos2 - 5][2] >= 1 &&
    movePosition[pos2 - 4][2] >= 1 &&
    movePosition[pos2 + 1][2] >= 1 &&
    movePosition[pos2 - 2][2] >= 1 &&
    movePosition[pos2 - 1][2] >= 1 &&
    movePosition[pos2 + 4][2] >= 1 &&
    movePosition[pos2 + 5][2] >= 1 &&
    movePosition[pos2 + 6][2] >= 1
  ) {
    if (
      pos2 === 18 &&
      movePosition[pos2 - 10][2] >= 1 &&
      movePosition[pos2 - 12][2] >= 1
    ) {
      flag2 = 1;
      document.querySelector(".announce").innerHTML = "Tiger2 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    } else if (
      pos2 === 8 &&
      movePosition[pos2 + 10][2] >= 1 &&
      movePosition[pos2 + 8][2] >= 1
    ) {
      flag2 = 1;
      document.querySelector(".announce").innerHTML = "Tiger2 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    }
  } else if (
    (pos2 === 0 || pos2 === 4) &&
    movePosition[pos2 + 5][2] >= 1 &&
    movePosition[pos2 + 10][2] >= 1
  ) {
    if (
      pos2 === 0 &&
      movePosition[pos2 + 1][2] >= 1 &&
      movePosition[pos2 + 2][2] >= 1 &&
      movePosition[pos2 + 6][2] >= 1 &&
      movePosition[pos2 + 12][2] >= 1
    ) {
      flag2 = 1;
      document.querySelector(".announce").innerHTML = "Tiger2 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    } else if (
      pos2 === 4 &&
      movePosition[pos2 - 1][2] >= 1 &&
      movePosition[pos2 - 2][2] >= 1 &&
      movePosition[pos2 + 4][2] >= 1 &&
      movePosition[pos2 + 8][2] >= 1
    ) {
      flag2 = 1;
      document.querySelector(".announce").innerHTML = "Tiger2 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    }
  } else if (
    (pos2 === 20 || pos2 === 24) &&
    movePosition[pos2 - 5][2] >= 1 &&
    movePosition[pos2 - 10][2] >= 1
  ) {
    if (
      pos2 === 20 &&
      movePosition[pos2 + 1][2] >= 1 &&
      movePosition[pos2 + 2][2] >= 1 &&
      movePosition[pos2 - 4][2] >= 1 &&
      movePosition[pos2 - 8][2] >= 1
    ) {
      flag2 = 1;
      document.querySelector(".announce").innerHTML = "Tiger2 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    } else if (
      pos2 === 24 &&
      movePosition[pos2 - 1][2] >= 1 &&
      movePosition[pos2 - 2][2] >= 1 &&
      movePosition[pos2 - 6][2] >= 1 &&
      movePosition[pos2 - 12][2] >= 1
    ) {
      flag2 = 1;
      document.querySelector(".announce").innerHTML = "Tiger2 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    }
  } else if (
    (pos2 === 2 || pos2 === 22) &&
    movePosition[pos2 - 1][2] >= 1 &&
    movePosition[pos2 - 2][2] >= 1 &&
    movePosition[pos2 + 1][2] >= 1 &&
    movePosition[pos2 + 2][2] >= 1
  ) {
    if (
      pos2 === 2 &&
      movePosition[pos2 + 4][2] >= 1 &&
      movePosition[pos2 + 8][2] >= 1 &&
      movePosition[pos2 + 6][2] >= 1 &&
      movePosition[pos2 + 12][2] >= 1 &&
      movePosition[pos2 + 5][2] >= 1 &&
      movePosition[pos2 + 10][2] >= 1
    ) {
      flag2 = 1;
      document.querySelector(".announce").innerHTML = "Tiger2 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    } else if (
      pos2 === 22 &&
      movePosition[pos2 - 4][2] >= 1 &&
      movePosition[pos2 - 8][2] >= 1 &&
      movePosition[pos2 - 6][2] >= 1 &&
      movePosition[pos2 - 12][2] >= 1 &&
      movePosition[pos2 - 5][2] >= 1 &&
      movePosition[pos2 - 10][2] >= 1
    ) {
      flag2 = 1;
      document.querySelector(".announce").innerHTML = "Tiger2 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    }
  } else if (
    (pos2 === 10 || pos2 === 14) &&
    movePosition[pos2 - 5][2] >= 1 &&
    movePosition[pos2 - 10][2] >= 1 &&
    movePosition[pos2 + 5][2] >= 1 &&
    movePosition[pos2 + 10][2] >= 1
  ) {
    if (
      pos2 === 10 &&
      movePosition[pos2 + 1][2] >= 1 &&
      movePosition[pos2 + 2][2] >= 1 &&
      movePosition[pos2 - 4][2] >= 1 &&
      movePosition[pos2 - 8][2] >= 1 &&
      movePosition[pos2 + 6][2] >= 1 &&
      movePosition[pos2 + 12][2] >= 1
    ) {
      flag2 = 1;
      document.querySelector(".announce").innerHTML = "Tiger2 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    } else if (
      pos2 === 14 &&
      movePosition[pos2 - 1][2] >= 1 &&
      movePosition[pos2 - 2][2] >= 1 &&
      movePosition[pos2 - 6][2] >= 1 &&
      movePosition[pos2 - 12][2] >= 1 &&
      movePosition[pos2 + 4][2] >= 1 &&
      movePosition[pos2 + 8][2] >= 1
    ) {
      flag2 = 1;
      document.querySelector(".announce").innerHTML = "Tiger2 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    }
  } else if (
    (pos2 === 1 || pos2 === 3 || pos2 === 5 || pos2 === 9) &&
    movePosition[pos2 + 5][2] >= 1 &&
    movePosition[pos2 + 10][2] >= 1
  ) {
    if (
      pos2 === 1 &&
      movePosition[pos2 + 2][2] >= 1 &&
      movePosition[pos2 - 1][2] >= 1 &&
      movePosition[pos2 + 1][2] >= 1
    ) {
      flag2 = 1;
      document.querySelector(".announce").innerHTML = "Tiger2 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    } else if (
      pos2 === 3 &&
      movePosition[pos2 - 2][2] >= 1 &&
      movePosition[pos2 - 1][2] >= 1 &&
      movePosition[pos2 + 1][2] >= 1
    ) {
      flag2 = 1;
      document.querySelector(".announce").innerHTML = "Tiger2 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    } else if (
      pos2 === 5 &&
      movePosition[pos2 + 2][2] >= 1 &&
      movePosition[pos2 - 5][2] >= 1 &&
      movePosition[pos2 + 1][2] >= 1
    ) {
      flag2 = 1;
      document.querySelector(".announce").innerHTML = "Tiger2 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    } else if (
      pos2 === 9 &&
      movePosition[pos2 - 2][2] >= 1 &&
      movePosition[pos2 - 5][2] >= 1 &&
      movePosition[pos2 - 1][2] >= 1
    ) {
      flag2 = 1;
      document.querySelector(".announce").innerHTML = "Tiger2 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    }
  } else if (
    (pos2 === 21 || pos2 === 23 || pos2 === 15 || pos2 === 19) &&
    movePosition[pos2 - 5][2] >= 1 &&
    movePosition[pos2 - 10][2] >= 1
  ) {
    if (
      pos2 === 21 &&
      movePosition[pos2 + 2][2] >= 1 &&
      movePosition[pos2 - 1][2] >= 1 &&
      movePosition[pos2 + 1][2] >= 1
    ) {
      flag2 = 1;
      document.querySelector(".announce").innerHTML = "Tiger2 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    } else if (
      pos2 === 23 &&
      movePosition[pos2 - 2][2] >= 1 &&
      movePosition[pos2 - 1][2] >= 1 &&
      movePosition[pos2 + 1][2] >= 1
    ) {
      flag2 = 1;
      document.querySelector(".announce").innerHTML = "Tiger2 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    }
    if (
      pos2 === 15 &&
      movePosition[pos2 + 2][2] >= 1 &&
      movePosition[pos2 + 5][2] >= 1 &&
      movePosition[pos2 + 1][2] >= 1
    ) {
      flag2 = 1;
      document.querySelector(".announce").innerHTML = "Tiger2 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    } else if (
      pos2 === 19 &&
      movePosition[pos2 - 2][2] >= 1 &&
      movePosition[pos2 - 1][2] >= 1 &&
      movePosition[pos2 + 5][2] >= 1
    ) {
      flag2 = 1;
      document.querySelector(".announce").innerHTML = "Tiger2 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    }
  } else if (
    (pos2 === 7 || pos2 === 11 || pos2 === 13 || pos2 === 17) &&
    movePosition[pos2 + 1][2] >= 1 &&
    movePosition[pos2 - 1][2] >= 1 &&
    movePosition[pos2 + 5][2] >= 1 &&
    movePosition[pos2 - 5][2] >= 1
  ) {
    if (
      pos2 === 7 &&
      movePosition[pos2 - 2][2] >= 1 &&
      movePosition[pos2 + 2][2] >= 1 &&
      movePosition[pos2 + 10][2] >= 1
    ) {
      flag2 = 1;
      document.querySelector(".announce").innerHTML = "Tiger2 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    } else if (
      pos2 === 11 &&
      movePosition[pos2 + 2][2] >= 1 &&
      movePosition[pos2 + 10][2] >= 1 &&
      movePosition[pos2 - 10][2] >= 1
    ) {
      flag2 = 1;
      document.querySelector(".announce").innerHTML = "Tiger2 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    } else if (
      pos2 === 13 &&
      movePosition[pos2 - 2][2] >= 1 &&
      movePosition[pos2 + 10][2] >= 1 &&
      movePosition[pos2 - 10][2] >= 1
    ) {
      flag2 = 1;
      document.querySelector(".announce").innerHTML = "Tiger2 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    } else if (
      pos2 === 17 &&
      movePosition[pos2 + 2][2] >= 1 &&
      movePosition[pos2 - 2][2] >= 1 &&
      movePosition[pos2 - 10][2] >= 1
    ) {
      flag2 = 1;
      document.querySelector(".announce").innerHTML = "Tiger2 Captured";
      document.querySelector(".announce").style.backgroundColor = "gold";
    }
  } else if (
    pos2 === 12 &&
    movePosition[13][2] >= 1 &&
    movePosition[14][2] >= 1 &&
    movePosition[10][2] >= 1 &&
    movePosition[11][2] >= 1 &&
    movePosition[2][2] >= 1 &&
    movePosition[7][2] >= 1 &&
    movePosition[17][2] >= 1 &&
    movePosition[22][2] >= 1 &&
    movePosition[6][2] >= 1 &&
    movePosition[0][2] >= 1 &&
    movePosition[8][2] >= 1 &&
    movePosition[4][2] >= 1 &&
    movePosition[16][2] >= 1 &&
    movePosition[20][2] >= 1 &&
    movePosition[18][2] >= 1 &&
    movePosition[24][2] >= 1
  ) {
    flag2 = 1;
    document.querySelector(".announce").innerHTML = "Tiger2 Captured";
    document.querySelector(".announce").style.backgroundColor = "gold";
  }

  if (flag1 === 1 && flag2 === 1) {
    document.querySelector(".announce").style.backgroundColor =
      "rgb(14, 252, 14)";
    document.querySelector(".announce").innerHTML = "Player 1 is Winner";
    ("gold");
    begin = 0;
  }
}
