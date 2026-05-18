function createCoinArc(startX, baseY, amount) {
        let coins = [];
        for (let i = 0; i < amount; i++) {
            let x = startX + i * 100;
            let y = baseY - Math.sin(i / (amount - 1) * Math.PI) * 100;
            coins.push(new CollectableCoins(x, y));
        }
        return coins;
    }

const level1 = new Level(
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
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken()
    ],
        new Endboss(),
    [
        ...createCoinArc(220, 100, 3),
        ...createCoinArc(1000, 100, 5),
        ...createCoinArc(2200, 100, 5),
        ...createCoinArc(3000, 100, 3),
        ...createCoinArc(4500, 100, 3),
        ...createCoinArc(6400, 100, 5),
        ...createCoinArc(8700, 100, 5),
        ...createCoinArc(9500, 100, 3)
    ],
    [
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
);