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

let resources = { wood: 0, food: 0 };
let player = null;
let shelter = null;
let fire = null;
let boat = null;
let crabs = [];
let gameState = 'characterSelect';
let tutorialStep = 0;
let tutorialMessages = [
    "Welcome to Just Wise Love! Tap 'Male' or 'Female' to choose your character.",
    "Tap 'Gather Wood' to collect wood for a shelter.",
    "Gather 50 wood, then tap 'Build Shelter' and tap the canvas to place it.",
    "With a shelter built, tap 'Explore' to find berries for food.",
    "Crabs may attack your shelter. Move to them to catch them for food.",
    "Tap water areas to fish for more food. Keep food above 0 to survive!",
    "Keep the fire going by gathering wood. It burns 1 wood every 10 seconds.",
    "Gather 100 wood, then tap 'Build Boat' to escape and win!"
];

function preload() {
    // Fallback graphics (no images needed)
    this.textures.generate('player_male', { data: ['11', 'BB'], pixelWidth: 16 });
    this.textures.generate('player_female', { data: ['11', 'PP'], pixelWidth: 16 });
    this.textures.generate('shelter', { data: ['1111', '1RR1', '1RR1', '1111'], pixelWidth: 25 });
    this.textures.generate('fire', { data: ['11', 'YY'], pixelWidth: 16 });
    this.textures.generate('boat', { data: ['1111', '1BB1', '1BB1', '1111'], pixelWidth: 25 });
    this.textures.generate('crab', { data: ['11', 'GG'], pixelWidth: 16 });
}

function create() {
    // Background (beach and water)
    this.add.rectangle(400, 400, 800, 400, 0xEDC9AF); // Beach (sand)
    this.add.rectangle(400, 100, 800, 200, 0x1E90FF); // Water (top 200px)

    // Tutorial display
    this.tutorialText = document.getElementById('tutorial');
    this.updateTutorial();

    // Character selection
    document.getElementById('male').addEventListener('click', () => {
        gameState = 'playing';
        document.getElementById('character-select').style.display = 'none';
        document.getElementById('ui').style.display = 'block';
        spawnPlayer.call(this, 'male');
        tutorialStep++;
        this.updateTutorial();
    });
    document.getElementById('female').addEventListener('click', () => {
        gameState = 'playing';
        document.getElementById('character-select').style.display = 'none';
        document.getElementById('ui').style.display = 'block';
        spawnPlayer.call(this, 'female');
        tutorialStep++;
        this.updateTutorial();
    });

    // UI buttons
    document.getElementById('gatherWood').addEventListener('click', () => {
        if (gameState === 'playing') {
            resources.wood += 10;
            this.updateResourcesUI();
            if (tutorialStep === 1) {
                tutorialStep++;
                this.updateTutorial();
            }
        }
    });
    document.getElementById('buildShelter').addEventListener('click', () => {
        if (gameState === 'playing' && !shelter) {
            gameState = 'placingShelter';
        }
    });
    document.getElementById('explore').addEventListener('click', () => {
        if (gameState === 'playing' && shelter) {
            resources.food += 5; // Find berries
            this.updateResourcesUI();
            if (tutorialStep === 3) {
                tutorialStep++;
                this.updateTutorial();
            }
        }
    });
    document.getElementById('buildBoat').addEventListener('click', () => {
        if (gameState === 'playing' && resources.wood >= 100 && fire) {
            resources.wood -= 100;
            spawnBoat.call(this);
            this.updateResourcesUI();
        }
    });

    // Place shelter
    this.input.on('pointerdown', (pointer) => {
        if (gameState === 'placingShelter' && resources.wood >= 50) {
            const x = Math.floor(pointer.x / 50) * 50;
            const y = Math.max(200, Math.floor(pointer.y / 50) * 50); // Stay on beach
            if (!shelter) {
                resources.wood -= 50;
                shelter = this.physics.add.sprite(x, y, 'shelter').setOrigin(0);
                shelter.setData('health', 100);
                fire = this.physics.add.sprite(x + 25, y + 50, 'fire');
                gameState = 'playing';
                this.updateResourcesUI();
                this.time.addEvent({
                    delay: 10000,
                    callback: () => {
                        if (fire) {
                            resources.wood = Math.max(0, resources.wood - 1);
                            this.updateResourcesUI();
                            if (resources.wood === 0) {
                                fire.destroy();
                                fire = null;
                                if (tutorialStep === 6) {
                                    tutorialStep++;
                                    this.updateTutorial();
                                }
                            }
                        }
                    },
                    loop: true
                });
                if (tutorialStep === 2) {
                    tutorialStep++;
                    this.updateTutorial();
                }
            }
        } else if (gameState === 'playing' && pointer.y < 200 && shelter) { // Fishing in water
            resources.food += 3;
            this.updateResourcesUI();
            if (tutorialStep === 5) {
                tutorialStep++;
                this.updateTutorial();
            }
        }
    });

    // Crab spawns (every 10-20 seconds for testing, change to 300000-900000 for 5-15 min)
    this.time.addEvent({
        delay: Phaser.Math.Between(10000, 20000),
        callback: () => spawnCrab.call(this),
        loop: true
    });
}

