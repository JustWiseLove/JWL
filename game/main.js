const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

const game = new Phaser.Game(config);

let resources = { wood: 0, berries: 0, stone: 0, fish: 0 };
let characters = [];
let shelter = null;
let boat = null;
let crabs = [];
let eagles = [];
let gameState = 'playing';
let tutorialStep = 0;
let tutorialMessages = [
    "Green Male 🧍 gathers wood from 🌴. Wait for 50 wood to build the shelter 🏕️.",
    "Shelter 🏕️ built! Pink Female 🧍‍♀️ spawns to gather berries 🍓.",
    "Yellow Male 🧍 spawns to gather stone 🪨.",
    "Purple Female 🧍‍♀️ spawns to fish 🐟.",
    "Crabs 🦀 and eagles 🦅 steal resources! Tap them to stop them. Upgrade gatherers with ⬆️ buttons."
];

function preload() {
    // No images; emojis used as text sprites
}

function create() {
    // Background
    this.add.rectangle(200, 300, 400, 600, 0x1E90FF); // Left: Blue water
    this.add.rectangle(400, 300, 400, 600, 0x8B4513); // Middle: Brown sand
    this.add.rectangle(600, 300, 400, 600, 0x228B22); // Right: Green grass
    this.add.rectangle(400, 100, 800, 200, 0x808080); // Back: Gray rocks
    this.add.rectangle(400, 550, 800, 100, 0x654321); // Bottom: Dark brown soil

    // Resource display
    this.resourceText = this.add.text(10, 10, 'Wood: 0 | Berries: 0 | Stone: 0 | Fish: 0', { font: '16px Arial', fill: '#FFFFFF' }).setDepth(1);

    // Action buttons (emojis)
    this.fishButton = this.add.text(100, 100, '🐟', { font: '32px Arial', fill: '#FFFFFF' }).setInteractive().setDepth(1);
    this.berryButton = this.add.text(700, 300, '🍓', { font: '32px Arial', fill: '#FFFFFF' }).setInteractive().setDepth(1);
    this.stoneButton = this.add.text(400, 50, '🪨', { font: '32px Arial', fill: '#FFFFFF' }).setInteractive().setDepth(1);
    this.woodButton = this.add.text(400, 550, '🌴', { font: '32px Arial', fill: '#FFFFFF' }).setInteractive().setDepth(1);
    this.boatButton = this.add.text(400, 500, '⛵ Build Boat', { font: '16px Arial', fill: '#FFFFFF', backgroundColor: '#000000', padding: { x: 10, y: 5 } }).setInteractive().setDepth(1).setVisible(false);

    // Upgrade buttons
    this.upgradeGreen = this.add.text(10, 50, '⬆️ Green (10 Berries)', { font: '16px Arial', fill: '#FFFFFF', backgroundColor: '#000000', padding: { x: 5, y: 5 } }).setInteractive().setDepth(1).setVisible(false);
    this.upgradePink = this.add.text(10, 70, '⬆️ Pink (10 Fish)', { font: '16px Arial', fill: '#FFFFFF', backgroundColor: '#000000', padding: { x: 5, y: 5 } }).setInteractive().setDepth(1).setVisible(false);
    this.upgradeYellow = this.add.text(10, 90, '⬆️ Yellow (10 Wood)', { font: '16px Arial', fill: '#FFFFFF', backgroundColor: '#000000', padding: { x: 5, y: 5 } }).setInteractive().setDepth(1).setVisible(false);
    this.upgradePurple = this.add.text(10, 110, '⬆️ Purple (10 Stone)', { font: '16px Arial', fill: '#FFFFFF', backgroundColor: '#000000', padding: { x: 5, y: 5 } }).setInteractive().setDepth(1).setVisible(false);

    // Tutorial
    this.tutorialText = document.getElementById('tutorial');
    this.updateTutorial();

    // Start with Green Male
    spawnCharacter.call(this, 'green_male');

    // Button actions
    this.fishButton.on('pointerdown', () => {
        const purple = characters.find(c => c.getData('type') === 'purple_female');
        if (purple) purple.setData('target', this.fishButton);
    });
    this.berryButton.on('pointerdown', () => {
        const pink = characters.find(c => c.getData('type') === 'pink_female');
        if (pink) pink.setData('target', this.berryButton);
    });
    this.stoneButton.on('pointerdown', () => {
        const yellow = characters.find(c => c.getData('type') === 'yellow_male');
        if (yellow) yellow.setData('target', this.stoneButton);
    });
    this.woodButton.on('pointerdown', () => {
        const green = characters.find(c => c.getData('type') === 'green_male');
        if (green) green.setData('target', this.woodButton);
    });
    this.boatButton.on('pointerdown', () => {
        if (resources.wood >= 100 && resources.stone >= 50) {
            resources.wood -= 100;
            resources.stone -= 50;
            spawnBoat.call(this);
            this.updateResources();
        }
    });

    // Upgrade actions
    this.upgradeGreen.on('pointerdown', () => {
        const green = characters.find(c => c.getData('type') === 'green_male');
        if (green && resources.berries >= 10) {
            resources.berries -= 10;
            green.setData('speed', green.getData('speed') + 0.5);
            this.updateResources();
        }
    });
    this.upgradePink.on('pointerdown', () => {
        const pink = characters.find(c => c.getData('type') === 'pink_female');
        if (pink && resources.fish >= 10) {
            resources.fish -= 10;
            pink.setData('speed', pink.getData('speed') + 0.5);
            this.updateResources();
        }
    });
    this.upgradeYellow.on('pointerdown', () => {
        const yellow = characters.find(c => c.getData('type') === 'yellow_male');
        if (yellow && resources.wood >= 10) {
            resources.wood -= 10;
            yellow.setData('speed', yellow.getData('speed') + 0.5);
            this.updateResources();
        }
    });
    this.upgradePurple.on('pointerdown', () => {
        const purple = characters.find(c => c.getData('type') === 'purple_female');
        if (purple && resources.stone >= 10) {
            resources.stone -= 10;
            purple.setData('speed', purple.getData('speed') + 0.5);
            this.updateResources();
        }
    });

    // Enemy spawns
    this.time.addEvent({
        delay: Phaser.Math.Between(10000, 20000), // 10-20s for testing
        callback: () => spawnEnemy.call(this),
        loop: true
    });

    // Click enemies to stop them
    this.input.on('pointerdown', (pointer) => {
        [crabs, eagles].forEach(enemies => {
            const enemy = enemies.find(e => e.active && Phaser.Math.Distance.Between(e.x, e.y, pointer.x, pointer.y) < 30);
            if (enemy) {
                enemy.destroy();
                enemies.splice(enemies.indexOf(enemy), 1);
                if (tutorialStep === 4) {
                    tutorialStep++;
                    this.updateTutorial();
                }
            }
        });
    });
}

