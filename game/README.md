# Just Wise Love

A survival game where you choose a male or female character, gather resources (wood, berries, stone, fish), build a shelter, defend against crabs and eagles, and escape by boat.

## Setup
1. Ensure the repository has:
   - `index.html`
   - `main.js`
   - `README.md`
2. Deploy to GitHub Pages:
   - Go to `https://github.com/<your-username>/game` on your mobile browser.
   - Tap Settings > Pages.
   - Select `main` branch, `/ (root)`, and Save.
   - Wait 5-10 minutes, then visit `https://<your-username>.github.io/game/`.
3. Play in your browser (mobile or desktop):
   - Tap 🧍 Male or 🧍‍♀️ Female to start.
   - Follow the tutorial to gather resources and build a boat.

## Gameplay
- Choose a character (affects Green Male’s start).
- Green Male (🧍) gathers wood (🌴) to build shelter (🏕️) at 50 wood.
- Pink Female (🧍‍♀️) gathers berries (🍓).
- Yellow Male (🧍) gathers stone (🪨).
- Purple Female (🧍‍♀️) gathers fish (🐟).
- Crabs (🦀) steal berries/fish; eagles (🦅) steal wood/stone. Tap them to stop.
- Upgrade gatherers (⬆️ buttons) with 10 resources to increase speed.
- Build a boat (⛵, 100 wood, 50 stone) and move Green Male to it to win.
- Avoid starvation (berries/fish = 0).

## Notes
- Uses emojis as placeholders; no images needed.
- For production, edit `main.js` to change enemy spawn from 10-20s to 5-15min:
  - Find: `delay: Phaser.Math.Between(10000, 20000)`
  - Change to: `delay: Phaser.Math.Between(300000, 900000)`
