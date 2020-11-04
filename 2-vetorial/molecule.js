function massFor(type) {
  if(type==0) return 10;
  return 10;
}

function Molecule(x, y, type, f) {
  this.pos = createVector(x, y);
  this.vel = createVector(f.x, f.y);
  //this.acc = createVector(f.x, f.y); // desafio: da pra copiar?
  this.type = type;
  this.rad = massFor(type);
  this.mass = massFor(type);
  this.show = function() {
    // desafio: push e pop
    fill(this.color());
    noStroke();
    circle(this.pos.x, this.pos.y, this.rad);
  };
  
  this.color =function() {
    // desafio: cache
    if(type==0) return color(0,0,255);
    return color(0,255,0);
  };

  this.update = function() {
    this.edges();
    // desafio: pq limite de velocidade?
    this.vel.limit(12.5);
    this.pos.add(this.vel);
  };

  this.edges = function() {
    if (this.pos.y < this.rad) {
      this.pos.y = this.rad;
      this.vel.y *= -1;
    }
    if (this.pos.y > height - this.rad) {
      this.pos.y = height - this.rad;
      this.vel.y *= -1;
    }
    if (this.pos.x < this.rad) {
      this.pos.x = this.rad;
      this.vel.x *= -1;
    }
    if (this.pos.x > width - this.rad) {
      this.pos.x = width - this.rad;
      this.vel.x *= -1;
    }
  };

  this.collideCircle = function(other) {
    var distance = sqrt(((this.pos.x - other.pos.x) * (this.pos.x - other.pos.x)) + ((this.pos.y - other.pos.y) * (this.pos.y - other.pos.y)));
    if (distance < this.rad + other.rad) {
      resolveCollision(this, other);
    }
  };
}


// Modified code to suit this project

function rotateVel(velocity, angle) {
  var rotatedVelocities = {
    x: velocity.x * cos(angle) - velocity.y * sin(angle),
    y: velocity.x * sin(angle) + velocity.y * cos(angle)
  };

  rotatedVelocities = createVector(rotatedVelocities.x, rotatedVelocities.y);

  return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */

function resolveCollision(particle, otherParticle) {
  const xVelocityDiff = particle.vel.x - otherParticle.vel.x;
  const yVelocityDiff = particle.vel.y - otherParticle.vel.y;

  const xDist = otherParticle.pos.x - particle.pos.x;
  const yDist = otherParticle.pos.y - particle.pos.y;

  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

    // Grab angle between the two colliding particles
    const angle = -atan2(otherParticle.pos.y - particle.pos.y, otherParticle.pos.x - particle.pos.x);

    // Store mass in var for better readability in collision equation
    const m1 = particle.mass;
    const m2 = otherParticle.mass;

    // Velocity before equation
    const u1 = rotateVel(particle.vel, angle);
    const u2 = rotateVel(otherParticle.vel, angle);

    // DESAFIO: TEM UM BUG NA UTILIZACAO DA MASSA? PQ ESTA ACELERANDO MASSAS DISTINTAS
    // Velocity after 1d collision equation
    var v1 = {
      x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2),
      y: u1.y
    };
    v1 = createVector(v1.x, v1.y);
    var v2 = {
      x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2),
      y: u2.y
    };
    v2 = createVector(v2.x, v2.y);

    // Final velocity after rotating axis back to original location
    const vFinal1 = rotateVel(v1, -angle);
    const vFinal2 = rotateVel(v2, -angle);

    // Swap particle velocities for realistic bounce effect
    particle.vel.x = vFinal1.x;
    particle.vel.y = vFinal1.y;

    otherParticle.vel.x = vFinal2.x;
    otherParticle.vel.y = vFinal2.y;
  }
}