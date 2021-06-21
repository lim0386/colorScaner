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

  rect(0, 0, 160, 240);
  rect(160, 0, 160, 240);
  rect(320, 0, 160, 240);
  rect(480, 0, 160, 240);
  rect(0, 240, 160, 240);
  rect(160, 240, 160, 240);
  rect(320, 240, 160, 240);
  rect(480, 240, 160, 240);

  if (x > 0 && x < 160) {
    x = 0;
  }
  if (x > 160 && x < 320) {
    x = 160;
  }
  if (x > 320 && x < 480) {
    x = 320;
  }
  if (x > 480 && x < 640) {
    x = 480;
  }

  if (mouseY > 240) {
    y = 240;
  } else {
    y = 0;
  }

  r = 0;
  g = 0;
  b = 0;
  let realPic = get(x, y, 160, 240);
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