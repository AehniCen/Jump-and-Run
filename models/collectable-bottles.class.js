class CollectableBottles extends DrawableObjects {

    height = 100;
    y = 335;

    IMAGES = [
        'assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super();
        let randomIndex = Math.floor(Math.random() * this.IMAGES.length);
        let path = this.IMAGES[randomIndex];
        this.loadImage(path);
        this.width = this.height;
        this.x = 1500 + Math.random() * 9500;
    }
}