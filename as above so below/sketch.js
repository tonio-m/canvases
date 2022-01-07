// code from https://editor.p5js.org/chesterdols/sketches/B12rzkBQx
// P5.js Code from Daniel Shiffman instructional <https://www.youtube.com/watch?v=BjoM9oKOAKY&t=542s>

let sclX = 20;
let sclY = 20;
let xvec, yvec;
let particles = [];
let flowfield;

let cam;

function setup() {
       pixelDensity(1);
       colorMode(HSB);
  
       createCanvas(1280, 720);
  
       cam = createCapture(VIDEO);
       cam.size(width, height);
       cam.hide();

       for (let i = 0; i < 500; i++) {
              particles[i] = new Particle();
       }

}

function draw() { // Rotating Vectors

       image(cam, 0, 0, width, height);
       loadPixels();
       background(0);
       FlowField();
}

function FlowField(){
       xvec = floor(width / sclX);
       yvec = floor(height / sclY);

       flowfield = new Array(xvec * yvec);
  
       for (let y = 0; y < height; y += sclY) {
              for (let x = 0; x < width; x += sclX) {
                
                    let vX = x / sclX;
                    let vY = y / sclY;

                    let i = (x + (y * width)) * 4;

                    let r = pixels[i+0];
                    let g = pixels[i+1];
                    let b = pixels[i+2];

                    let br = (r+b+g) / 765.0;
                    // br = map(br, 0, 1, 1, 0);

                    let index = vX + (vY * xvec);
                     
                    
                 
                     // let vecDirect = noise(xNoise, yNoise, time) * 2*(TWO_PI);
                  
                
                    let v0 = createVector(vX, vX);
                    let v1 = createVector(vX * cos(br*TWO_PI), vX * sin(br*TWO_PI));

                    let vecDirect = v0.angleBetween(v1);
                    // let vecDirect = br * 2 * (TWO_PI);
                    let dir = p5.Vector.fromAngle(vecDirect);
                   
                    flowfield[index] = dir;
                    dir.setMag(3);

                    console.log(br);
                
                    stroke(br*255,255,255);
              
                    push();
                    translate(x, y);
                    rotate(dir.heading());
                    line(0, 0, sclY, 0);
                    pop();
              }
       }
}

function Particle() {
       this.x = random(width);
       this.y = random(height);
       this.pos = createVector(this.x, this.y);
       this.vel = createVector(0, 0);
       this.acc = createVector(0, 0);
       this.r = 2.0;
       this.maxspeed = 5;

       this.update = function() {
              this.pos.add(this.vel);
              this.vel.add(this.acc);
              this.acc.mult(0);
              this.vel.limit(this.maxspeed);
       }

       this.follow = function(vectors) { // flowfield vectors
              let x = floor(this.pos.x / sclX);
              let y = floor(this.pos.y / sclY);
              let index = x + y * xvec;
              let force = vectors[index];
              this.applyForce(force);
       }

       this.applyForce = function(force) {
              this.acc.add(force);
       }

       this.show = function() {
              fill(0,0,255);
              noStroke();
              ellipse(this.pos.x, this.pos.y, 4, 4);
       }

       this.edge = function() {
              if (this.pos.x < -this.r) this.pos.x = width + this.r;
              if (this.pos.y < -this.r) this.pos.y = height + this.r;
              if (this.pos.x > width + this.r) this.pos.x = -this.r;
              if (this.pos.y > height + this.r) this.pos.y = -this.r;
       }
}

function windowResized() {
       resizeCanvas(windowWidth, windowHeight);
}
