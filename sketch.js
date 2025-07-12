let ROWS = 8;
let COLS = 16;
let CLOCK_SIZE = 30; // Size of each clock in pixels
let CLOCK_SPACING = 50; // Spacing between clocks in pixels

let clockwall;
let myRadio;
let slider;

function setup() {
  setFrameRate(30);
  angleMode(RADIANS);
  createCanvas(COLS * 50, ROWS * 50);
  clockwall = new ClockWall(ROWS, COLS, CLOCK_SIZE, CLOCK_SPACING);

  myRadio = createRadio();
  myRadio.option("perlin");
  myRadio.option("sin");
  myRadio.option("square");
  myRadio.selected("square");

  createP("Speed:");
  slider = createSlider(0, 255);
}

let noise_dist = 5;
let noise_radius = 2;
let noise_speed = 0.01;
let speed = 0;
function draw() {
  background(200);
  speed = slider.value() / 1000;
  switch (myRadio.value()) {
    case "perlin":
      let x,
        y = 0;
      let t = frameCount * speed;
      for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
          x = i + noise_radius * cos(t);
          y = j + noise_radius * sin(t);
          let here = 2 * noise(x, y) - 1;
          let up = 2 * noise(x, y + noise_dist) - 1;
          let right = 2 * noise(x + noise_dist, y) - 1;

          let ang1 = PI * (here - up);
          let ang2 = PI * (here - right);
          clockwall.setFace(i, j, ang1, ang2);
        }
      }
      break;
    case "sin":
      for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
          let ang1 = PI * sin((frameCount + 5 * j) * speed);
          let ang2 = PI * cos((frameCount + 5 * i) * speed);
          clockwall.setFace(i, j, ang1, ang2);
        }
      }
      break;
    case "square":
      for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
          let rot_pos = 2 * PI * sin(frameCount * speed);
          if ((i + j) % 2 === 0) {
            rot_pos = -rot_pos;
          }
          let ang1 = (j % 2) * PI + rot_pos;
          let ang2 = PI / 2 + (i % 2) * PI - rot_pos;
          clockwall.setFace(i, j, ang1, ang2);
        }
      }
      break;
  }
  clockwall.display();
}
