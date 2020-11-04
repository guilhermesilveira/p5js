const TOTAL_MOLECULES = 60;
const WIDTH = 400;
const SPEED = 5;
const colors = [];

function setup() {
  createCanvas(WIDTH, WIDTH);
  colors.push(color(0,0,255));
  colors.push(color(0,255,0));
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function newMolecule() {
  const type = getRandomInt(2);
  if(type==0) return [getRandomInt(WIDTH / 4), getRandomInt(WIDTH), type];
  return [3 * WIDTH / 4 + getRandomInt(WIDTH /  4), getRandomInt(WIDTH), type];
}

const MOLECULES = Array.from({length: TOTAL_MOLECULES}, newMolecule);

// desafio 1: max_speed, na verdade o speed eh entre [-max_speed e +max_speed]
function randomMove(position) {
  const random = SPEED * (getRandomInt(3) - 1);
  position += random;
  return min(WIDTH, max(0, position));
}

function moveMolecule(molecule) {
  molecule[0] = randomMove(molecule[0]);
  molecule[1] = randomMove(molecule[1]);
}

function drawMolecule(molecule) {
  fill(colors[molecule[2]]);
  noStroke();
  circle(molecule[0], molecule[1], 10);
}

function draw() {
  MOLECULES.forEach(moveMolecule);

  background(color(255,255,255));
  MOLECULES.forEach(drawMolecule);
}