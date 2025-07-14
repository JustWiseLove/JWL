# Sheep Village Game

A simple Clash of Clans-style village builder with sheep and wolf attacks.

## Setup
1. Clone the repository: `git clone https://github.com/<your-username>/game.git`
2. Add placeholder images (`sheep_builder.png`, `sheep_defender.png`, `wolf.png`, `barn.png`, `turret.png`) to the `game/` folder.
3. Run locally:
   - Install Node.js.
   - Run `npx http-server game/`.
   - Open `http://localhost:8080` in your browser.
4. Deploy to GitHub Pages:
   - Push to GitHub: `git add .`, `git commit -m "Update game"`, `git push origin main`.
   - Enable GitHub Pages in Settings > Pages, select `main` branch, `/ (root)`.
   - Access at `https://<your-username>.github.io/game/`.

## Gameplay
- Click "Build Barn" or "Build Turret" and click the canvas to place buildings.
- Click "Spawn Sheep" to create a sheep (Builder or Defender).
- Builders repair barns; Defenders attack wolves.
- Wolves spawn periodically and attack sheep or buildings.
- Manage wool and wood resources to build and spawn.
