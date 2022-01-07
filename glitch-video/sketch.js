let video
let w = 50
let h = 50

function preload() {
  video = createVideo(['assets/video0.mp4', 'assets/video0.webm'])
}

function setup() {
  createCanvas(w, h)
  video.loop()
  video.hide()
  noStroke()
}

function draw() {
  video.loadPixels()
  image(video, 0,0, w, h)
  for (let y; y < h; y++){
    for (let x; x < w; x++){
      let i  = (y*w + x)*4
      let c = video.pixels.slice(i,i+4)
      fill(...c)
      ellipse(x,y,1)

    }
  }


  // background(255);
  // const stepSize = round(constrain(0, 6, 32));
  // for (let y = 0; y < height; y += stepSize) {
  //   for (let x = 0; x < width; x += stepSize) {
  //     const i = y * width + x;
  //     const darkness = (255 - fingers.pixels[i * 4]) / 255;
  //     const radius = stepSize * darkness;
  //     ellipse(x, y, radius, radius);
  //   }
  // }
}

