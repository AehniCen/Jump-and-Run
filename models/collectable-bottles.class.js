class CollectableBottles extends MovableObjects {

    height = 100;
    y = 335;
    speed = 10;
    isAttracted = false;
    isCollected = false;
    collectingSound = new Audio('assets/audio/coin-collected.mp3');

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

    collect(collectedBottles) {
        this.isAttracted = true;
        this.collectedBottles = collectedBottles;
        this.getCollectingSound();
    } 
    
    getCollectingSound(){
        this.collectingSound.play();
    }

    update() {
        if (this.isAttracted && this.collectedBottles) {
            this.y -= this.speed;
            this.x = this.collectedBottles.x + 80;
            if (this.width > 0 && this.height > 0) {
                this.width -= this.speed / 2;
                this.height -= this.speed / 2;
            }
        }
    }
}