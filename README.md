# Flip the Box

A solo and multiplayer dice game based on Shut the Box, with Safe and Risk event dice.

## Game Modes
- **Solo** — close all 12 tiles for a perfect score
- **Lowest Score** — 2–4 players, each on their own board, pass when ready
- **Sudden Death** — 2 players share one board, first to get stuck is eliminated

---

## Deploying to Vercel (free, ~10 minutes)

### Step 1 — Put the code on GitHub

1. Go to [github.com](https://github.com) and create a free account if you don't have one
2. Click the **+** icon → **New repository**
3. Name it `flip-the-box`, set it to **Public**, click **Create repository**
4. On your computer, open Terminal (Mac) or Command Prompt (Windows) in this folder and run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/flip-the-box.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up with your GitHub account
2. Click **Add New Project**
3. Find and select your `flip-the-box` repository
4. Vercel will auto-detect Vite — just click **Deploy**
5. In ~60 seconds you'll get a live URL like `flip-the-box.vercel.app`

### Step 3 — Share with friends

Send them the Vercel URL. That's it — they can play instantly in their browser.

**To install as an app on their phone:**
- **iPhone**: Open in Safari → tap the Share icon → "Add to Home Screen"
- **Android**: Open in Chrome → tap the menu (⋮) → "Add to Home Screen"

---

## Running locally

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173)

## Building for production

```bash
npm run build
npm run preview
```

---

## Adding more games

The project is structured to grow into a game catalog. Each game lives in `src/games/`. 
To add a new game:

1. Create `src/games/YourGame/index.jsx`
2. Add it to the catalog in `src/App.jsx`

---

## Icons

The `public/icons/` folder needs two PNG icons for the PWA:
- `icon-192.png` — 192×192px
- `icon-512.png` — 512×512px

You can generate these free at [realfavicongenerator.net](https://realfavicongenerator.net) or [pwabuilder.com](https://www.pwabuilder.com).
An `apple-touch-icon.png` (180×180px) goes in `public/` for iPhone home screen icons.
