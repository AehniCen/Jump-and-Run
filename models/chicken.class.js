class Chicken extends MovableObjects {

    x = 480;
    y = 330;
    height = 100;
    currentImage = 0;

    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    constructor(){
        super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        // this.x = 300 + Math.random() * 300;
        // this.speed = 0.15 + Math.random() * 0.35;
        // this.animate();
    }

    animate(){
        setInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 120);
    }
}