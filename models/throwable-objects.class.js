class ThrowableObjects extends MovableObjects {
    IMAGES_ROTATION = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]

    IMAGES_SPLASH = [
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    width = 80;
    height = 80;
    splashSound = new Audio('assets/audio/bottle-smash.mp3');
    world;
    state;

    constructor(x, y){
        super().loadImage('assets/img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y =y;
    }

    getMaxHeight(){
        return -150;
    };

    throw(){
        if (!this.world.gameOver) {
            this.speedY = 30;
            this.applyGravity();
            this.rotationInterval = setInterval(() => {
                if (!this.splashed) {
                    this.playAnimation(this.IMAGES_ROTATION);
                    this.state = 'flying';
                }
                if (this.splashAnimationFinished) {
                    clearInterval(this.rotationInterval);
                    clearInterval(this.moveInterval);
                    this.state = 'done';
                    console.log(this.state);
                }
            }, 120);
            this.moveInterval = setInterval(() => {
                if (!this.splashed) {
                    this.x += 10;
                }
            }, 25);
            this.splashInterval = setInterval(() =>{
                if (this.y >= 335 && !this.splashed) {
                    this.getSplashAnimation();
                    this.state = 'splashed';
                }
            }, 30)
        }
    };

    getSplashAnimation(){
        this.playAnimationOnce(this.IMAGES_SPLASH, 'splashAnimationFinished');
        this.playSplashSound();
        this.splashed = true;
    };

    playSplashSound(){
        if (!this.splashed) {
            this.splashSound.play()
            this.splashSound.volume = 0.5;
            this.splashSound.playbackRate = 2;
            console.log(this.splashAnimationFinished);
            
        }
    }
}