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
        'assets/img/4_enemie_boss_chicken/4_hurt/G23.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G23.png',
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
    state = 'alert';
    damage = 34;
    attackingSound = new Audio('assets/audio/rooster_attack.mp3');
    alertSound = new Audio('assets/audio/rooster_alarm.mp3');

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
        return -100;
    }

    animate(){
        setInterval (() => {
            if (this.world.paused) return;

            switch (this.state) {
                case 'alert':
                    this.getAlertAnimation();
                    break;
                
                case 'walk':
                    this.getWalkingAnimation();
                    break;
                
                case 'attack-begin':
                    this.getAttackAnimation();
                    break;

                case 'jump-up':
                    this.getJumpUpAnimation();
                    break;

                case 'hover':
                    this.getHoverAnimation();
                    break;

                case 'jump-down':
                    this.getJumpDownAnimation();
                    break;

                case 'jump-end':
                    this.getJumpEndAnimation();
                    break;

                case 'attack-end':
                    this.getAttackEndAnimation();
                    break;

                case 'hurt':
                    this.getHurtAnimation();
                    break;

                case 'dead':
                    this.getDeadAnimation();
                    break;
                case 'defeated':
                    break;
            }
        }, 1000 / 10)
    };

    setState(newState) {
        this.state = newState;
        this.alertAnimationFinished = false;
        this.attackingBeginAnimationFinished = false;
        this.attackingJumpAnimationFinished = false;
        this.attackingEndAnimationFinished = false;
        this.hurtingAnimationFinished = false;
        this.isDeadAnimationFinished = false;
        this.currentImage = 0;
        this.currentAnimation = null;
    };

    getWalkingAnimation(){
        this.playAnimation(this.IMAGES_WALKING);
        this.moveLeft();
        this.otherDirection = false;
    };

    getAlertAnimation(){
        this.playAnimationOnce(this.IMAGES_ALERT, 'alertAnimationFinished');
        this.getAlertSound();
        if (this.alertAnimationFinished) {            
            this.setState('walk');
        }
    };

    getAlertSound(){
        if (this.alertPlayed) return;     
        this.alertPlayed = true;
        setTimeout(() => {
            this.alertSound.play();
            this.alertSound.playbackRate = 1;
        }, 400);
    }

    getHurtAnimation(){
        this.playAnimationOnce(this.IMAGES_HURTING, 'hurtingAnimationFinished');
        if (this.hurtingAnimationFinished && !this.isDead()) {
            this.setState('walk');
        } else if (this.isDead()){
            this.setState('dead');
        }
    };

    getAttackAnimation(){
        this.playAnimationOnce(this.IMAGES_ATTACKING_BEGIN, 'attackingBeginAnimationFinished');
        if (this.attackingBeginAnimationFinished) {
            this.setState('jump-up');
        }
    };

    getAttackEndAnimation(){
        this.playAnimationOnce(this.IMAGES_ATTACKING_END, 'attackingEndAnimationFinished');
        this.getAttackSound();
        if (this.attackingEndAnimationFinished) {
            this.setState('walk')
        }
    };

    getAttackSound(){
        if (this.attackPlayed) return;
        this.attackPlayed = true;
        this.attackingSound.play();
    };

    getFrameRate(frames, duration){
        const elapsedJump = Date.now() - this.startTime;
        const progress = Math.min(1, elapsedJump / duration);
        const frameIndex = Math.min(
            frames.length - 1,
            Math.floor(progress * frames.length)
        );
        this.img = this.imageCache[frames[frameIndex]];
        if (elapsedJump === duration) {
            this.animationFinished = true;
        }
    }
    
    getJumpingFrame(){
        const frames = [
            this.IMAGE_JUMP_UP,
            this.IMAGE_JUMP_DOWN,
            this.IMAGE_JUMP_UP,
            this.IMAGE_JUMP_DOWN
        ];  
        const duration = 600;
        this.getFrameRate(frames, duration);
    };

    getJumpUpAnimation(){
        if (!this.isJumping) {
            this.isJumping = true;
            this.speedY = 15;
            this.maxJumpSpeed = this.speedY;
            this.startTime = Date.now();
        }
        this.getJumpingFrame();
        if (this.speedY <= 0) {
            this.gravityPaused = true;
            this.hoverStart = Date.now();
            this.startTime = null;
            this.setState('hover');
        }
        this.x += this.speed;
    };

    getDyingFrame(){
        const frames = this.IMAGES_DYING;
        const duration = 600;
        this.getFrameRate(frames, duration);
    }

    getDeadAnimation(){
        if (!this.isDying) {
            this.isDying = true;
            this.speedY = 30;
            this.startTime = Date.now();
        }
        this.getDyingFrame();
        if (this.animationFinished) {
            this.setState('defeated');
            console.log(this.state);
        }
    };

    getHoverAnimation(){
        const elapsed = Date.now() - this.hoverStart;
        if (elapsed < 100) {
            this.img = this.imageCache[this.IMAGE_JUMP_DOWN];
        } else {
            this.gravityPaused = false;
            this.setState('jump-down');
        }
    };

    getJumpDownAnimation(){
        this.img = this.imageCache[this.IMAGE_JUMP_DOWN];
        this.speedY = -15
        this.x -= this.speed * 8;
        if (!this.isAboveGround()) {
            this.setState('jump-end');
        }
    };

    getJumpEndAnimation(){
        this.img = this.imageCache[this.IMAGE_JUMP_UP];
        this.x += this.speed * 5;
        this.speedY = 5
        if (!this.jumpEndStarted) {
            this.jumpEndStarted = Date.now();
        }
        if (Date.now() - this.jumpEndStarted > 300) {
            this.isJumping = false;
            this.jumpEndStarted = null;
            this.setState('attack-end');
        }
    };
}
