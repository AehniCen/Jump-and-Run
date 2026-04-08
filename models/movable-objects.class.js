class MovableObjects extends DrawableObjects {

    speed = 0.5;

    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 0 % (mathematische Rest) 6; => 0, Rest  0
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
    moveRight(){
        this.x += 10;
    };
    moveLeft(){
        this.x -= 10;
    };
}