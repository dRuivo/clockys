# Clockys

Clockys is a creative clock wall visualization built with [p5.js](https://p5js.org/). It displays a grid of analog clocks, each with two hands, whose angles are dynamically set to create interesting patterns.

## Features

- **Grid of Clocks:** Configurable number of rows and columns (default: 8x16).
- **Customizable Clock Size and Spacing:** Easily adjust via constants in `sketch.js`.
- **Dynamic Animation:** Each clock's hands are animated based on their grid position.
- **Modular Code:** Clock and ClockWall logic separated in `clock_face.js`.

## Project Structure

```
clockys/
├── clock_face.js    # Clock and ClockWall classes
├── index.html       # Main HTML file, loads p5.js and scripts
├── sketch.js        # p5.js setup and draw logic
├── style.css        # Basic styling for canvas
└── jsconfig.json    # JS config for editor tooling
```

## Development

For rapid development and preview, use the **Live Preview** extension in your code editor (such as VS Code). This allows you to see changes in real time as you edit your code.

1. Open the project folder in your editor.
2. Right-click `index.html` and select **Open with Live Preview** (or use the command palette).
3. Edit `sketch.js` or `clock_face.js` and see updates instantly in your browser.

## Getting Started

1. Clone or download this repository.
2. Open `index.html` in your browser (or use Live Preview).
3. Modify `sketch.js` and `clock_face.js` to experiment with clock patterns.

## Dependencies

- [p5.js](https://p5js.org/) (included via CDN in `index.html`)
- [p5.sound.js](https://p5js.org/reference/#/libraries/p5.sound) (optional, included)

---

Feel free to customize the clock grid, animation logic, or visual style!