function update() {
    if (gameState === 'playing') {
        // Character movement
        characters.forEach(char => {
            if (char.active) {
                const type = char.getData('type');
                let target = char.getData('target');
                if (!target || !target.active) {
                    if (type === 'green_male') target = this.woodButton;
                    else if (type === 'pink_female') target = this.berryButton;
                    else if (type === 'yellow_male') target = this.stoneButton;
                    else if (type === 'purple_female') target = this.fishButton;
                    char.setData('target', target);
                }
                if (target) {
                    this.physics.moveToObject(char, target, char.getData('speed') * 60);
                    if (Phaser.Math.Distance.Between(char.x, char.y, target.x, target.y) < 20) {
                        if (type === 'green_male') resources.wood += 1;
                        else if (type === 'pink_female') resources.berries += 1;
                        else if (type === 'yellow_male') resources.stone += 1;
                        else if (type === 'purple_female') resources.fish += 1;
                        char.setData('target', shelter || this.add.text(400, 300, '🏕️', { font: '32px Arial' }));
                        this.updateResources();
                    } else if (shelter && Phaser.Math.Distance.Between(char.x, char.y, shelter.x, shelter.y) < 20) {
                        char.setData('target', type === 'green_male' ? this.woodButton : type === 'pink_female' ? this.berryButton : type === 'yellow_male' ? this.stoneButton : this.fishButton);
                    }
                }
            }
        });

        // Shelter building
        if (!shelter && resources.wood >= 50) {
            shelter = this.add.text(400, 300, '🏕️', { font: '32px Arial' }).setDepth(1);
            spawnCharacter.call(this, 'pink_female');
            this.upgradeGreen.setVisible(true);
            tutorialStep++;
            this.updateTutorial();
        }

        // Spawn additional characters
        if (shelter && resources.berries >= 20 && !characters.find(c => c.getData('type') === 'yellow_male')) {
            spawnCharacter.call(this, 'yellow_male');
            this.upgradePink.setVisible(true);
            tutorialStep++;
            this.updateTutorial();
        }
        if (shelter && resources.stone >= 20 && !characters.find(c => c.getData('type') === 'purple_female')) {
            spawnCharacter.call(this, 'purple_female');
            this.upgradeYellow.setVisible(true);
            this.upgradePurple.setVisible(true);
            this.boatButton.setVisible(true);
            tutorialStep++;
            this.updateTutorial();
        }

        // Enemy behavior
        crabs.forEach(crab => {
            if (crab.active && shelter) {
                this.physics.moveToObject(crab, shelter, 50);
                if (Phaser.Math.Distance.Between(crab.x, crab.y, shelter.x, shelter.y) < 20) {
                    const resource = Phaser.Math.RND.pick(['berries', 'fish']);
                    resources[resource] = Math.max(0, resources[resource] - 2);
                    crab.destroy();
                    crabs.splice(crabs.indexOf(crab), 1);
                    this.updateResources();
                }
            }
        });
        eagles.forEach(eagle => {
            if (eagle.active && shelter) {
                this.physics.moveToObject(eagle, shelter, 50);
                if (Phaser.Math.Distance.Between(eagle.x, eagle.y, shelter.x, shelter.y) < 20) {
                    const resource = Phaser.Math.RND.pick(['wood', 'stone']);
                    resources[resource] = Math.max(0, resources[resource] - 2);
                    eagle.destroy();
                    eagles.splice(eagles.indexOf(eagle), 1);
                    this.updateResources();
                }
            }
        });

        // Resource consumption
        if (this.time.now % 15000 < 60) {
            resources.berries = Math.max(0, resources.berries - 1);
            resources.fish = Math.max(0, resources.fish - 1);
            this.updateResources();
            if (resources.berries === 0 && resources.fish === 0) {
                gameState = 'gameOver';
                this.tutorialText.innerText = 'Game Over: You starved! Refresh to restart.';
            }
        }

        // Win condition
        if (boat && characters.find(c => c.getData('type') === 'green_male')) {
            const green = characters.find(c => c.getData('type') === 'green_male');
            if (Phaser.Math.Distance.Between(green.x, green.y, boat.x, boat.y) < 20) {
                gameState = 'won';
                this.tutorialText.innerText = 'You Win! You built a boat and escaped!';
            }
        }
    }
}

