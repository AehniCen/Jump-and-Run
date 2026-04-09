class MovableObjects extends DrawableObjects {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 0.12;
    energy = 100;
    lastHit = 0;

    applyGravity(){
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration * 0.5;
            }
            if (!this.isAboveGround()) {
                this.canJump = true;
            }
        }), 1000/25;
    };

    isAboveGround(){
        if (this instanceof ThrowableObjects) {
            return true;
        } else {
        return this.y < 150;
        };
    }


    playAnimation(images){
        let i = this.currentImage % images.length; // let i = 0 % (mathematische Rest) 6; => 0, Rest  0
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    };

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    };

    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    };

    jump(){
        this.speedY = 5;
    };

    hit(){
        this.energy -= 5;
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

    isColliding(mo){
        return this.x + this.width > mo.x &&
         this.y + this.height > mo.y &&
         this.x < mo.x &&
         this.y < mo.y + mo.height
    };
} 