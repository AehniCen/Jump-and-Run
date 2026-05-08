class BabyChicken extends Chicken {

    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]

    IMAGES_DYING = [
        'assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]

    constructor(){
        super().loadImage('assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png');
        this.loadImage('assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png');
        this.loadImages(this.IMAGES_WALKING);
        this.speed = 0.5;
        this.energy = 50;
    }
}