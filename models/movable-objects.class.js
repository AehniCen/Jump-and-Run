class MovableObjects extends DrawableObjects {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 3;
    energy = 100;
    lastHit = 0;
    currentImage = 0;
    gravityPaused = false;

    applyGravity() {

        setInterval(() => {
            if (this.gravityPaused) return;
            let maxHeight = this.getMaxHeight();
            if (this.isAboveGround() || this.speedY > 0) {
                if (this.y - this.speedY < maxHeight) {
                    this.y = this.maxHeight;
                    this.speedY = 0;
                } else {
                    this.y -= this.speedY;
                }
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    };

    isAboveGround(){
        if (this instanceof ThrowableObjects) {
            return this.y < 335;
        } 
        if (this instanceof Endboss) {
            return this.y < 50;
        }
        else {
        return this.y < 115;
        };
    };

    playAnimation(images){
        let i = this.currentImage % images.length; // let i = 0 % (mathematische Rest) 6; => 0, Rest  0
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    };

    playAnimationOnce(images, finishFlag) {
        if (this.currentAnimation !== images) {
            this.currentImage = 0;
            this.currentAnimation = images;
        }
        if (this.currentImage < images.length) {
            let path = images[this.currentImage];
            this.img = this.imageCache[path];
            this.currentImage++;
        } else if (this.currentImage >= images.length) {
            let lastImage = images[images.length - 1];
            this.img = this.imageCache[lastImage];
            if (finishFlag) {
                this[finishFlag] = true;
            }
        }
    };

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
        this.lastActionTime = new Date().getTime();
    };

    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
        this.lastActionTime = new Date().getTime();
    };

    jump(){
        this.speedY = 30;
        this.lastActionTime = new Date().getTime();
    };

    dying(){
    if (!this.isDyingStarted) {
        this.speedY = 40;
        this.acceleration = 5;
        this.isDyingStarted = true;
    }
}

    hit(){
        this.energy -= this.damage;
        if (this instanceof Endboss) {
            this.speedY = 0;
        } else {
            this.speedY = 35;
        }
        if (this.energy < 0) {
            this.energy = 0
        } else {
            this.lastHit = new Date().getTime();
        }       
    };

    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit; //Difference in Milliseconds
        timepassed = timepassed / 1000; //Difference in Seconds
        return timepassed < 1;
    };

    isDead() {
        return this.energy == 0;
    };

    isColliding(mo){
        return this.x + this.width > mo.x &&
         this.y + this.height > mo.y &&
         this.x < mo.x &&
         this.y < mo.y + mo.height
    };

    isAttacking(mo) {
    return this.x + this.width > mo.x &&
           this.x < mo.x + mo.width &&
           this.y + this.height <= mo.y + 60 &&     // jetzt berührt er ihn
           this.speedY < -12;
    };

    collectCoins(coin) {
        coin.x -= this.speed;
        console.log('jup');
        
    };
} 