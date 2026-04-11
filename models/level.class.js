class Level {
    backroundObjects;
    enemies;
    coins;
    level_end_x = 8700;

    constructor(backgroundObjects, enemies, coins){
        this.backgroundObjects = backgroundObjects;
        this.enemies = enemies;
        this.coins = coins;
    }
}