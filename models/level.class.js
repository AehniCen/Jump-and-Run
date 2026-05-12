class Level {
    backroundObjects;
    enemies;
    boss;
    coins;
    bottles;
    level_end_x = 9900;

    constructor(backgroundObjects, enemies, boss, coins, bottles){
        this.backgroundObjects = backgroundObjects;
        this.enemyCount = enemies.length;
        this.coinCount = coins.length;

        this.enemies = enemies;
        this.boss = boss;
        this.coins = coins;
        this.bottles = bottles;
        this.bossStartX = boss.x;
        this.bossStartY = boss.y;
    }

    restartLevel(){
        this.enemies = [];
        this.coins = [];

        for (let i = 0; i < this.enemyCount; i++) {
        if (i < 2) {
            this.enemies.push(new Chicken());
        } else {
            this.enemies.push(new BabyChicken());
        }
    }
        for (let i = 0; i < this.coinCount; i++) {
            this.coins.push(new CollectableCoins());
        };

        this.boss = new Endboss(this.bossStartX, this.bossStartY);
    };
}