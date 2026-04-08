class DrawableObjects {

    x = 10;
    y = 280;
    height = 150;
    width = 100; 
    img;
    imageCache = [];

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    };

    loadImages(mo, path){

    };

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    };
}