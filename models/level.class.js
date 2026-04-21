class Level {
    backroundObjects;
    enemies;
    boss;
    coins;
    level_end_x = 8700;

    constructor(backgroundObjects, enemies, boss, coins){
        this.backgroundObjects = backgroundObjects;
        this.enemyCount = enemies.length;
        this.coinCount = coins.length;

        this.enemies = enemies;
        this.boss = boss;
        this.coins = coins;
        this.bossStartX = boss.x;
        this.bossStartY = boss.y;
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

        this.boss = new Endboss(this.bossStartX, this.bossStartY);
    };
}