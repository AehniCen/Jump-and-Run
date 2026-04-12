class Chicken extends MovableObjects {

    x = 480;
    y = 330;
    height = 100;
    currentImage = 0;
    world;
    damage;

    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    constructor(){
        super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 300 + Math.random() * 700;
        this.speed = 0.15 + Math.random() * 0.35;
    }

    getPositionInterval(){
        setInterval(() => {
            if(!this.world.paused && !this.isDead())
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);
    };

    getWalkingInterval() {
        setInterval(() => {
            if(!this.world.paused && !this.isDead())
            this.playAnimation(this.IMAGES_WALKING);
        }, 120);
    };

    getDeadImage() {
        if (!this.world.paused && this.isDead()) {
            this.loadImage('assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
        }
    };

    
    animate(){
        this.getDeadImage();
        this.getPositionInterval();
        this.getWalkingInterval();
    };
}