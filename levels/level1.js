const level1 = new Level(
    [
        new BackgroundObjects('assets/img/5_background/complete_background.png', -1440),
        new BackgroundObjects('assets/img/5_background/complete_background.png', 0),
        new BackgroundObjects('assets/img/5_background/complete_background.png', 1440),
        new BackgroundObjects('assets/img/5_background/complete_background.png', 2880),
        new BackgroundObjects('assets/img/5_background/complete_background.png', 4320),
        new BackgroundObjects('assets/img/5_background/complete_background.png', 5760),
        new BackgroundObjects('assets/img/5_background/complete_background.png', 6220),
        new BackgroundObjects('assets/img/5_background/complete_background.png', 7660),
        new BackgroundObjects('assets/img/5_background/complete_background.png', 9100)
    ],
    [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ],
    [
        new CollectableObjects(),
        new CollectableObjects(),
        new CollectableObjects(),
        new CollectableObjects()
    ]
);