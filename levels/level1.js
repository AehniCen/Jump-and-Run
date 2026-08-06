function createCoinArc(startX, baseY, amount) {
        let coins = [];
        for (let i = 0; i < amount; i++) {
            let x = startX + i * 100;
            let y = baseY - Math.sin(i / (amount - 1) * Math.PI) * 100;
            coins.push(new CollectableCoins(x, y));
        }
        return coins;
    }

function createCoins() {
    return [
        ...createCoinArc(220, 110, 3),
        ...createCoinArc(1000, 110, 5),
        ...createCoinArc(2200, 110, 5),
        ...createCoinArc(3000, 110, 3),
        ...createCoinArc(4500, 110, 3),
        ...createCoinArc(6400, 110, 5),
        ...createCoinArc(8700, 110, 5),
        ...createCoinArc(9500, 110, 3)
    ];
};

function createEnemies() {
    return [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken()
    ]
};

function createBottles() {
    return [
        new CollectableBottles(),
        new CollectableBottles(),
        new CollectableBottles(),
        new CollectableBottles(),
        new CollectableBottles(),
        new CollectableBottles(),
        new CollectableBottles(),
        new CollectableBottles(),
        new CollectableBottles(),
        new CollectableBottles()
    ]
};

function createLevel1() {
    return new Level(
        [
            new BackgroundObjects('assets/img/5_background/complete_background.png', -1440),
            new BackgroundObjects('assets/img/5_background/complete_background.png', 0),
            new BackgroundObjects('assets/img/5_background/complete_background.png', 1440),
            new BackgroundObjects('assets/img/5_background/complete_background.png', 2880),
            new BackgroundObjects('assets/img/5_background/complete_background.png', 4320),
            new BackgroundObjects('assets/img/5_background/complete_background.png', 5760),
            new BackgroundObjects('assets/img/5_background/complete_background.png', 7200),
            new BackgroundObjects('assets/img/5_background/complete_background.png', 8640),
            new BackgroundObjects('assets/img/5_background/complete_background.png', 10080)
        ],
        createEnemies(),
        new Endboss(),
        createCoins(),
        createBottles()
        );
};

let level1 = createLevel1();