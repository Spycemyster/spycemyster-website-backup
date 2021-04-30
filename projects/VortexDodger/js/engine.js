//#region Engine Stuff
let info, game_canvas, DEV_MODE;
const GAME_WIDTH = 1600;
const GAME_HEIGHT = 900;
const BORDER = 16;
function preload() {
  soundFormats('mp3');
  deathSound = loadSound('resources/bababooey');
  deathSound.setVolume(0.1);
}

let testTexture;

function setup() {
  DEV_MODE = false;
  testTexture = loadImage("resources/Test.png");
  game_canvas = createCanvas(GAME_WIDTH, GAME_HEIGHT);
  drawingContext.imageSmoothingEnabled = false;
  initializeGame();
  document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
  }, false);
}

//#endregion

let gameOverTimer = 0;


//#region Game
let subtext = "";
function draw() {
  background(1);

  // draw an FPS counter to the top-left
  info += `FPS: ${frameRate().toFixed(1)}\n`;
  drawGame();

  // determines whether game is over or not and decides whether to update the game accordingly
  if (!isGameOver()) {
    if (focused) {
      updateGame();
    }
  }

  // Draws the game over screen when the player runs out of health.
  // also draws a small little message when they lose depending on how well they did.
  else { 
    fill(255);
    textAlign(CENTER);
    textSize(36 + Math.sin(gameOverTimer / 400) * 2);

    // determines which subtext to display. Score ranges will be tweaked once I get a feel for what the
    // difficulty will be.
    if (subtext == "") {
      deathSound.play();
      if (player.score < 0) {
        subtext = REALLY_BAD_SUBTEXT[int(Math.random() * REALLY_BAD_SUBTEXT.length)];
      }
      else if (player.score < 100) {
        subtext = BAD_SUBTEXT[int(Math.random() * BAD_SUBTEXT.length)];
      }
      else if (player.score < 200) {
        subtext = OKAY_SUBTEXT[int(Math.random() * OKAY_SUBTEXT.length)];
      }
      else if (player.score < 250) {
        subtext = GOOD_SUBTEXT[int(Math.random() * GOOD_SUBTEXT.length)];
      }
      else if (player.score < 300) {
        subtext = AMAZING_SUBTEXT[int(Math.random() * AMAZING_SUBTEXT.length)];
      }
      else
        subtext = GOD_SUBTEXT[int(Math.random() * GOD_SUBTEXT.length)];
    }
    text(`Game Over!\nScore: ${player.score.toFixed(1)}\n${subtext}\nPress Enter to Restart`, GAME_WIDTH / 2, GAME_HEIGHT / 2);
    gameOverTimer += deltaTime;
  }

  info += `Score: ${player.score.toFixed(1)}\n`;
  info += `Stage: ${GAME.stageNumber}`;

  //#region Drawing Developer Information
  if (DEV_MODE) {
    fill(255);
    textSize(14);
    textAlign(LEFT, TOP);
    text(info, 20, 20);
  }
  fill(255);
  textSize(16);
  textAlign(RIGHT, TOP);
  text(`Score: ${player.score.toFixed(1)}`, GAME_WIDTH - 20, 20);

  // controls
  info = "WASD - Movement\nLeft Shift - Slow\nSpace - Fire\nF - Activate Nuke\nR - Restart\n";
  //#endregion

  // checks if the player wants to restart the game
  if (keyIsDown(13) || keyIsDown(82))
    resetGame();
}

function keyTyped() {
  if (key === '`') {
    DEV_MODE = !DEV_MODE;
  }
}

function drawBorder(borderSize) {
  noStroke();
  fill(25);
  rect(0, 0, GAME_WIDTH, borderSize);
  rect(0, 0, borderSize, GAME_HEIGHT);
  rect(GAME_WIDTH - borderSize, 0, borderSize, GAME_HEIGHT);
  rect(0, GAME_HEIGHT - borderSize, GAME_WIDTH, borderSize);
}

const CURSOR_SIZE = 2;
const CURSOR_RADIUS = PLAYER_BULLET_WIDTH * 3 / 2;
function drawCursor() {
  fill(0, 255, 0)
  let x = mouseX + PLAYER_BULLET_WIDTH;
  let y = mouseY + PLAYER_BULLET_WIDTH;
  //rect(x, y, CURSOR_SIZE, CURSOR_SIZE);
  circle(x, y, CURSOR_SIZE);
  noFill();
  stroke(0, 255, 0)
  circle(x, y, CURSOR_RADIUS);
  noStroke();
}

