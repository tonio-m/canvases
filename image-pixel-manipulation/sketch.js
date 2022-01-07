let img;

function preload() {
  img = loadImage('https://i.imgur.com/GaJWhOn.jpeg');
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  image(img, 0, 0, width, height);
  loadPixels();
  const d = pixelDensity();
  let lastPixel

  for (let x = 0  ; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const i = 4 * d*(y * d*width + x);
      const [r, g, b] = [pixels[i], pixels[i + 1], pixels[i + 2]]; // get colors
      if (random() > 0.7){
        fill(lastPixel[0],lastPixel[1],lastPixel[2])
        ellipse(x,y,1)
      }
      lastPixel =  [r,g,b]
    }
  }
  noLoop();
}
