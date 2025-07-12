let ROWS = 8;
let COLS = 16;
let CLOCK_SIZE = 30; // Size of each clock in pixels
let CLOCK_SPACING = 50; // Spacing between clocks in pixels

let clockwall;

function setup() {
  setFrameRate(30);
  angleMode(RADIANS);
  createCanvas(COLS * 50, ROWS * 50);
  clockwall = new ClockWall(ROWS, COLS, CLOCK_SIZE, CLOCK_SPACING);
}

function draw() {
  background(200);
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      let ang1 = PI * cos((0.5 * frameCount + i / 2) * 0.1);
      let ang2 = PI * sin((0.5 * frameCount + j) * 0.1);
      clockwall.setFace(i, j, ang1, ang2);
    }
  }
  clockwall.display();
}
