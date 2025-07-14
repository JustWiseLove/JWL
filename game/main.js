const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    }
};

const game = new Phaser.Game(config);

let resources = { wool: 100, wood: 100 };
let grid = [];
let sheep = [];
let wolves = [];
let selectedBuilding = null;

function preload() {
    this.load.image('barn', 'barn.png');
    this.load.image('turret', 'turret.png');
    this.load.image('sheep_builder', 'sheep_builder.png');
    this.load.image('sheep_defender', 'sheep_defender.png');
    this.load.image('wolf', 'wolf.png');
}

function create() {
    // Initialize 24x12 grid (50px cells)
    for (let x = 0; x < 24; x++) {
        grid[x] = [];
        for (let y = 0; y < 12; y++) {
            grid[x][y] = null;
        }
    }

    // Resource generation
    this.updateResourcesUI = () => {
        document.getElementById('resources').innerText = `Wool: ${resources.wool} | Wood: ${resources.wood}`;
    };
    this.updateResourcesUI();
    this.time.addEvent({
        delay: 5000,
        callback: () => {
            resources.wool += 5;
            resources.wood += 5;
            this.updateResourcesUI();
        },
        loop: true
    });

    // Building and sheep buttons
    document.getElementById('buildBarn').addEventListener('click', () => {
        selectedBuilding = { type: 'barn', cost: { wood: 50 } };
    });
    document.getElementById('buildTurret').addEventListener('click', () => {
        selectedBuilding = { type: 'turret', cost: { wood: 30 } };
    });
    document.getElementById('spawnSheep').addEventListener('click', () => {
        if (resources.wool >= 20) {
            resources.wool -= 20;
            spawnSheep.call(this);
            this.updateResourcesUI();
        }
    });

    // Building placement
    this.input.on('pointerdown', (pointer) => {
        if (selectedBuilding) {
            const gridX = Math.floor(pointer.x / 50);
            const gridY = Math.floor(pointer.y / 50);
            if (canPlaceBuilding(gridX, gridY) && canAfford(selectedBuilding.cost)) {
                placeBuilding.call(this, gridX, gridY, selectedBuilding.type);
                deductResources(selectedBuilding.cost);
                this.updateResourcesUI();
            }
        }
    });

    // Wolf spawns (every 10-20 seconds for testing, change to 300000-900000 for 5-15 min)
    this.time.addEvent({
        delay: Phaser.Math.Between(10000, 20000),
        callback: () => spawnWolf.call(this),
        loop: true
    });
}

function update() {
    sheep.forEach(s => {
        if (s.active) updateSheep.call(this, s);
    });
    wolves.forEach(w => {
        if (w.active) updateWolf.call(this, w);
    });
}

function canPlaceBuilding(x, y) {
    return x >= 0 && x < 24 && y >= 0 && y < 12 && !grid[x][y];
}

function canAfford(cost) {
    return Object.keys(cost).every(resource => resources[resource] >= cost[resource]);
}

function deductResources(cost) {
    Object.keys(cost).forEach(resource => {
        resources[resource] -= cost[resource];
    });
}

function placeBuilding(x, y, type) {
    const sprite = this.physics.add.sprite(x * 50, y * 50, type).setOrigin(0);
    sprite.type = type;
    sprite.setData('health', type === 'barn' ? 100 : 50);
    if (type === 'turret') {
        sprite.setData('range', 100);
        sprite.setData('damage', 5);
        sprite.setData('cooldown', 0);
    }
    grid[x][y] = sprite;
}

function spawnSheep() {
    const role = Phaser.Math.RND.pick(['builder', 'defender']);
    const sprite = this.physics.add.sprite(50, 50, `sheep_${role}`);
    sprite.type = 'sheep';
    sprite.setData('role', role);
    sprite.setData('health', 30);
    sprite.setData('speed', role === 'defender' ? 2.5 : 2);
    sprite.setData('target', null);
    sheep.push(sprite);
    this.physics.add.overlap(sprite, wolves, (s, w) => handleAttack.call(this, w, s));
}

