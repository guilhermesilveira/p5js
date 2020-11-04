const TOTAL_MOLECULES = 60;
const WIDTH = 400;
const MAX_STARTING_VEL = 2;
const molecules = [];

// Parte do código será baseado na implementação de colisão de círculos daqui:
// https://editor.p5js.org/hanxyn888@gmail.com/sketches/H4R1jmHf-

function setup() {
  createCanvas(WIDTH, WIDTH);
  for (var i = 0; i < TOTAL_MOLECULES; i++) {
    newMolecule();
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function randomForce() {
  return createVector(Math.random() * MAX_STARTING_VEL - MAX_STARTING_VEL / 2,
    Math.random() * MAX_STARTING_VEL - MAX_STARTING_VEL / 2);
}


function newMolecule() {
  const type = getRandomInt(2);
  var x = getRandomInt(WIDTH / 8);
  if (type == 1) x += 7 * WIDTH / 8;
  const y = getRandomInt(WIDTH);
  return newMoleculeOfType(x, y, type);
}

function newMoleculeOfType(x, y, type) {
  const molecule = new Molecule(x, y, type, randomForce());
  molecules.push(molecule);
}

function moveMolecule(molecule) {
  molecule.update();
  for (var other of molecules) {
    if (other != molecule) {
      molecule.collideCircle(other);
    }
  }
}

function mousePressed() {
  newMoleculeOfType(mouseX, mouseY, 0);
}

function keyPressed() {
  newMoleculeOfType(mouseX, mouseY, 1);
}

function drawMolecule(molecule) {
  molecule.show();
}

function drawCenter(base) {
  textSize(40);
  fill(color(255, 0, 0));
  textAlign(CENTER, CENTER);
  // desafio: colocar x e y arredodado no print
  text('X', base.x, base.y);
}

function draw() {
  molecules.forEach(moveMolecule);
  // desafio: function Molecules
  let massXSum = 0,
    massYSum = 0;
  let totalMass = 0;
  for (var molecule of molecules) {
    massXSum += molecule.pos.x * molecule.mass;
    massYSum += molecule.pos.y * molecule.mass;
    totalMass += molecule.mass;
  }
  let massX = massXSum / totalMass;
  let massY = massYSum / totalMass;

  background(color(255, 255, 255));
  drawCenter(createVector(massX, massY));
  molecules.forEach(drawMolecule);
}