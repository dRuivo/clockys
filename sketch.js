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
  myRadio.option("wave");
  myRadio.option("square");
  myRadio.option("clock");
  myRadio.selected("clock");

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
    case "clock":
      let now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let seconds = now.getSeconds();
      let milliseconds = now.getMilliseconds();
      let phase = ((seconds + milliseconds / 1000) / 60) ** 2;
      let in_1_min = new Date(now.getTime() + 60 * 1000);
      let in_1_min_hours = in_1_min.getHours();
      let in_1_min_minutes = in_1_min.getMinutes();
      let current_digits = [
        Math.floor(hours / 10),
        hours % 10,
        Math.floor(minutes / 10),
        minutes % 10,
      ];
      let in_1_min_digits = [
        Math.floor(in_1_min_hours / 10),
        in_1_min_hours % 10,
        Math.floor(in_1_min_minutes / 10),
        in_1_min_minutes % 10,
      ];
      console.log(current_digits, in_1_min_digits, seconds);
      // let num = numbers6x3[0];
      for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
          let ang1 =
            (2 * PI * (seconds + milliseconds / 1000)) / 60 +
            (j * PI) / 16 +
            (i * PI) / 8;
          let ang2 = ang1 + PI;
          if (i > 0 && i < 7 && j > 0 && j < 4) {
            let c = current_digits[0];
            let n = in_1_min_digits[0];
            ii = i - 1;
            jj = j - 1;
            ang1 =
              (clock_digits[c][ii][jj][0] * (1 - phase) +
                phase * clock_digits[n][ii][jj][0]) *
              PI;
            ang2 =
              (clock_digits[c][ii][jj][1] * (1 - phase) +
                phase * clock_digits[n][ii][jj][1]) *
              PI;
          } else if (i > 0 && i < 7 && j > 3 && j < 7) {
            let c = current_digits[1];
            let n = in_1_min_digits[1];
            ii = i - 1;
            jj = j - 4;
            ang1 =
              (clock_digits[c][ii][jj][0] * (1 - phase) +
                phase * clock_digits[n][ii][jj][0]) *
              PI;
            ang2 =
              (clock_digits[c][ii][jj][1] * (1 - phase) +
                phase * clock_digits[n][ii][jj][1]) *
              PI;
          } else if (i > 0 && i < 7 && j > 6 && j < 10) {
            let c = current_digits[2];
            let n = in_1_min_digits[2];
            ii = i - 1;
            jj = j - 7;
            ang1 =
              (clock_digits[c][ii][jj][0] * (1 - phase) +
                phase * clock_digits[n][ii][jj][0]) *
              PI;
            ang2 =
              (clock_digits[c][ii][jj][1] * (1 - phase) +
                phase * clock_digits[n][ii][jj][1]) *
              PI;
          } else if (i > 0 && i < 7 && j > 9 && j < 13) {
            let c = current_digits[3];
            let n = in_1_min_digits[3];
            ii = i - 1;
            jj = j - 10;
            ang1 =
              (clock_digits[c][ii][jj][0] * (1 - phase) +
                phase * clock_digits[n][ii][jj][0]) *
              PI;
            ang2 =
              (clock_digits[c][ii][jj][1] * (1 - phase) +
                phase * clock_digits[n][ii][jj][1]) *
              PI;
          }
          clockwall.setFace(i, j, ang1, ang2);
        }
      }
    //   break;
  }
  clockwall.display();
}
