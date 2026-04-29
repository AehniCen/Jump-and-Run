class BackgroundObjects extends DrawableObjects {

    width = 3800
    height = 1000

    constructor(imagePath, x){
        super().loadImage(imagePath);
        this.y = 1000 - this.height;
        this.x = x;
    }
}