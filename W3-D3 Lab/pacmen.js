const pacMen = []; // This array holds all the pacmen

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  let velocity = setToRandom(10);
  let position = setToRandom(200);

  // Add image to div id="game"
  let game = document.getElementById('game');
  let newimg = document.createElement('img');

  newimg.style.position = 'absolute';
  newimg.src = './images/PacMan1.png';
  newimg.width = 100;

  // ✅ SET POSITION
  newimg.style.left = position.x + 'px';
  newimg.style.top = position.y + 'px';

  // ✅ ADD IMAGE TO GAME
  game.appendChild(newimg);

  return {
    position,
    velocity,
    newimg,
  };
}

function update() {
  pacMen.forEach((item) => {
    checkCollisions(item);

    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x + 'px';
    item.newimg.style.top = item.position.y + 'px';
  });

  setTimeout(update, 20);
}

function checkCollisions(item) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const size = item.newimg.width;

  // LEFT / RIGHT
  if (item.position.x <= 0 || item.position.x + size >= width) {
    item.velocity.x = -item.velocity.x;
  }

  // TOP / BOTTOM
  if (item.position.y <= 0 || item.position.y + size >= height) {
    item.velocity.y = -item.velocity.y;
  }
}

function makeOne() {
  pacMen.push(makePac());
}

// ✅ MAKE FUNCTIONS AVAILABLE TO HTML
window.makeOne = makeOne;
window.update = update;

// DO NOT CHANGE
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen };
}
