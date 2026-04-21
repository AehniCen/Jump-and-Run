class Endboss extends MovableObjects {

    IMAGES_ALERT = [
        'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_WALKING =[
        'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ATTACKING_BEGIN = [
        'assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G16.png'
    ];
    IMAGE_JUMP_UP = 'assets/img/4_enemie_boss_chicken/3_attack/G17.png';
    IMAGE_JUMP_DOWN = 'assets/img/4_enemie_boss_chicken/3_attack/G18.png';
    IMAGES_ATTACKING_END = [
        'assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURTING = [
        'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DYING = [
        'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    width = 400;
    height = 400;
    y = 50;
    x = 300;
    speed = 15;
    world;
    currentImage;
    isAlerted = false;
    alertAnimationFinished = false;
    attackingAnimationFinished = false;
    attackingJumpAnimationFinished = false;
    state = 'alert';

    constructor() {
        super().loadImage('assets/img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages([
            this.IMAGE_JUMP_UP,
            this.IMAGE_JUMP_DOWN
        ]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACKING_BEGIN);
        this.loadImages(this.IMAGES_ATTACKING_END);
        this.loadImages(this.IMAGES_DYING);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_WALKING);
        this.applyGravity();
    }

    getMaxHeight(){
        return -200;
    }

    animate(){
        setInterval (() => {
            if (this.world.paused) return;

            switch (this.state) {
                case 'alert':
                    this.playAnimationOnce(this.IMAGES_ALERT);
                    if (this.alertAnimationFinished) {
                        this.setState('walk');
                    }
                    break;
                
                case 'walk':
                    this.playAnimation(this.IMAGES_WALKING);
                    this.moveLeft();
                    this.otherDirection = false;
                    break;
                
                case 'attack-begin':
                    this.playAnimationOnce(this.IMAGES_ATTACKING_BEGIN);
                    if (this.attackingBeginAnimationFinished) {
                        this.setState('jump-up');
                    }
                    break;

                case 'jump-up':
                    if (!this.isJumping) {
                        this.isJumping = true;
                        this.speedY = 20;
                    }
                    this.img = this.imageCache[this.IMAGE_JUMP_UP];
                    this.x += this.speed * 2
                    if (this.speedY < 0) {
                        this.speedY = 0; 
                        this.gravityPaused = true;
                        this.hoverStart = Date.now();
                        this.setState('hover');
                    }
                    break;

                case 'hover':
                    this.img = this.imageCache[this.IMAGE_JUMP_UP];
                    console.log(this.img);
                    
                    if (Date.now() - this.hoverStart > 500) {
                        this.gravityPaused = false;
                        this.setState('jump-down');
                    }
                    break;

                case 'jump-down':
                    this.img = this.imageCache[this.IMAGE_JUMP_DOWN];
                    this.x -= this.speed * 4;
                    if (!this.isAboveGround()) {
                        this.setState('jump-end');
                    }
                    break;

                case 'jump-end':
                    this.img = this.imageCache[this.IMAGE_JUMP_UP];
                    this.x -= this.speed * 2;
                    if (!this.jumpEndStarted) {
                        this.jumpEndStarted = Date.now();
                    }
                    if (Date.now() - this.jumpEndStarted > 300) {
                        this.isJumping = false;
                        this.jumpEndStarted = null;
                        this.setState('attack-end');
                    }
                    break;

                case 'attack-end':
                    this.playAnimationOnce(this.IMAGES_ATTACKING_END);
                    if (this.attackingEndAnimationFinished) {
                        this.setState('walk')
                    }
                    break;
            }
        }, 1000 / 6)
    };

    setState(newState) {
        this.state = newState;

        this.alertAnimationFinished = false;
        this.attackingBeginAnimationFinished = false;
        this.attackingJumpAnimationFinished = false;
        this.attackingEndAnimationFinished = false;

        this.currentImage = 0;
        this.currentAnimation = null;
    }
}