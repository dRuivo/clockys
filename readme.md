# Clockys

Clockys is a creative clock wall visualization project that supports both [p5.js](https://p5js.org/) and [Three.js](https://threejs.org/) implementations. It displays a grid of analog clocks, each with two hands, whose angles are dynamically set to create interesting patterns.

## Features

- **Grid of Clocks:** Configurable number of rows and columns (default: 8x16).
- **Customizable Clock Size and Spacing:** Easily adjust via constants in `sketch.js`.
- **Dynamic Animation:** Each clock's hands are animated based on their grid position.
- **Modular Code:** Clock and ClockWall logic separated in `clock_face.js`.

## Project Structure

```
clockys/
├── clock_face.js    # Clock and ClockWall classes (p5.js)
├── index.html       # p5.js implementation HTML file
├── threejs.html     # Three.js implementation HTML file
├── main.js          # Three.js setup and logic
├── sketch.js        # p5.js setup and draw logic
├── style.css        # Basic styling for canvas
├── package.json     # npm dependencies and scripts
└── jsconfig.json    # JS config for editor tooling
```

## Development

### For p5.js Development

For rapid development and preview of the p5.js implementation, use the **Live Preview** extension in your code editor (such as VS Code). This allows you to see changes in real time as you edit your code.

1. Open the project folder in your editor.
2. Right-click `index.html` and select **Open with Live Preview** (or use the command palette).
3. Edit `sketch.js` or `clock_face.js` and see updates instantly in your browser.

### For Three.js Development

The Three.js implementation uses npm and Vite for development:

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npx vite
   ```

3. Open your browser to the URL shown in the terminal (typically `http://localhost:5173`).
4. Edit `main.js` and see updates instantly with hot module replacement.

## Getting Started

### For p5.js Implementation

1. Clone or download this repository.
2. Open `index.html` in your browser (or use Live Preview).
3. Modify `sketch.js` and `clock_face.js` to experiment with clock patterns.

### For Three.js Implementation

1. Clone or download this repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npx vite
   ```
4. Open your browser to the URL shown in the terminal.
5. Modify `main.js` to experiment with three.js clock patterns.

## Dependencies

### p5.js Implementation

- [p5.js](https://p5js.org/) (included via CDN in `index.html`)
- [p5.sound.js](https://p5js.org/reference/#/libraries/p5.sound) (optional, included)

### Three.js Implementation

- [Three.js](https://threejs.org/) (installed via npm)
- [Vite](https://vitejs.dev/) (development server)

---

Feel free to customize the clock grid, animation logic, or visual style!
