var fps = 60
var numFrames = fps*10
var capturer = new CCapture({ format: 'png', framerate: fps })



let characters = '▄▀▁▂▃▅▆▇▉▊▋▌█▍▎▐░▒▓▔▕▖▗▘▙▚▛▜▝▞▟█'
let rain = []


function setup() {
  createCanvas(400, 400)
  frameRate(fps)
  background(255)
}

function draw() {
  // if (frameCount === 1) {
  //   capturer.start()
  // } else if (frameCount === numFrames){
  //   noLoop()
  //   capturer.stop()
  //   capturer.save()
  // }
  //
  if (frameCount % 10 === 0){
    rain.push({
      i: floor(random(characters.length)),
      x: random(400),
      y: 0
    })
  }

  fill(sin(frameCount/100)*255)
  textSize(10)
  for (o of rain){
    if (random() > 0.99) o.i = floor(random(characters.length))
    o.y += 2
    text(characters[o.i],o.x,o.y)
  }
  fill(0)
  textSize(20)
  text(`${"░".repeat(400)}\n`.repeat(400),0,0)
  text(`
   ╔╗╔╗
   ║╚╣╚╦╦╦═╦╦╦╦═╗╔╦╦╦═╗╔╦╗
   ║╔╣║║╔╣╬║║║║╬╚╣║║║╬╚╣║║
   ╚═╩╩╩╝╚═╩══╩══╩══╩══╬╗║
   ░░░░░░░░░░░░░░░░░░░░╚═╝
  
  `,0,250)
  fill((sin(frameCount/5) > 0.5)*255)
  text('|',340,375 - abs(sin(frameCount/50)*5))

  //for (let i = 0; i < width; i+=20){
  //  text(characters[floor(sin(frameCount/100) * characters.length)],i,frameCount)
  //}
  // capturer.capture(document.getElementById('defaultCanvas0'))
}
