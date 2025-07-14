import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        this.load.image('barn', 'assets/barn.png');
        this.load.image('sheep', 'assets/sheep.png');
        this.load.image('wolf', 'assets/wolf.png');
    }

    create() {
        const grid = [];
        for (let x = 0; x < 20; x++) {
            grid[x] = [];
            for (let y = 0; y < 20; y++) {
                grid[x][y] = null;
            }
        }

        this.input.on('pointerdown', (pointer) => {
            const gridX = Math.floor(pointer.x / 50);
            const gridY = Math.floor(pointer.y / 50);
            if (!grid[gridX][gridY]) {
                grid[gridX][gridY] = this.add.sprite(gridX * 50, gridY * 50, 'barn').setOrigin(0);
            }
        });

        this.time.addEvent({
            delay: Phaser.Math.Between(300000, 900000), // 5-15 min
            callback: () => {
                const wolf = this.add.sprite(Phaser.Math.Between(0, 1000), Phaser.Math.Between(0, 600), 'wolf');
                // Add wolf movement logic
            },
            loop: true
        });
    }
}
