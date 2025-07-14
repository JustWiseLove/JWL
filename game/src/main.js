import GameScene from './scenes/GameScene.js';

const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    scene: GameScene
};

const game = new Phaser.Game(config);
