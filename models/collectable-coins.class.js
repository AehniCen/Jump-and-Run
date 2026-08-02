class CollectableCoins extends MovableObjects {

    height = 180;
    width = 180;
    speed = 10;
    isAttracted = false;
    isCollected = false;
    collectingSound = new Audio('assets/audio/coin-collected.mp3');
    world;

    IMAGES = [
        'assets/img/8_coin/coin_1.png',
        'assets/img/8_coin/coin_2.png'
    ]

    constructor(x, y){

        console.log("constructor", x, y);
        
        super().loadImage('assets/img/8_coin/coin_2.png');
        this.loadImages(this.IMAGES);
        this.startX = x;
        this.startY = y;
        this.x = x;
        this.y = y;
        this.baseY = y;
        this.animate()
    }

    animate(){
        setInterval(() => {
            if (!this.world) {
                return;
            }
            if (!this.isCollected && !this.world.paused) {
                this.playAnimation(this.IMAGES);
            }
        }, 500);
        setInterval(() => {
            if (!this.world) {
                return;
            }
            if (!this.isCollected && !this.world.paused) {
                this.y = this.baseY + Math.sin(Date.now() / 200) * 5;
            }
        }, 1000 / 60);
    }

    collect(collectedCoins) {
        this.isAttracted = true;
        this.collectedCoins = collectedCoins;
        this.getCollectingSound();
    }  

    getCollectingSound(){
        this.collectingSound.play();
        this.collectingSound.volume = 0.3;
    }

    update() {
        if (this.isAttracted && this.collectedCoins) {
            this.y -= this.speed;
            this.x = this.collectedCoins.x + 80;
            if (this.width > 0 && this.height > 0) {
                this.width -= this.speed / 2;
                this.height -= this.speed / 2;
            }
        }
    }

    reset() {

        console.log(this);

    console.log(
        "startX:", this.startX,
        "startY:", this.startY,
        "x:", this.x,
        "y:", this.y
    );
        
        this.x = this.startX;
        this.y = this.startY;
        this.baseY = this.startY;

        this.width = 180;
        this.height = 180;

        this.isCollected = false;
        this.isAttracted = false;
    }
}