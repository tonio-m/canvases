var fps = 60
var numFrames = fps*3
var capturer = new CCapture({ format: 'png', framerate: fps })

function setup() {
  createCanvas(400, 400)
  frameRate(fps)
}

function draw() {
  if (frameCount === 1) {
    capturer.start()
  } else if (frameCount === numFrames){
    noLoop()
    capturer.stop()
    capturer.save()
  }

  circle(mouseX,mouseY,10)
  capturer.capture(document.getElementById('defaultCanvas0'))
}
