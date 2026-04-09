class CoinDisplay extends DrawableObjects {

    x = 180;
    y = -30;
    width = 140;
    height = 140;
    value = 0;

    constructor(){
        super().loadImage('assets/img/8_coin/coin_1.png');
    }

    draw(ctx) {

        super.draw(ctx);
        ctx.font = '45px Zabars';
        ctx.fillStyle = 'black';
        ctx.fillText(this.value.toString().padStart(2, '0'), this.x + 95, 55);
    };

    updateNumber(){
        this.value += 1;
    };

}