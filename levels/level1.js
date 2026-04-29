const level1 = new Level(
    [
        new BackgroundObjects('assets/img/5_background/complete_background.png', -3800),
        new BackgroundObjects('assets/img/5_background/complete_background.png', 0),
        new BackgroundObjects('assets/img/5_background/complete_background.png', 3800),
        new BackgroundObjects('assets/img/5_background/complete_background.png', 7200),
        new BackgroundObjects('assets/img/5_background/complete_background.png', 11000),
        new BackgroundObjects('assets/img/5_background/complete_background.png', 14800),
        new BackgroundObjects('assets/img/5_background/complete_background.png', 18600),
        new BackgroundObjects('assets/img/5_background/complete_background.png', 22400),
        new BackgroundObjects('assets/img/5_background/complete_background.png', 26200)
    ],
    [
        new Chicken(),
        new Chicken(),
        new Chicken()
        // new BabyChicken(),
        // new BabyChicken(),
        // new BabyChicken(),
    ],
        new Endboss(),
    [
        new CollectableObjects(),
        new CollectableObjects(),
        new CollectableObjects(),
        new CollectableObjects()
    ]
);