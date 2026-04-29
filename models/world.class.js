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
    worldMusic = new Audio('assets/audio/level-music.mp3');
    endscreen = new Endscreen();
    gameOver = false;
    winner = false;
    endscreenDiv = document.getElementById('endscreen-div');
    sounds;

    constructor(canvas, keyboard){
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        this.setWorld(); 
        this.collectSounds();
        this.draw();    
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
        });
        this.level.boss.world = this;
        this.level.boss.animate();
        this.endscreen.world = this;
    };

    setMute(isMuted) {
        this.isMuted = isMuted;
        this.sounds.forEach(sound => {
            sound.muted = isMuted;
            if (isMuted) {
                sound.pause();
            }
        });
    };

    collectSounds() {
        this.sounds = [];
        this.level.enemies.forEach(enemy => {
            if (enemy.walkingSound) this.sounds.push(enemy.walkingSound);
            if (enemy.dyingSound) this.sounds.push(enemy.dyingSound);
        });
        if (this.level.boss.alertSound) this.sounds.push(this.level.boss.alertSound);
        if (this.level.boss.attackingSound) this.sounds.push(this.level.boss.attackingSound);
        if (this.character.walkingSound) this.sounds.push(this.character.walkingSound);
        if (this.character.hurtingSound) this.sounds.push(this.character.hurtingSound);
        if (this.character.landingSound) this.sounds.push(this.character.landingSound);
        if (this.character.jumpingSound) this.sounds.push(this.character.jumpingSound);
        this.sounds.push(this.worldMusic);
        
    }

    draw(){;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        if (!this.gameOver) {
            this.addObjectsToMap(this.level.enemies);
            this.addToMap(this.level.boss);
            this.addToMap(this.character);
            this.addObjectsToMap(this.level.coins);
            this.ctx.translate(-this.camera_x, 0);
            this.addToMap(this.statusBar);
            this.addToMap(this.coinDisplay);
            this.addToMap(this.bottleDisplay);
            this.ctx.translate(this.camera_x, 0);
            this.throwableObjects.forEach((to) => {
            if (!to.splashAnimationFinished) {
                this.addToMap(to)
            }
            })
        }
        
        this.ctx.translate(-this.camera_x, 0);
        if (this.gameOver && this.endscreenDiv.style.display === 'none') {
            this.endscreen.update();
            this.addToMap(this.endscreen);
        }
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
        this.endscreen = new Endscreen();
        this.gameOver = false;
        this.winner = false;
        this.level.restartLevel();
        this.throwableObjects = [];
        this.statusBar.setPercentage(100);
        this.coinDisplay.value = 0;
        this.bottleDisplay.value = 20;
        this.setWorld();
        this.collectSounds();
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
            this.playWorldMusic();
            this.checkCollisions();
            this.checkThrowableObjects();
            this.checkCharacterState();
            this.level.coins.forEach(coin => {
                coin.update();
            });
         }, 200);
    };

    checkCharacterState(){
        this.lostTheGame();
        this.wonTheGame();
    }

    lostTheGame(){
        if (this.character.state === 'dying') {
            if (this.character.isDeadAnimationFinished) {
                this.character.state = 'gameover'
            }
        };
        if (this.character.state === 'gameover' && !this.endscreen.started) {
            this.gameOver = true;
            this.endscreen.getStartTime();
            this.endscreen.started = true;
        }
        if (this.character.state === 'gameover' && this.endscreen.animationFinished) {
            this.paused = true;
            document.getElementById('endscreen-div').style.display = 'flex';
        }
    }

    wonTheGame(){
        if (this.level.boss.state === 'defeated') {
            this.character.state = 'winner'
        };
        if (this.character.state === 'winner' && !this.endscreen.started) {
            this.gameOver = true;
            this.winner = true;
            this.endscreen.getStartTime();
            this.endscreen.started = true;
        }
        if (this.character.state === 'winner' && this.endscreen.animationFinished) {
            this.paused = true;
            document.getElementById('endscreen-div').style.display = 'flex';
        }
    }

    playWorldMusic(){
        if (!this.paused) {
            this.worldMusic.play();
            this.worldMusic.volume = 0.7;
        } else {
            this.worldMusic.pause();
        }
    };

    checkCollisions(){
        this.checkCharacterEnemyCollision();
        this.checkCharacterCoinCollision();
        this.checkThrowingBottleCollision();
        this.checkCharacterBossCollision();
    };

    checkCharacterEnemyCollision(){
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isDead() && !this.character.isAttacking(enemy) && !this.character.isDead()) {
                this.character.damage = 50;
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                console.log('character hp', this.character.energy); 
            } else if (this.character.isAttacking(enemy) && !this.character.isHurt()) {
                enemy.damage = 100;
                enemy.hit();
                enemy.getDeadImage();
                console.log('enemy hp',enemy.energy);
            };
        })
    };

    checkCharacterBossCollision(){
        const boss = this.level.boss;
        if (this.character.isColliding(boss) && !this.character.isHurt()) {
            this.character.damage = 50;
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
        }
    }

    checkCharacterCoinCollision(){
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin) && !coin.isCollected) {
                coin.isCollected = true;
                coin.collect(this.coinDisplay);
                this.coinDisplay.updateNumber();
            }
        })
    };

    checkThrowingBottleCollision(){
        const boss = this.level.boss;
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy) && !enemy.isDead() && !bottle.splashAnimationFinished && !this.gameOver) {
                    enemy.damage = 100;
                    enemy.hit();
                    enemy.getDeadImage();
                    bottle.getSplashAnimation();
                }
            })
            if (bottle.isColliding(boss) && !bottle.splashAnimationFinished && !bottle.splashed && !boss.isHurt() && !boss.isDead()) {
                boss.hit();
                console.log(boss.energy);
                boss.setState('hurt');
                bottle.getSplashAnimation();
            }
        })
    };

    checkThrowableObjects() {
        if(this.keyboard.KEYD && this.bottleDisplay.value > 0) {
            let bottle = new ThrowableObjects(this.character.x + 100, this.character.y + 100);
            bottle.world = this;
            bottle.throw();
            this.throwableObjects.push(bottle);
            this.bottleDisplay.reduceNumber();
        }
        const boss = this.level.boss;
        let distance = Math.abs(this.character.x - boss.x);
        if (distance < 200 && boss.state === 'walk') {          
            boss.setState('attack-begin');    
        }
    };
};