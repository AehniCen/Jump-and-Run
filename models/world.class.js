class World {

    canvas;
    ctx;
    level = level1;
    character = new Character();


    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.draw();
        this.setWorld();
    }

    setWorld(){
        this.character.world = this;
    };

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
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