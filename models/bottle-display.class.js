class BottleDisplay extends DrawableObjects {

    x = 300;
    y = 5;
    height = 60;
    width = 60;
    value = 20;

    constructor(){
        super().loadImage('assets/img/6_salsa_bottle/salsa_bottle.png');
    }

    draw(ctx) {

        super.draw(ctx);
        ctx.font = '45px Zabars';
        ctx.fillStyle = 'black';
        ctx.fillText(this.value.toString().padStart(2, '0'), this.x + 45, 55);
    };

    reduceNumber(){
        this.value -= 1;
    };
}