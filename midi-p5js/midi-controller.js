/*
function setup() {
  WebMidi.enable(err => {
      if (err) {
        console.log("error:",err)
      } 

      console.log(WebMidi.inputs)
      console.log(WebMidi.outputs)

      midiInput = WebMidi.inputs[0];

      midiInput.addListener('noteon', "all", e => {
        console.log("noteon (" + e.note.name + e.note.octave + ") " + e.note.number + ".")
        ellipse(Math.random()*800,Math.random()*800,e.note.octave,e.note.octave);
      })

      midiInput.addListener('noteoff', "all", e => {
        console.log("noteoff (" + e.note.name + e.note.octave + ") " + e.note.number + ".")
        ellipse(50,50,80,80);
      })

    }
  )

  createCanvas(800, 800);
}

function draw() {
  background(220);
  ellipse(50,50,80,80);
}
*/

"use strict";


var discs = [];

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  WebMidi.enable(function (err) {
    if (err) {
      console.log("WebMidi could not be enabled.", err);
    } else {
      console.log("WebMidi enabled!");
    
      WebMidi.inputs[0].addListener('noteon', "all",
          function (e) {
              discs.push(new Disc(e.velocity));
          }
        );
    }
  
});

}
  
  
function draw() {
  background(255);
    
  for(var i in discs){
    discs[i].draw();
    discs[i].step();
  }
  
  for(var i in discs){
    var d = discs[i];
    
    if(d.rad < 0.1) {
      delete discs[i];
      discs.splice(i,1);    
    }
  }
  
}

class Disc{
  constructor(vel){
    this.x = width/8 + random(width*6/8);
    this.y = height/8 + random(height*6/8);
    this.color = random(200);
    this.rad = map(vel,0,127,width/20,width/2);
  }
  
  draw() {
    fill(this.color);
    noStroke();
    ellipse(this.x,this.y,this.rad * 2,this.rad * 2);
  }

  step(){
    this.rad *= 0.992;      
  }
}
