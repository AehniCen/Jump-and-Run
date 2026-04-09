class CollectableObjects extends MovableObjects {

    height = 240;
    y = 270
    speed = 10;
    isAttracted = false;
    isCollected = false;

    constructor(){
        super().loadImage('assets/img/8_coin/coin_2.png');
        this.width = this.height;
        this.x = 180 + Math.random() * 300;
    }

    collect(collectedCoins) {
        this.isAttracted = true;
        this.collectedCoins = collectedCoins;
    }  

    update() {
    if (this.isAttracted && this.collectedCoins) {
        setInterval(() => {
            let ax = this.collectedCoins - this.world.camera_x;
            let dx = ax - this.x;
            let dy = this.collectedCoins.y - this.y;
            this.y -= this.speed;
            this.x = this.collectedCoins.x + 80;
            if (this.width > 0 && this.height > 0) {
                this.width -= this.speed / 2;
                this.height -= this.speed / 2;
            }
        }, 1000/50);
    }
    }
}