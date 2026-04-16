class Endscreen extends MovableObjects {

    width = 500;
    height = 400;
    x = 100;
    y = 20;
    animationFinished = false;
    startTime;
    started = false;

    IMAGES_ENDSCREEN_GAMEOVER = [
        'assets/img/winning_loosing/You_lost.png',
        'assets/img/winning_loosing/game_over.png'
    ];

    IMAGES_ENDSCREEN_WINNER = [
        'assets/img/winning_loosing/you_win.png',
        'assets/img/winning_loosing/you_win2.png'
    ]

    constructor(){
        super();
        this.loadImage(this.IMAGES_ENDSCREEN_GAMEOVER[0]);
        this.loadImages(this.IMAGES_ENDSCREEN_GAMEOVER);
        this.loadImages(this.IMAGES_ENDSCREEN_WINNER);
    }

    getStartTime() {
        this.startTime = new Date().getTime();
        this.currentStep = 0;
        this.animationFinished = false;
    }

    update() {
        let timePassed = (new Date().getTime() - this.startTime) / 1000;

        if (timePassed > 2 && this.currentStep === 0) {
            this.img = this.imageCache[this.IMAGES_ENDSCREEN_GAMEOVER[1]];
            this.currentStep = 1;
        }

        if (timePassed > 4 && this.currentStep === 1) {
            this.animationFinished = true;
        }
    }

}