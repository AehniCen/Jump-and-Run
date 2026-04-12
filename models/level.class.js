class Level {
    backroundObjects;
    enemies;
    coins;
    level_end_x = 8700;

    constructor(backgroundObjects, enemies, coins){
        this.backgroundObjects = backgroundObjects;
        this.enemyCount = enemies.length;
        this.coinCount = coins.length;

        this.enemies = enemies;
        this.coins = coins;
    }

    restartLevel(){
        this.enemies = [];
        this.coins = [];

        for (let i = 0; i < this.enemyCount; i++) {
            this.enemies.push(new Chicken());
        };

        for (let i = 0; i < this.coinCount; i++) {
            this.coins.push(new CollectableObjects());
        };
    };
}