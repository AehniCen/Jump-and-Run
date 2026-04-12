class Character extends MovableObjects {
    IMAGES_IDLE = [
        'assets/img/2_character_pepe/1_idle/idle/I-1.png',
        'assets/img/2_character_pepe/1_idle/idle/I-2.png',
        'assets/img/2_character_pepe/1_idle/idle/I-3.png',
        'assets/img/2_character_pepe/1_idle/idle/I-4.png',
        'assets/img/2_character_pepe/1_idle/idle/I-5.png',
        'assets/img/2_character_pepe/1_idle/idle/I-6.png',
        'assets/img/2_character_pepe/1_idle/idle/I-7.png',
        'assets/img/2_character_pepe/1_idle/idle/I-8.png',
        'assets/img/2_character_pepe/1_idle/idle/I-9.png',
        'assets/img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_IDLE_LONG = [
        'assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    IMAGES_WALKING = [
        'assets/img/2_character_pepe/2_walk/W-21.png',
        'assets/img/2_character_pepe/2_walk/W-22.png',
        'assets/img/2_character_pepe/2_walk/W-23.png',
        'assets/img/2_character_pepe/2_walk/W-24.png',
        'assets/img/2_character_pepe/2_walk/W-25.png',
        'assets/img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING_UP = [
        'assets/img/2_character_pepe/3_jump/J-31.png',
        'assets/img/2_character_pepe/3_jump/J-32.png',
        'assets/img/2_character_pepe/3_jump/J-33.png',
        'assets/img/2_character_pepe/3_jump/J-34.png',
        'assets/img/2_character_pepe/3_jump/J-35.png'
    ];
    IMAGES_JUMPING_DOWN = [
        'assets/img/2_character_pepe/3_jump/J-36.png',
        'assets/img/2_character_pepe/3_jump/J-37.png',
        'assets/img/2_character_pepe/3_jump/J-38.png',
        'assets/img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_HURTING = [
        'assets/img/2_character_pepe/4_hurt/H-41.png',
        'assets/img/2_character_pepe/4_hurt/H-42.png',
        'assets/img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_DYING = [
        'assets/img/2_character_pepe/5_dead/D-51.png',
        'assets/img/2_character_pepe/5_dead/D-52.png',
        'assets/img/2_character_pepe/5_dead/D-53.png',
        'assets/img/2_character_pepe/5_dead/D-54.png',
        'assets/img/2_character_pepe/5_dead/D-55.png',
        'assets/img/2_character_pepe/5_dead/D-56.png',
        'assets/img/2_character_pepe/5_dead/D-57.png'
    ];
   
    y = 80;
    height = 320;
    width = 200;
    currentImage = 0;
    world;
    speed = 15;
    lastActionTime = new Date().getTime();
    idleMode = false;


    constructor(){
        super().loadImage('assets/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING_UP);
        this.loadImages(this.IMAGES_JUMPING_DOWN);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_DYING);
        this.applyGravity();
        this.animate();
    };

    checkIdleMode(){
        if(!this.world.keyboard.RIGHT &&
            !this.world.keyboard.LEFT &&
            !this.world.keyboard.SPACE
        ){
            this.idleMode = true;
        }
    };

    playDyingAnimation(images) {
        this.dying();
        this.playAnimationOnce(images);
    }

    getMovementIntervall(){
        setInterval(() => {
            this.lastY = this.y;
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.world.paused && !this.isDead()) {
                this.moveRight();
            }
            if (this.world.keyboard.LEFT && this.x > 0 && !this.world.paused && !this.isHurt() && !this.isDead()) {
                this.moveLeft();
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround() && !this.world.paused && !this.isDead()) {
                this.jump();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000/30);
        
    };

    getDyingAnimation(){
        setInterval(() => {
            if (this.isDead() && !this.world.paused) {
                this.playDyingAnimation(this.IMAGES_DYING);
            }
        }, 1000/30)
    }

    getConditionIntervall(){
        setInterval(() => {
            if (this.isAboveGround() && !this.world.paused && !this.isHurt()) {
                if (this.speedY > 0)  {
                    this.playAnimationOnce(this.IMAGES_JUMPING_UP);
                } else if (this.speedY < 0 && !this.world.paused) {
                    this.playAnimationOnce(this.IMAGES_JUMPING_DOWN);
                }
            } else if (this.world.keyboard.RIGHT && !this.world.paused && !this.isHurt()  && !this.isDead() || this.world.keyboard.LEFT && !this.world.paused && !this.isHurt() && !this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING);
            } else if (this.world.keyboard.RIGHT && !this.world.paused && this.isHurt() && !this.isDead() || 
                    this.world.keyboard.LEFT && !this.world.paused && this.isHurt() && !this.isDead() ||
                    this.isHurt() && !this.world.paused && !this.isDead() ||
                    this.isAboveGround() && !this.world.paused && this.isHurt() && !this.isDead()) {
                this.playAnimationOnce(this.IMAGES_HURTING);
            }
        }, 120);
    };

    getIdleModeIntervall(){
        setInterval(() => {
            let timePassed = (new Date().getTime() - this.lastActionTime) / 1000;
            if(this.idleMode = true && !this.world.paused){
                this.loadImage('assets/img/2_character_pepe/1_idle/idle/I-1.png');
            }
            if(this.idleMode = true && timePassed > 1  && !this.world.paused){
                this.playAnimation(this.IMAGES_IDLE);
            }
            if(this.idleMode = true && timePassed > 10 && !this.world.paused){
                this.playAnimation(this.IMAGES_IDLE_LONG);
            }
        }, 1000/4)
    };

    animate(){
        if (this.paused) return;
        this.getMovementIntervall();
        this.getDyingAnimation();
        this.getConditionIntervall();
        this.getIdleModeIntervall();
    };

    


}