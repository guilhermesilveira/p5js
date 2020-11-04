const TOTAL_MOLECULES = 60;
const WIDTH = 400;
const MAX_STARTING_VEL = 2;
const molecules = [];

// Parte do código será baseado na implementação de colisão de círculos daqui:
// https://editor.p5js.org/hanxyn888@gmail.com/sketches/H4R1jmHf-

function setup() {
  createCanvas(WIDTH, WIDTH);
  for(var i=0; i < TOTAL_MOLECULES; i++) {
    molecules.push(newMolecule());
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
  var x = getRandomInt(WIDTH /  4);
  if(type==1) x += 3 * WIDTH / 4;
  const y = getRandomInt(WIDTH);
  
  const molecule = new Molecule(x, y, type, randomForce());
  return molecule;
}

function moveMolecule(molecule) {
  molecule.update();
  for (var other of molecules) {
    if (other != molecule) {
      molecule.collideCircle(other);
    }
  }
}

function drawMolecule(molecule) {
  molecule.show();
}

function draw() {
  molecules.forEach(moveMolecule);

  background(color(255,255,255));
  molecules.forEach(drawMolecule);
}