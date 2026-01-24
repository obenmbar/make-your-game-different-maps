Markdown<div align="center">

  # 🐉 Dragon Ball Z: DOM Breaker
  
  ![Game Banner](https://media1.tenor.com/m/fXjXyN_-CukAAAAC/dragon-ball-z-dbz.gif)

  ### **A High-Performance Vanilla JS Experiment**
  
  <p>
    <a href="https://othmanebenmbarek.netlify.app/">
      <img src="https://img.shields.io/badge/PLAY%20NOW-Click%20Here%20To%20Start-red?style=for-the-badge&logo=google-play&logoColor=white" alt="Play Game" />
    </a>
  </p>

  ![Netlify Status](https://api.netlify.com/api/v1/badges/b5b8276f-0925-4c72-97d8-3453d8654637/deploy-status)
  ![Language](https://img.shields.io/badge/Language-Vanilla%20JS-yellow?style=flat-square)
  ![FPS](https://img.shields.io/badge/Performance-60%20FPS-green?style=flat-square)
  ![Size](https://img.shields.io/badge/Size-Lightweight-blue?style=flat-square)

</div>

---

## 🚀 About The Project

> *"With the passing of time... Boredom happens whenever people don't receive enough stimuli."*

You are not receiving enough stimuli. **Planet Namek is in danger.** Frieza is approaching. And the only way to save the universe (and cure your boredom) is to code your own game engine in **Vanilla JavaScript**.

**Target: 60 FPS. No Frame Drops. No Canvas. Just pure DOM power.**

This is a **Brick Breaker (Arkanoid)** style game set in the Dragon Ball Z universe. It was built as a performance challenge to master the **DOM**, **Event Loops**, and **Browser Rendering** optimization.

---

## 🎮 Play The Game

Don't want to install anything? Play the live version hosted on Netlify:

### [👉 Click Here to Play on Planet Namek](https://othmanebenmbarek.netlify.app/)

---

## 📖 Story Mode: The Namek Saga

Your journey follows the classic battles of Dragon Ball Z. Can you survive all three episodes?

### **EPISODE 1: ARRIVAL**
> *"Goku! You have arrived on Planet Namek. Frieza's soldiers are guarding the Dragon Balls."*
* **Mission:** Defeat the soldiers to proceed!

### **EPISODE 2: GINYU FORCE**
> *"Good job! But Frieza has called the Ginyu Force."*
* **Challenge:** These elite warriors have armor (Metal Bricks). Be careful!

### **EPISODE 3: FINAL FORM**
> *"You defeated the Ginyu Force! Now Frieza is angry and using his full power."*
* **Boss Battle:** Survive the final battle against Frieza to save the universe!

---

## 🛠️ Technical Specs (The Challenge)

This project strictly adheres to the following constraints:

- [x] **No Canvas / No WebGL:** All rendering is done via CSS manipulation (`transform`, `top`, `left`).
- [x] **Performance First:** Heavy use of Chrome DevTools (Performance Tab) to ensure scripts execute under **16.6ms** per frame.
- [x] **Input Handling:** Smooth keyboard controls (no key spamming required).
- [x] **Memory Management:** Minimal object creation during the game loop to avoid Garbage Collection pauses.

### Code Snippet: The Game Loop
```javascript
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
🕹️ ControlsKeyAction⬅️ Left ArrowMove Goku Left➡️ Right ArrowMove Goku RightSPACELaunch Spirit Bomb (Ball)PPause / Resume GameRRestart Mission📦 How to Run LocallyIf you want to look at the code or run it on your machine:Clone the repository:Bashgit clone [https://github.com/obenmbar/make-your-game-history.git](https://github.com/obenmbar/make-your-game-history.git)
Navigate to the folder:Bashcd make-your-game-history
Launch:Simply double-click index.html to open it in your browser.🏆 Status<div align="center">👨‍💻 AuthorCreated by Othmane Benmbarek"This isn't even my final form!" - Frieza (and probably this code)</div>
