# Alok ❤️ Titil - A Love Story in Motion

A beautiful, highly interactive React web application designed as a digital romantic proposal and a cinematic journey through memories. 

**🌍 Live Demo:** [https://Alokdey07.github.io/alokandtitil/](https://Alokdey07.github.io/alokandtitil/)

---

## ✨ Key Features & Experiences

This website was built with a focus on premium aesthetics, micro-interactions, and a moody, romantic atmosphere.

### 1. Interactive 3D Heart (Hero Section)
* **Technology**: `Three.js` and `@react-three/fiber`
* **Behavior**: As soon as the user lands, they are greeted with a glowing, procedurally distorted 3D heart. It smoothly tracks the user's mouse (or touch on mobile), slightly rotating toward the pointer. 
* **Design**: It features an emissive neon-crimson glow that pops beautifully against the dark, midnight-burgundy radial background.

### 2. Cinematic Video Parallax
* **Technology**: `framer-motion`
* **Behavior**: As the user scrolls down, the journey transitions into a beautiful, seamless video background. 
* **Design**: The video uses a custom CSS vignette mask (radial and linear gradients) to perfectly blend its hard edges into the dark theme of the website. A frosted glassmorphism panel floats over the video, displaying parallax text that moves at a different speed than the scroll for a premium "Apple-like" feel.

### 3. The Playful Proposal
* **Technology**: `framer-motion` layout animations and React event listeners.
* **Behavior**: The grand finale is a "Will you marry me?" prompt. It features two buttons. The "Yes" button is prominent and invites a click. The "No" button is fully interactive—if the user tries to click or tap it, it playfully runs away, dodging their cursor randomly around the screen!
* **Mobile Optimized**: The "No" button dodge logic listens for both `onMouseEnter` (desktop) and `onTouchStart` (mobile), ensuring the playful interaction works perfectly on phones.

### 4. Ambient Particle System
* Soft, floating glowing hearts continuously drift up the screen in the background globally, giving the entire site a magical, lively atmosphere.

### 5. Custom Engagement Ring Cursor
* We replaced the standard browser mouse pointer with a delightful custom CSS SVG cursor that looks like a diamond engagement ring (💍).

---

## 🚀 Tech Stack

- **Framework**: React 19 via Vite
- **Styling**: Vanilla CSS with modern features (`clamp()` for fluid typography, CSS variables for theming, flexbox).
- **Animations**: Framer Motion (spring animations, scroll tracking, layout transitions).
- **3D Graphics**: Three.js, React Three Fiber, and React Drei.
- **Icons**: Lucide React.
- **Deployment**: `gh-pages` npm package automatically publishing to GitHub Pages.

---

## 📁 Project Structure

```text
alok2026/
├── public/                 # Static assets (favicons, etc.)
├── src/
│   ├── assets/             # Media files (like the background MP4 video)
│   ├── components/
│   │   ├── FloatingHearts.tsx  # Global background particle system
│   │   ├── Hero.tsx            # Top section containing the title and 3D heart wrapper
│   │   ├── InteractiveHeart.tsx# The Three.js canvas and 3D mesh logic
│   │   ├── VideoSection.tsx    # The scroll-tied cinematic video area
│   │   └── Ending.tsx          # The final proposal and playful "No" button
│   ├── App.tsx             # Main orchestrator linking all sections together
│   └── index.css           # Global theme variables, typography, and custom cursor
├── package.json            # Dependencies and deployment scripts
└── vite.config.ts          # Vite bundler configuration (includes base path mapping)
```

---

## 🎨 Customization Guide

If you want to tweak the website in the future, here is where you look:

* **Colors & Fonts**: Open `src/index.css`. You can change `--primary-color`, `--bg-color`, or the font families at the top of the file.
* **The Video**: To change the video, place a new `.mp4` file in `src/assets/`, then update the `import videoSource from ...` line at the top of `src/components/VideoSection.tsx`.
* **The Proposal Text**: Open `src/components/Ending.tsx` to change the final message or what happens when "Yes" is clicked (currently it triggers an alert).

---

## 💻 Running Locally

To run this project on your own computer:

1. **Clone the repository** and navigate into it.
2. **Install all dependencies:**
   ```bash
   npm install
   ```
3. **Start the local development server:**
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the URL provided in the terminal (usually `http://localhost:5173/`).

---

## 🌐 Deployment

This project is perfectly configured to deploy to **GitHub Pages**.

To push a new update live:
1. Ensure you have committed any local changes.
2. Open your terminal in the project folder and run:
   ```bash
   npm run deploy
   ```
3. Wait 1-2 minutes for GitHub Actions to build the site. It will be live at the URL specified in the `package.json` homepage field.
