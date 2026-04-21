class MovableObjects extends DrawableObjects {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 3;
    energy = 100;
    lastHit = 0;
    currentImage = 0;

    applyGravity() {
        const maxHeight = -150;

        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                if (this.y - this.speedY < maxHeight) {
                    this.y = maxHeight;
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
        } else {
        return this.y < 115;
        };
    };

    playAnimation(images){
        let i = this.currentImage % images.length; // let i = 0 % (mathematische Rest) 6; => 0, Rest  0
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    };

    playAnimationOnce(images) {
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
            if (images === this.IMAGES_DYING) {
                this.isDeadAnimationFinished = true;
            }
            if (images === this.IMAGES_ENDSCREEN_GAMEOVER) {
                this.isGameOverAnimationFinished = true;
            }
            if (images === this.IMAGES_ALERT) {
                this.alertAnimationFinished = true;    
            }
            if (images === this.IMAGES_SPLASH) {
                this.splashAnimationFinished = true;
            }
            if (images === this.IMAGES_ATTACKING) {
                this.attackingAnimationFinished = true;
            }
            if (images === this.IMAGES_ATTACKING_JUMP) {
                this.attackingJumpAnimationFinished = true;
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
        this.speedY = 35;
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