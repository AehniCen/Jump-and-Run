class Chicken extends MovableObjects {

    x = 480;
    y = 330;
    height = 100;
    currentImage = 0;
    world;
    damage;
    walkingSound = new Audio('assets/audio/chicken-sound-walking.mp3');
    dyingSound = new Audio('assets/audio/chicken-attack-sound-2.mp3');
    alreadyDead = false;

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
            if(!this.world.paused && !this.isDead()){
                this.playAnimation(this.IMAGES_WALKING);
                this.playWalkingSound();
            }
        }, 120);
    };

    getDeadImage() {
        if (this.isDead() && !this.world.paused && !this.alreadyDead) { 
            this.loadImage('assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
            this.playDyingSound();
        }
    };

    
    animate(){
        this.getDeadImage();
        this.getPositionInterval();
        this.getWalkingInterval();
    };

    playWalkingSound(){
        if (this.walkingSound.paused && !this.world.paused) {
            this.walkingSound.playbackRate = 1;
            this.walkingSound.volume = 0.2;
            this.walkingSound.currentTime = 0;
            this.walkingSound.play();
        } else {
            this.walkingSound.pause();
        }
    };

    playDyingSound(){
        if (this.dyingSound.paused) {
            this.dyingSound.playbackRate = 1;
            this.dyingSound.volume = 0.2;
            this.dyingSound.currentTime = 0;
            this.dyingSound.play();
            this.alreadyDead = true;
        }
    };

    pauseDyingSound(){
        this.dyingSound.pause();
    }
}