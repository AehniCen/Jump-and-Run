class StatusBar extends DrawableObjects {
    IMAGES = [
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/5.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/10.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/15.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/25.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/30.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/35.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/45.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/50.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/55.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/65.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/70.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/75.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/85.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/90.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/95.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'

    ]


        percentage = 100;

    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex(){
        if(this.percentage == 100) {
            return 20;
        } else if (this.percentage > 95) {
            return 19;
        } else if (this.percentage > 90) {
            return 18;
        } else if (this.percentage > 85) {
            return 17;
        } else if (this.percentage > 80) {
            return 16;
        } else if (this.percentage > 75) {
            return 15;
        } else if (this.percentage > 70) {
            return 14;
        } else if (this.percentage > 65) {
            return 13;
        } else if (this.percentage > 60) {
            return 12;
        } else if (this.percentage > 55) {
            return 11;
        } else if (this.percentage > 50) {
            return 10;
        } else if (this.percentage > 45) {
            return 9;
        } else if (this.percentage > 40) {
            return 8;
        } else if (this.percentage > 35) {
            return 7;
        } else if (this.percentage > 30) {
            return 6;
        } else if (this.percentage > 25) {
            return 5;
        } else if (this.percentage > 20) {
            return 4;
        } else if (this.percentage > 15) {
            return 3;
        } else if (this.percentage > 10) {
            return 2;
        } else if (this.percentage > 5) {
            return 1;
        } else {
            return 0;
        }
    }
};