function spawnCharacter(type) {
    const x = 400, y = 300;
    const emoji = type === 'green_male' ? '🧍' : type === 'pink_female' ? '🧍‍♀️' : type === 'yellow_male' ? '🧍' : '🧍‍♀️';
    const color = type === 'green_male' ? '#00FF00' : type === 'pink_female' ? '#FF69B4' : type === 'yellow_male' ? '#FFFF00' : '#800080';
    const char = this.physics.add.text(x, y, emoji, { font: '24px Arial', fill: color }).setDepth(1);
    char.setData('type', type);
    char.setData('speed', 1);
    char.setData('target', type === 'green_male' ? this.woodButton : type === 'pink_female' ? this.berryButton : type === 'yellow_male' ? this.stoneButton : this.fishButton);
    characters.push(char);
}

function spawnBoat() {
    boat = this.add.text(400, 200, '⛵', { font: '32px Arial' }).setDepth(1);
    this.tutorialText.innerText = 'Boat ⛵ built! Green Male 🧍 will move to it to win!';
    const green = characters.find(c => c.getData('type') === 'green_male');
    if (green) green.setData('target', boat);
}

function spawnEnemy() {
    if (shelter && gameState === 'playing') {
        const type = Phaser.Math.RND.pick(['crab', 'eagle']);
        const pos = type === 'crab' ? Phaser.Math.RND.pick([[100, 0], [100, 600]]) : Phaser.Math.RND.pick([[700, 0], [700, 600]]);
        const enemy = this.physics.add.text(pos[0], pos[1], type === 'crab' ? '🦀' : '🦅', { font: '24px Arial' }).setDepth(1);
        (type === 'crab' ? crabs : eagles).push(enemy);
    }
}

function updateResources() {
    this.resourceText.setText(`Wood: ${resources.wood} | Berries: ${resources.berries} | Stone: ${resources.stone} | Fish: ${resources.fish}`);
}

function updateTutorial() {
    this.tutorialText.innerText = tutorialMessages[tutorialStep];
}
