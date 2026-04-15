class Endscreen extends MovableObjects {

    width = 400;
    height = 400;
    x = 20;
    y = 20;
    animationFinished = false;

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

        this.currentStep = 0;
        this.startTime = new Date().getTime();
    }

    update() {
        let timePassed = (new Date().getTime() - this.startTime) / 1000;
        if (timePassed > 2 && this.currentStep === 0) {
            this.img = this.imageCache[this.IMAGES_ENDSCREEN_GAMEOVER[0]]
        }else if (timePassed > 6 && this.currentStep === 0) {
            this.img = this.imageCache[this.IMAGES_ENDSCREEN_GAMEOVER[1]];
            this.currentStep = 1;
        }

        if (timePassed > 10 && this.currentStep === 1) {
            this.animationFinished = true;
        }
    }

}