class World {

    canvas;
    keyboard;
    ctx;
    level = level1;
    character = new Character();
    statusBar = new StatusBar();
    coinDisplay = new CoinDisplay();
    bottleDisplay = new BottleDisplay();
    throwableObjects = [];
    camera_x = 0;
    paused = true;

    constructor(canvas, keyboard){
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        this.draw();
        this.setWorld();     
        this.run();
        
    };


    setWorld(){
        this.character.world = this;
        this.level.coins.forEach(coin => {
            coin.world = this;
        });
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
            enemy.animate();
        }
        )
    };

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.coins);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.coinDisplay);
        this.addToMap(this.bottleDisplay);
        this.ctx.translate(this.camera_x, 0);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function(){
        self.draw();
    });
    };

    restart() {
        this.character.stopIntervals(); 
        this.character = new Character();
        this.level.restartLevel();
        this.throwableObjects = [];
        this.statusBar.setPercentage(100);
        this.coinDisplay.value = 0;
        this.bottleDisplay.value = 20;
        this.setWorld();
}

    addObjectsToMap(objects){
        objects.forEach((o) => {
            this.addToMap(o);
        });

    };

    addToMap(mo){
        if (mo.otherDirection) {
            this.flipImage(mo);
        };
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        };
    };

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    };

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    };

    run(){
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowableObjects();
            this.level.coins.forEach(coin => {
                coin.update();
            });
         }, 200);
    }

    checkCollisions(){
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isDead() && !this.character.isAttacking(enemy)) {
                this.character.damage = 5;
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                console.log('character hp', this.character.energy);
                
            }
        })
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin) && !coin.isCollected) {
                coin.isCollected = true;
                coin.collect(this.coinDisplay);
                this.coinDisplay.updateNumber();
            }
        })
        this.level.enemies.forEach((enemy) => {
            if (this.character.isAttacking(enemy)) {
                enemy.damage = 100;
                enemy.hit();
                enemy.getDeadImage();
                console.log('enemy hp',enemy.energy);
                
            }
        })
    };

    checkThrowableObjects() {
        if(this.keyboard.KEYD && this.bottleDisplay.value > 0) {
            let bottle = new ThrowableObjects(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.bottleDisplay.reduceNumber();
        }
    };
};