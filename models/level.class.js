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
        this.bottleCount = bottles.length;

        this.enemies = enemies;
        this.boss = boss;
        this.coins = coins;
        this.bottles = bottles;
        this.bossStartX = boss.x;
        this.bossStartY = boss.y;
    }
}