function spawnWolf() {
    const sprite = this.physics.add.sprite(Phaser.Math.Between(0, 1200), Phaser.Math.Between(0, 600), 'wolf');
    sprite.type = 'wolf';
    sprite.setData('health', 50);
    sprite.setData('speed', 2);
    sprite.setData('damage', 10);
    sprite.setData('target', findNearestTarget.call(this, sprite));
    wolves.push(sprite);
    this.physics.add.overlap(sprite, sheep, (w, s) => handleAttack.call(this, w, s));
}

function findNearestTarget(wolf) {
    let nearest = null;
    let minDist = Infinity;
    sheep.forEach(s => {
        if (s.active) {
            const dist = Phaser.Math.Distance.Between(wolf.x, wolf.y, s.x, s.y);
            if (dist < minDist) {
                minDist = dist;
                nearest = s;
            }
        }
    });
    grid.forEach(row => {
        row.forEach(b => {
            if (b && b.active) {
                const dist = Phaser.Math.Distance.Between(wolf.x, wolf.y, b.x, b.y);
                if (dist < minDist) {
                    minDist = dist;
                    nearest = b;
                }
            }
        });
    });
    return nearest;
}

function updateSheep(sheep) {
    const role = sheep.getData('role');
    if (role === 'builder') {
        if (!sheep.getData('target')) {
            for (let x = 0; x < 24; x++) {
                for (let y = 0; y < 12; y++) {
                    if (grid[x][y] && grid[x][y].type === 'barn' && grid[x][y].getData('health') < 100) {
                        sheep.setData('target', grid[x][y]);
                        break;
                    }
                }
            }
        }
    } else if (role === 'defender') {
        if (!sheep.getData('target')) {
            const wolf = wolves.find(w => w.active);
            if (wolf) sheep.setData('target', wolf);
        }
    }
    const target = sheep.getData('target');
    if (target && target.active) {
        this.physics.moveToObject(sheep, target, sheep.getData('speed') * 60);
        if (role === 'builder' && Phaser.Math.Distance.Between(sheep.x, sheep.y, target.x, target.y) < 20) {
            target.setData('health', Math.min(target.getData('health') + 1, 100));
        } else if (role === 'defender' && Phaser.Math.Distance.Between(sheep.x, sheep.y, target.x, target.y) < 20) {
            handleAttack.call(this, sheep, target);
        }
    }
}

function updateWolf(wolf) {
    if (!wolf.getData('target') || !wolf.getData('target').active) {
        wolf.setData('target', findNearestTarget.call(this, wolf));
    }
    const target = wolf.getData('target');
    if (target) {
        this.physics.moveToObject(wolf, target, wolf.getData('speed') * 60);
        grid.forEach(row => {
            row.forEach(b => {
                if (b && b.active && b.type === 'turret' && Phaser.Math.Distance.Between(b.x, b.y, wolf.x, wolf.y) < b.getData('range')) {
                    if (b.getData('cooldown') <= 0) {
                        handleAttack.call(this, b, wolf);
                        b.setData('cooldown', 30);
                    }
                    b.setData('cooldown', b.getData('cooldown') - 1);
                }
            });
        });
    }
}

function handleAttack(attacker, target) {
    if (attacker.active && target.active) {
        const damage = attacker.getData('damage') || 5;
        const health = target.getData('health') - damage;
        target.setData('health', health);
        if (health <= 0) {
            target.destroy();
            if (target.type === 'sheep') {
                sheep = sheep.filter(s => s !== target);
            } else if (target.type === 'wolf') {
                wolves = wolves.filter(w => w !== target);
            } else {
                const x = Math.floor(target.x / 50);
                const y = Math.floor(target.y / 50);
                grid[x][y] = null;
            }
        }
    }
}
