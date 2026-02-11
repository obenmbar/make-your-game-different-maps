<div align="center">

  # 🐉 Dragon Ball Z: Tile Breaker
  
  ![Game Banner](https://media1.tenor.com/m/fXjXyN_-CukAAAAC/dragon-ball-z-dbz.gif)

  ### **A Custom Tile-Map Engine in Vanilla JS**
  
  <p>
    <a href="https://othmanebenmbarek.netlify.app/">
      <img src="https://img.shields.io/badge/PLAY%20NOW-Click%20Here%20To%20Start-red?style=for-the-badge&logo=google-play&logoColor=white" alt="Play Game" />
    </a>
  </p>

  ![Netlify Status](https://api.netlify.com/api/v1/badges/b5b8276f-0925-4c72-97d8-3453d8654637/deploy-status)
  ![Language](https://img.shields.io/badge/Language-Vanilla%20JS-yellow?style=flat-square)
  ![Architecture](https://img.shields.io/badge/Engine-Custom%20Tile%20Maps-blueviolet?style=flat-square)
  ![Performance](https://img.shields.io/badge/Performance-60%20FPS-green?style=flat-square)

</div>

---

## 🚀 About The Project

**"This isn't just a game; it's a Tile Map Engine."**

This project is a high-performance implementation of a **Tile-Based Game Engine** using pure Vanilla JavaScript. Instead of using external editors, the game features a custom-built engine that generates maps dynamically based on logic grids.

The goal was to master **Data Structures**, **DOM Rendering**, and **Asset Management** by recreating the classic Arkanoid mechanics within the Dragon Ball Z universe.

---

## 🎯 Project Objectives (The Challenge)

This engine was built to satisfy the following strict technical requirements:

* [x] **Custom Tile Engine:** No external tile editors used. The map generation logic is hard-coded from scratch.
* [x] **Dynamic Map Generation:** Maps are rendered programmatically from 2D arrays/grids.
* [x] **Multiple Tile Maps:** Features 3 distinct levels (Episodes), each with unique tile layouts and properties.
* [x] **Efficient Rendering:** Optimized DOM manipulation to handle grid rendering without performance loss (60 FPS).

---

## 🎮 Play The Game

Experience the engine in action directly in your browser:

### [👉 Click Here to Play on Planet Namek](https://othmanebenmbarek.netlify.app/)

---

## 🗺️ The Tile System (How it Works)

The core of this project is the **Map Generation System**. Instead of placing blocks manually, the game utilizes a logical grid system where each number represents a specific tile type (Brick).

### Data Structure Example
Each level is defined by a configuration object that maps logic to rendering:

```javascript
// Example of the Internal Grid Logic
const levelMap = {
    columns: 10,
    rows: 6,
    // 0: Empty, 1: Weak Brick, 2: Armored Brick (Metal)
    tiles: [
        1, 1, 2, 2, 1, 1,
        1, 0, 0, 0, 0, 1,
        2, 1, 1, 1, 1, 2,
        // ... continued pattern
    ],
    getTile: (col, row) => { /* logic to retrieve tile type */ }
}

Tile Types
Tier 1 (Saibaman): Standard Brick - Destroyed in 1 hit.

Tier 2 (Ginyu Force): Metal/Armored Brick - Requires multiple hits or special logic.

Tier 3 (Frieza): Special layout used in the final boss fight.


📖 Story Mode (The Maps)
The engine renders 3 different tile maps corresponding to the DBZ Saga:

MAP 1: THE ARRIVAL
Layout: Standard grid.

Objective: Clear the basic tiles to test the engine's physics.

MAP 2: GINYU FORCE
Layout: Complex pattern with "Metal Tiles" (Armored).

Tech: Demonstrates collision handling against different tile properties.

MAP 3: FINAL FORM
Layout: Boss battle configuration.

Tech: High-speed rendering and state management.

🛠️ Technical Implementation
Language: Vanilla JavaScript (ES6 Modules).

Rendering: DOM-based Grid System (optimized with requestAnimationFrame).

Collision Detection: AABB (Axis-Aligned Bounding Box) adapted for Grid/Tile collision.

State Management: Custom State Store to handle Level Transitions and Brick Arrays.

Code Snippet: The Game Loop
JavaScript
function gameLoop(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const deltaTime = timestamp - lastTime;
    
    if (!isPaused) {
        update(deltaTime); // Physics & Logic
        draw();            // DOM Updates
    }
    
    lastTime = timestamp;
    window.requestAnimationFrame(gameLoop);
}

🕹️ ControlsKeyAction
⬅️ Left Arrow Move Paddle Left
➡️ Right Arrow Move Paddle Right
SPACE Launch Ball / Start Map
