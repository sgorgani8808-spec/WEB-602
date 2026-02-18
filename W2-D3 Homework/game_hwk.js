// on page load -> generate game board
window.onload = () => {
  console.log("Page Loaded");
  setRandomTileOrder(12);
  setTiles();
};

// global variables
let i = 0;
let clicks;
let timeScore;
let count;
let timer;

// start button initiates game
const startButton = document.getElementById("startGame");
startButton.addEventListener("click", () => startGame());

const startGame = () => {
  tiles.forEach(tile => tile.addEventListener("click", displayTile));
  resetTiles();
  startButton.disabled = true;
  console.log(randomOrderArray);
  startTimer();
};

// end button stops the game
document.getElementById("endGame").addEventListener("click", () => endGame());

const endGame = () => {
  const endTimer = () => {
    timeScore = document.getElementById("timer").innerText;
    clearInterval(timer);
  };

  randomOrderArray = [];
  startButton.innerText = "New Game";
  startButton.disabled = false;
  endTimer();
  calculateScore();
};

// random tile order
let randomOrderArray = [];

const setRandomTileOrder = numberOfTiles => {
  while (randomOrderArray.length < numberOfTiles) {
    let randomNum = Math.round(Math.random() * (numberOfTiles - 1)) + 1;
    if (!randomOrderArray.includes(randomNum)) {
      randomOrderArray.push(randomNum);
    }
  }
};

// tiles
const tiles = document.querySelectorAll(".gametile");

const setTiles = () => {
  for (const tile of tiles) {
    tile.innerHTML = randomOrderArray[i];
    i++;

    if (tile.innerText < 3) {
      tile.innerHTML = rocket;
      tile.setAttribute("icon", "rocket");
    } else if (tile.innerHTML < 5) {
      tile.innerHTML = bacteria;
      tile.setAttribute("icon", "bacteria");
    } else if (tile.innerHTML < 7) {
      tile.innerHTML = cocktail;
      tile.setAttribute("icon", "cocktail");
    } else if (tile.innerHTML < 9) {
      tile.innerHTML = football;
      tile.setAttribute("icon", "football");
    } else if (tile.innerHTML < 11) {
      tile.innerHTML = pizza;
      tile.setAttribute("icon", "pizza");
    } else if (tile.innerHTML < 13) {
      tile.innerHTML = kiwi;
      tile.setAttribute("icon", "kiwi");
    }
  }
};

// timer
const startTimer = () => {
  clearInterval(timer);
  count = 0;

  timer = setInterval(() => {
    document.getElementById("timer").firstChild.innerText = count++;

    if (count === 60) {
      clearInterval(timer);
      document.getElementById("timer").firstChild.innerText = "Game Over";
    }
  }, 1000);
};

// icons
const football = `<i class="fas fa-football-ball"></i>`;
const pizza = `<i class="fas fa-pizza-slice"></i>`;
const rocket = `<i class="fas fa-rocket"></i>`;
const bacteria = `<i class="fas fa-bacterium"></i>`;
const kiwi = `<i class="fas fa-kiwi-bird"></i>`;
const cocktail = `<i class="fas fa-cocktail"></i>`;

// tile matching
let tileIcon;
let tileIcons = [];
let tileIds = [];
let n = 0;

const displayTile = e => {
  e.target.classList.remove("hideTile");
  e.target.classList.add("displayTile");

  tileIcon = e.target.getAttribute("icon");
  tileIcons.push(tileIcon);
  tileIds.push(e.target.getAttribute("id"));

  countMoves();

  if (tileIcons.length % 2 === 0) {
    checkMatch(tileIcons, tileIds, n);
    n += 2;
  }
};

const checkMatch = (tileIcons, tileIds, n) => {
  if (tileIcons[n] !== tileIcons[n + 1]) {
    setTimeout(() => {
      document.getElementById(tileIds[n]).classList.remove("displayTile");
      document.getElementById(tileIds[n + 1]).classList.remove("displayTile");
    }, 1000);
  } else {
    document.getElementById(tileIds[n]).style.backgroundColor = "green";
    document.getElementById(tileIds[n + 1]).style.backgroundColor = "green";
    document.getElementById(tileIds[n]).removeEventListener("click", displayTile);
    document.getElementById(tileIds[n + 1]).removeEventListener("click", displayTile);
  }
};

// count clicks
const countMoves = () => {
  clicks = n;
  document.getElementById("clicks").firstChild.innerHTML = clicks;
};

// score
const calculateScore = () => {
  const calculatedScore = parseInt(timeScore) + clicks;
  document.querySelector("#score").firstChild.innerHTML = calculatedScore;
};

// reset tiles
const resetTiles = () => {
  for (const tile of tiles) {
    tile.style.backgroundColor = "#44445a";
    tile.classList.remove("hideTile");
    tile.classList.remove("displayTile");
  }
};
