class World {

    canvas;
    ctx;
    level = level1;

    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.draw();
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.addObjectsToMap(this.level.backgroundObjects);
        let self = this;
        requestAnimationFrame(function(){
        self.draw();
    });
    }

    addObjectsToMap(objects){
        objects.forEach((o) => {
            this.addToMap(o);
        });
    };

    addToMap(mo){
        mo.draw(this.ctx);
    }
}