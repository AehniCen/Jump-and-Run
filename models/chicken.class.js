class Chicken extends MovableObjects {

    x = 480;
    y = 330;
    height = 100;
    width = 100;
    currentImage = 0;
    world;
    static walkingSound = new Audio('assets/audio/chicken-sound-walking.mp3');
    static aliveCount = 0;
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
        this.x = 600 + Math.random() * 10500;
        this.speed = 0.35 + Math.random() * 0.35;
        this.damage = 0;
        Chicken.aliveCount++;
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
            if(this.world.paused || this.isDead()) {
                this.pauseWalkingSound();
                return;
            } else {
                this.playAnimation(this.IMAGES_WALKING);
                this.playWalkingSound();
            }
        }, 120);
    }

    getDeadImage() {
        if (this instanceof BabyChicken && this.isDead() && !this.world.paused && !this.alreadyDead) {
            this.loadImage('assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png');
            this.playDyingSound();
        }
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

    playWalkingSound() {
        Chicken.walkingSound.volume = 0.5;
        if (Chicken.walkingSound.paused && !this.world.paused) {
            Chicken.walkingSound.loop = true;
            Chicken.walkingSound.play();
        }
    };

    pauseWalkingSound(){
        Chicken.walkingSound.pause();
    }

    playDyingSound(){
        if (this.dyingSound.paused) {
            this.dyingSound.playbackRate = 1;
            this.dyingSound.volume = 0.2;
            this.dyingSound.currentTime = 0;
            this.dyingSound.play();
            this.alreadyDead = true;
            Chicken.aliveCount--;

            if (Chicken.aliveCount <= 0) {
                Chicken.walkingSound.pause();
                Chicken.walkingSound.currentTime = 0;
            }
        }
    };

    pauseDyingSound(){
        this.dyingSound.pause();
    }
}