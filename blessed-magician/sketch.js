let xSize = 820
let ySize = 820
let step = 100 
let diceMatrix = []
let options = {
  dotSize: 10,
  innerGap: 20,
  showMenu: false,
  toggleStroke: false
}

function drawMenu() {
  let menuText = `
  MENU
  -------
  hotkeys:

  q     - randomize every tile
  click - change tile
  w     - toggle stroke
  e - rotate tile

  #### yet to implement
  a - previous frame
  s - play/pause
  d - next frame
  `
  stroke(0); strokeWeight(5); textSize(20);
  text(menuText,0.05 * xSize, 0.05 * ySize)
  strokeWeight(1)
}

function drawDice(x,y,n,r) {
  options.toggleStroke ? stroke(255) : noStroke(); noFill(); rect(x,y,80)

  fill(255); stroke(255)
  switch (n) {
    case 0:
      break
    case 1:
      ellipse( x + ((1+1) * 20), y + ((1+1) * 20), 10,10)
      break
    case 2:
      if (r == 1) {
        ellipse( x + ((2+1) * 20), y + ((0+1) * 20), 10,10)
        ellipse( x + ((0+1) * 20), y + ((2+1) * 20), 10,10)
      } else {
        ellipse( x + ((0+1) * 20), y + ((0+1) * 20), 10,10)
        ellipse( x + ((2+1) * 20), y + ((2+1) * 20), 10,10)
      }
      break
    case 3:
      if (r == 1){
        ellipse( x + (0+1 * 20), y + ((2+1) * 20), 10,10)
        ellipse( x + ((1+1) * 20), y + ((1+1) * 20), 10,10)
        ellipse( x + ((2+1) * 20), y + ((0+1) * 20), 10,10)
      } else {
        ellipse( x + (0+1 * 20), y + (0+1 * 20), 10,10)
        ellipse( x + ((1+1) * 20), y + ((1+1) * 20), 10,10)
        ellipse( x + ((2+1) * 20), y + ((2+1) * 20), 10,10)
      }
      break
    case 4:
      ellipse( x + ((0+1) * 20), y + ((0+1) * 20), 10,10)
      ellipse( x + ((0+1) * 20), y + ((2+1) * 20), 10,10)
      ellipse( x + ((2+1) * 20), y + ((0+1) * 20), 10,10)
      ellipse( x + ((2+1) * 20), y + ((2+1) * 20), 10,10)
      break
    case 5:
      ellipse( x + ((0+1) * 20), y + ((0+1) * 20), 10,10)
      ellipse( x + ((0+1) * 20), y + ((2+1) * 20), 10,10)
      ellipse( x + ((1+1) * 20), y + ((1+1) * 20), 10,10)
      ellipse( x + ((2+1) * 20), y + ((0+1) * 20), 10,10)
      ellipse( x + ((2+1) * 20), y + ((2+1) * 20), 10,10)
      break
    case 6:
      if (r == 1){
        ellipse( x + ((0+1) * 20), y + ((0+1) * 20), 10,10)
        ellipse( x + ((0+1) * 20), y + ((1+1) * 20), 10,10)
        ellipse( x + ((0+1) * 20), y + ((2+1) * 20), 10,10)
        ellipse( x + ((2+1) * 20), y + ((0+1) * 20), 10,10)
        ellipse( x + ((2+1) * 20), y + ((1+1) * 20), 10,10)
        ellipse( x + ((2+1) * 20), y + ((2+1) * 20), 10,10)
      } else {
        ellipse( x + ((0+1) * 20), y + ((0+1) * 20), 10,10)
        ellipse( x + ((1+1) * 20), y + ((0+1) * 20), 10,10)
        ellipse( x + ((2+1) * 20), y + ((0+1) * 20), 10,10)
        ellipse( x + ((0+1) * 20), y + ((2+1) * 20), 10,10)
        ellipse( x + ((1+1) * 20), y + ((2+1) * 20), 10,10)
        ellipse( x + ((2+1) * 20), y + ((2+1) * 20), 10,10)
      }
      break
  }
}

function drawDotMatrix(x,y) {
  fill(255); stroke(255)
  let drawEllipse = (xIndex,yIndex) => ellipse( x + ((xIndex+1) * options.innerGap), y + ((yIndex+1) * options.innerGap), options.dotSize, options.dotSize)

  m = [
    [1,1,1],
    [0,1,0],
    [1,1,1]
  ]

  for (i in m){
    for (j in m[i]){
      m[i][j] == 1 ? drawEllipse(j,i): null
    }
  }
  text(a,200,200)
}

function mouseClicked() {
  let x = int(mouseX/step)
  let y = int(mouseY/step)
  diceMatrix[y][x].n = (diceMatrix[y][x].n + 1) % 7
}

function keyPressed() {
  let x = int(mouseX/step)
  let y = int(mouseY/step)

  key == " "?  options.showMenu = !(options.showMenu) : null
  key == "q"?  diceMatrix.forEach( row => row.forEach(dice =>  dice.n = Math.floor(Math.random()*6)+1 )) : null
  key == "w"?  options.toggleStroke = !(options.toggleStroke) : null
  key == "e"?  diceMatrix[y][x].r = 1 - diceMatrix[y][x].r : null
  key == "0"?  diceMatrix[y][x].n = 0 : null
  key == "1"?  diceMatrix[y][x].n = 1 : null
  key == "2"?  diceMatrix[y][x].n = 2 : null
  key == "3"?  diceMatrix[y][x].n = 3 : null
  key == "4"?  diceMatrix[y][x].n = 4 : null
  key == "5"?  diceMatrix[y][x].n = 5 : null
  key == "6"?  diceMatrix[y][x].n = 6 : null
}

function setup() {
  createCanvas(xSize, ySize);

  for (let i = 20; i < ySize; i += step){
    let row= []
    for (let j = 20; j < xSize; j += step){
      row.push({ x: j, y: i, n: Math.floor(Math.random()*7), r: Math.floor(Math.random()*2)})
    }
    diceMatrix.push(row)
  }
  frameRate(1);
}

function draw () {
  background(0)
  //diceMatrix.forEach( row => row.forEach(dice => drawDice(dice.x,dice.y,dice.n,dice.r)))
  diceMatrix.forEach( row => row.forEach(dice => drawDotMatrix(dice.x,dice.y)))
  options.showMenu ? drawMenu() : null
}
