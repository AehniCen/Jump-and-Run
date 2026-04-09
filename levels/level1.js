const level1 = new Level(
    [
        new BackgroundObjects('assets/img/5_background/complete_background.png', -1440),
        new BackgroundObjects('assets/img/5_background/complete_background.png', 0),
        new BackgroundObjects('assets/img/5_background/complete_background.png', 1440)
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