let points = []
let scale = 0.009
let density = 50

function setup() {
  createCanvas(windowWidth, windowHeight)
  background(30)
  noiseDetail(1)

  let space = width / density

  for (let x = 0; x < width; x+= space){
    for (let y = 0; y < height; y+= space){
      let p = createVector(x + random(-10,10),y + random(-10,10))
      points.push(p)

    }
  }

}

function draw() {
  fill(255)
  noStroke()
  for (var i = 0; i < points.length; i++){
    let angle = map(
      noise(
        points[i].x * scale,
        points[i].y * scale
      ),
      0,1,0,720
    )
    if (cos(angle) == 0 || sin(angle) == 0){
      angle = 0.5
    }
    points[i].add(createVector(cos(angle),sin(angle)))
    ellipse(points[i].x,points[i].y,1)
  }
}