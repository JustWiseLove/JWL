# Just Wise Love

A survival game where you gather resources (wood, berries, stone, fish), build a shelter, defend against crabs and eagles, and escape by boat.

## Setup
1. Ensure the repository has:
   - `index.html`
   - `main.js`
   - `README.md`
2. Deploy to GitHub Pages:
   - Open `https://github.com/<your-username>/game` in your mobile browser.
   - Tap Settings > Pages.
   - Select `main` branch, `/ (root)`, and Save.
   - Wait 5-10 minutes, then visit `https://<your-username>.github.io/game/`.
3. Play in your browser (mobile or desktop):
   - Follow the tutorial to gather resources and build a boat.

## Gameplay
- Green Male 🧍 gathers wood (🌴) to build shelter 🏕️ at 50 wood.
- Pink Female 🧍‍♀️ gathers berries (🍓) after shelter.
- Yellow Male 🧍 gathers stone (🪨) after 20 berries.
- Purple Female 🧍‍♀️ gathers fish (🐟) after 20 stone.
- Crabs 🦀 (top-left/bottom-left) steal berries/fish; eagles 🦅 (top-right/bottom-right) steal wood/stone. Tap them to stop.
- Upgrade gatherers (⬆️ buttons) with 10 resources (e.g., 10 berries for Green Male) to increase speed.
- Build a boat (⛵, 100 wood, 50 stone), move Green Male to it to win.
- Avoid starvation (berries/fish = 0).

## Notes
- Uses emojis (🧍, 🧍‍♀️, 🏕️, ⛵, 🦀, 🦅) as placeholders; no images needed.
- For production, edit `main.js` to change enemy spawn from 10-20s to 5-15min:
  - Find: `delay: Phaser.Math.Between(10000, 20000)`
  - Change to: `delay: Phaser.Math.Between(300000, 900000)`
