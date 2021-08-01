let obj
let hc = document.createElement('canvas')
hc.width = 800
hc.height = 800
document.body.appendChild(hc)
let hydra = new Hydra({ detectAudio: false, canvas: hc })
let pg

osc(1)
.mask(src(s0))
.layer(src(o0))
.out()

function setup() {
	let p5canvas = createCanvas(400, 400)
	pg = createGraphics(hc.width, hc.height)
	s0.init({src: drawingContext.canvas })
	noFill()
    p5canvas.hide()
}

    function draw() {
    background(0)
	pg.drawingContext.drawImage(hc, 0, 0, pg.width, pg.height)
    noStroke()
    fill(255)
    circle(mouseX-150,mouseY-150,100)
}