// checks if the coordinate is within the window
function isInsideWindow(x, y) {
  return x < GAME_WIDTH && x > 0 && y < GAME_HEIGHT && y > 0;
}

const GAME = new Game();
let player, deathSound;

let bullets = [];
let vortexs = [];
let shotguns = [];
let droppers = [];
let playerBullets = [];
let healthPacks = [];
let gameTimer = 0;
let scoreTimer = 0; // every second, the score is incremented by 1.
// SCORE PLANNING
// Every second, the player's score is incremented by 1. Every time the player gets hit by an projectile,
// they will lose points. Everytime they kill a projectile, they will gain points.

function initializeGame() {
  scoreTimer = 0;
  gameTimer = 0;
  GAME.initialize();
  player = new Player(GAME_WIDTH / 2, GAME_HEIGHT / 2, 12, 12, 0.4, 10, color(200));
}

// resets the game
function resetGame() {
  // clears all the arrays
  bullets.splice(0, bullets.length);
  vortexs.splice(0, vortexs.length);
  shotguns.splice(0, shotguns.length);
  droppers.splice(0, droppers.length);
  playerBullets.splice(0, playerBullets.length);
  healthPacks.splice(0, healthPacks.length);
  initializeGame();
  subtext = "";
}

function updateGame() {
  scoreTimer += deltaTime;
  gameTimer += deltaTime;
  if (scoreTimer > 1000){
    scoreTimer = 0;
    player.score += 1.0;
  }

  // TESTING PURPOSES
  player.update(deltaTime);
  GAME.update(deltaTime);

  //END
  updateVortex();
  updateDropper();
  updateShotgun();

  updateEnemyBullets();
  updateFriendlyBullets();
  updateHealthPacks();
  boundPlayerPosition();
}

function updateDropper() {
  for (let i = 0; i < droppers.length; i++) {
    droppers[i].update(deltaTime);

    if (droppers[i].TTL <= 0) {
      droppers.splice(i--, 1);
      continue;
    }
  }
}

function updateVortex(dt) {
  for (let i = 0; i < vortexs.length; i++) {
    vortexs[i].update(deltaTime);

    if (vortexs[i].TTL <= 0) {
      vortexs.splice(i--, 1);
      continue;
    }
  }
}

function updateShotgun(dt) {
  for (let i = 0; i < shotguns.length; i++) {
    shotguns[i].update(deltaTime);

    if (shotguns[i].shots <= 0) {
      shotguns.splice(i--, 1);
      continue;
    }
  }
}

// restricts the player's position to be within the screen
function boundPlayerPosition() {
  player.x = Math.max(Math.min(GAME_WIDTH - player.width, player.x), 0);
  player.y = Math.max(Math.min(GAME_HEIGHT - player.height, player.y), 0);
}

function updateHealthPacks() {
  for (let i = 0; i < healthPacks.length; i++) {
    healthPacks[i].update(deltaTime);

    if (healthPacks[i].isCollidingWith(player, -1)) {
      player.health += healthPacks[i].health;
      player.score += 1;
      healthPacks.splice(i--, 1);
      continue;
    }
  }
}

function updateEnemyBullets() {
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].update(deltaTime);

    // checks for player collision
    if (bullets[i].isCollidingWith(player, 5)) {
      //FLAG_DEV
      player.health--;
      player.score -= 2;
      bullets.splice(i--, 1);
      continue;
    }

    if (bullets[i].timer > 30000 || !isInsideWindow(bullets[i].x, bullets[i].y)) {
      bullets.splice(i--, 1);
      continue;
    }
  }
}

function updateFriendlyBullets() {
  for (let i = 0; i < playerBullets.length; i++) {
    playerBullets[i].update(deltaTime);
    if (!isInsideWindow(playerBullets[i].x, playerBullets[i].y)) {
      playerBullets.splice(i--, 1);
      continue;
    }

    // check collision between player bullets and enemy bullets
    for (let j = 0; j < bullets.length; j++) {
      if (playerBullets[i].isCollidingWith(bullets[j], -2)) {
        playerBullets.splice(i--, 1);
        bullets.splice(j--, 1);
        player.score += 0.05;
        break;
      }
    }
  }
}

function isGameOver() {
  return player.health <= 0;
}

function drawGame() {
  bullets.forEach((b) => b.draw());
  playerBullets.forEach((b) => b.draw());
  healthPacks.forEach((b) => b.draw());
  player.draw();

  drawBorder(BORDER);
  drawCursor();

  if (player.isNukeAvailable()) {
    image(testTexture, GAME_WIDTH - 85, 50, 35, 35);
  }
}
//#endregion