const level1 = new Level(
    [
        new BackgroundObjects('assets/img/5_background/complete_background.png', -720),
        new BackgroundObjects('assets/img/5_background/complete_background.png', 0),
        new BackgroundObjects('assets/img/5_background/complete_background.png', 720),
        new BackgroundObjects('assets/img/5_background/complete_background.png', 1440),
        new BackgroundObjects('assets/img/5_background/complete_background.png', 2160),
        new BackgroundObjects('assets/img/5_background/complete_background.png', 2880),
        new BackgroundObjects('assets/img/5_background/complete_background.png', 3600),
        new BackgroundObjects('assets/img/5_background/complete_background.png', 4320),
        new BackgroundObjects('assets/img/5_background/complete_background.png', 5040)
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
        new CollectableObjects(),
        new CollectableObjects(),
        new CollectableObjects(),
        new CollectableObjects()
    ]
);