function update() {
    if (gameState === 'playing' && player) {
        // Move player to tapped position
        if (this.input.activePointer.isDown) {
            this.physics.moveTo(player, this.input.activePointer.x, this.input.activePointer.y, player.getData('speed') * 60);
        }
        // Crab attacks and catching
        crabs.forEach(crab => {
            if (crab.active) {
                if (shelter && Phaser.Math.Distance.Between(crab.x, crab.y, shelter.x, shelter.y) < 50) {
                    shelter.setData('health', shelter.getData('health') - 5);
                    if (shelter.getData('health') <= 0) {
                        shelter.destroy();
                        shelter = null;
                        fire.destroy();
                        fire = null;
                        crabs.forEach(c => c.destroy());
                        crabs = [];
                        gameState = 'gameOver';
                        this.tutorialText.innerText = 'Game Over: Shelter destroyed! Refresh to restart.';
                    }
                } else if (Phaser.Math.Distance.Between(crab.x, crab.y, player.x, player.y) < 20) {
                    resources.food += 5;
                    crab.destroy();
                    crabs = crabs.filter(c => c !== crab);
                    this.updateResourcesUI();
                    if (tutorialStep === 4) {
                        tutorialStep++;
                        this.updateTutorial();
                    }
                }
            }
        });
        // Food consumption
        if (this.time.now % 15000 < 60) {
            resources.food = Math.max(0, resources.food - 1);
            this.updateResourcesUI();
            if (resources.food === 0) {
                gameState = 'gameOver';
                this.tutorialText.innerText = 'Game Over: You starved! Refresh to restart.';
            }
        }
        // Check win condition
        if (boat && Phaser.Math.Distance.Between(player.x, player.y, boat.x, boat.y) < 20) {
            gameState = 'won';
            this.tutorialText.innerText = 'You Win! You built a boat and escaped!';
        }
    }
}

function spawnPlayer(type) {
    player = this.physics.add.sprite(400, 400, `player_${type}`);
    player.setData('speed', 2);
}

function spawnCrab() {
    if (shelter && gameState === 'playing') {
        const crab = this.physics.add.sprite(Phaser.Math.Between(0, 800), 200, 'crab');
        crab.setData('speed', 1);
        this.physics.moveToObject(crab, shelter, crab.getData('speed') * 60);
        crabs.push(crab);
    }
}

function spawnBoat() {
    boat = this.physics.add.sprite(400, 150, 'boat').setOrigin(0);
    if (tutorialStep === 7) {
        this.tutorialText.innerText = 'Boat built! Move to the boat to escape and win!';
    }
}

function updateResourcesUI() {
    document.getElementById('resources').innerText = `Wood: ${resources.wood} | Food: ${resources.food}`;
}

function updateTutorial() {
    this.tutorialText.innerText = tutorialMessages[tutorialStep];
}
