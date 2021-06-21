let c;
let img;
let r, g, b;
let osc, playing, midi;
let x = 0;
let y = 0;

function setup() {
  // createCanvas(640, 480);
  createCanvas(windowWidth, windowHeight);
  osc = new p5.Oscillator("sine");
  img = createCapture(VIDEO);
  img.hide();
  midi = 0;
}

function draw() {
  // 0=red, 60=yellow, 120=green, 180=cyan, 240=blue, 300=magenta
  image(img, 0, 0, width, height);
  screen();
}
function playOscillator() {
  osc.start();
  playing = true;
}
function mousePressed() {
  playOscillator();
}
function mouseReleased() {
  osc.amp(0, 0.5);
  playing = false;
}
function screen() {
  stroke(220);
  noFill();
  strokeWeight(1);

  rect(0, 0, width/4, height/2);
  rect(width/4, 0, width/4, height/2);
  rect(width/4*3, 0, width/4, height/2);
  rect(width, 0, width/4, height/2);
  rect(0, height/2, width/4, height/2);
  rect(width/4, height/2, width/4, height/2);
  rect(width/4*3, height/2, width/4, height/2);
  rect(width, height/2, width/4, height/2);

  if (x > 0 && x < width/4) {
    x = 0;
  }
  if (x > width/4 && x < width/2) {
    x = width/4;
  }
  if (x > width/2 && x < width/4*3) {
    x = width/2;
  }
  if (x > width/4*3 && x < width) {
    x = width/4*3;
  }

  if (mouseY > height/2) {
    y = height/2;
  } else {
    y = 0;
  }

  r = 0;
  g = 0;
  b = 0;
  let realPic = get(x, y, width/4, height/2);
  let allImage = realPic.width * realPic.height;
  // let allImage = width * height
  realPic.loadPixels();
  let i = 0;
  while (i < allImage * 4) {
    // for (let i = 0; i < allImage; i+=4) {
    r += realPic.pixels[i];
    g += realPic.pixels[i + 1];
    b += realPic.pixels[i + 2];
    i = i + 4;
  }
  // console.log(r/allImage, g/allImage, b/allImage);
  c = hue(color(r / allImage, g / allImage, b / allImage));
  console.log(c, midi);
  let x1 = map(c, 0, 360, 262, 523);
  midi = freqToMidi(x1);
  if (playing) {
    osc.freq(x1, 0.1);
    osc.amp(1, 0.1);
  }
}