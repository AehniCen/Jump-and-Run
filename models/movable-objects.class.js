class MovableObjects extends DrawableObjects {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 0.1;
    canJump = false;

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
        return this.y < 115;
    };


    playAnimation(images){
        let i = this.currentImage % images.length; // let i = 0 % (mathematische Rest) 6; => 0, Rest  0
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    };

    moveRight() {
        this.x += 10;
        this.otherDirection = false;
    };

    moveLeft() {
        this.x -= 10;
        this.otherDirection = true;
    };

    jump(){
        this.speedY = 5;
    };
} 