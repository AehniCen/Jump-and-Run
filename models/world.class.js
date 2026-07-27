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
    worldMusicPaused = false;
    endscreen = new Endscreen();
    gameOver = false;
    winner;
    endscreenDiv = document.getElementById('endscreen-div');
    mobileControls = document.getElementById('mobile-controls');
    sounds;
    gameOverSound = new Audio('assets/audio/game-over.mp3');
    winnerSound = new Audio('assets/audio/winner.mp3');
    endbossSound = new Audio('assets/audio/endboss-music-entrance.mp3');
    endbossSoundPaused;
    canThrow = true;

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
        if (this.endbossSound) this.sounds.push(this.endbossSound);
        if (this.level.boss.attackingSound) this.sounds.push(this.level.boss.attackingSound);
        if (this.character.walkingSound) this.sounds.push(this.character.walkingSound);
        if (this.character.hurtingSound) this.sounds.push(this.character.hurtingSound);
        if (this.character.landingSound) this.sounds.push(this.character.landingSound);
        if (this.character.jumpingSound) this.sounds.push(this.character.jumpingSound);
        if (this.character.snoringSound) this.sounds.push(this.character.snoringSound);
        this.sounds.push(this.worldMusic);
        this.sounds.push(this.winnerSound);
        this.sounds.push(this.gameOverSound);
    };

    draw(){;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        if (!this.gameOver) {
            this.addObjectsToMap(this.level.enemies);
            this.addToMap(this.level.boss);
            this.addToMap(this.character);
            this.addObjectsToMap(this.level.coins);
            this.addObjectsToMap(this.level.bottles);
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
        console.log("NEW COINS", this.coins);
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
        this.level.coins.forEach(c => c.world = this);
        this.level.bottles.forEach(b => b.world = this);
        this.level.enemies.forEach(e => e.world = this);
        this.enemies = this.level.enemies;
        this.coins = this.level.coins;
        this.bottles = this.level.bottles;
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
            this.playEndbossMusic();
            this.checkCollisions();
            this.checkThrowableObjects();
            this.checkCharacterState();
            this.checkBossActivation();
            this.level.coins.forEach(coin => {
                coin.update();
            });
            this.level.bottles.forEach(bottle => {
                bottle.update();
            });
         }, 1000 / 60);
         console.log(this.level.coins.map(c => c.isCollected));
    };

    checkCharacterState(){
        this.lostTheGame();
        this.wonTheGame();
    };

    checkBossActivation(){
        const boss = this.level.boss;
        let distance = Math.abs(this.character.x - boss.x);
        if (distance < 400 && !boss.active) {
            boss.active = true;
            boss.animate();
        };
    };

    lostTheGame(){
        if (this.character.state === 'dying') {
            if (this.character.isDeadAnimationFinished) {
                this.character.state = 'gameover'
                this.pauseWorldMusic();
                this.getGameOverSound();
            }
        };
        if (this.character.state === 'gameover' && !this.endscreen.started && !this.paused) {
            this.gameOver = true;
            this.endscreen.getStartTime();
            this.endscreen.started = true;
            this.mobileControls.style.display = 'none';
        };
        if (this.character.state === 'gameover' && this.endscreen.animationFinished && !this.paused) {
            this.paused = true;
            document.getElementById('endscreen-div').style.display = 'flex';
        };
    };

    getGameOverSound(){
        if (!this.gameIsOver) {
            this.gameOverSound.play();
            this.gameOverSound.volume = 0.5;
            this.gameIsOver = true;
        };
    };

    wonTheGame() {
        if (this.level.boss.state === 'defeated' && !this.winner) {
            this.winner = true;
            this.character.state = 'winner';
            this.getWinnerSound();
            this.pauseWorldMusic();
            this.pauseEndbossMusic();
            this.endscreen.getStartTime();
            this.endscreen.started = true;
            this.mobileControls.style.display = 'none';
            setTimeout(() => {
                this.gameOver = true;
            }, 100);
        }
        if (this.winner && this.endscreen.animationFinished) {
            document.getElementById('endscreen-div').style.display = 'flex';
            this.paused = true;
        }
    }

    getWinnerSound() {
        this.winnerSound.volume = 0.5;
        this.winnerSound.currentTime = 0;
        this.winnerSound.play()
            .then(() => console.log('winner sound playing'))
            .catch(e => console.log('winner sound error', e));
    };

    playWorldMusic(){
        if (!this.paused && !this.winner && !this.worldMusicPaused) {
            this.worldMusic.play();
            this.worldMusic.volume = 0.7;
        } else {
            this.worldMusic.pause();
        }
    };

    pauseWorldMusic(){
        if (!this.worldMusicPaused) {
            this.worldMusicPaused = true;
            this.worldMusic.pause();  
        }
    }

    playEndbossMusic(){
        let boss = this.level.boss;
        let distance = Math.abs(this.character.x - boss.x);
        if (distance < 600 && !this.paused && !this.winner) {
            this.endbossSound.play();
            this.endbossSound.volume = 0.3;  
        }
    }

    pauseEndbossMusic(){
        if (!this.endbossSoundPaused) {
            this.endbossSoundPaused = true;
            this.endbossSound.pause();
        }
    }


    checkCollisions(){
        this.checkCharacterEnemyCollision();
        this.checkCharacterCoinCollision();
        this.checkCharacterBottleCollision();
        this.checkThrowingBottleCollision();
        this.checkCharacterBossCollision();
    };

    checkCharacterEnemyCollision(){
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isDead() && !this.character.isAttacking(enemy) && !this.character.isDead() && !this.character.isHurt()) {
                this.character.damage = 0;
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                console.log('character hp', this.character.energy); 
            } else if (this.character.isAttacking(enemy) && !this.character.isHurt()) {
                enemy.damage = 100;
                enemy.hit();
                enemy.getDeadImage();
                if (enemy.isDead()) {
                    setTimeout(() => {
                        this.level.enemies = this.level.enemies.filter(e => e !== enemy);
                    }, 500);
                };
                console.log('enemy hp',enemy.energy);
            };
        })
    };

    checkCharacterBossCollision(){
        const boss = this.level.boss;
        if (this.character.isColliding(boss) && !this.character.isHurt() && !boss.isDead()) {
            this.character.damage = 40;
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
        }
        let distance = Math.abs(this.character.x - boss.x);
        if (distance < 400 && boss.state === 'rest' && !this.paused) {       
            this.pauseWorldMusic(); 
            boss.setState('alert'); 
            this.playEndbossMusic();
        }
        if (distance < 350 && boss.state === 'walk') {       
            boss.setState('attack-begin'); 
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

    checkCharacterBottleCollision(){
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle) && !bottle.isCollected) {
                bottle.isCollected = true;
                bottle.collect(this.bottleDisplay);
                this.bottleDisplay.updateNumber();

            }
        })
     }

    checkThrowingBottleCollision(){
        const boss = this.level.boss;
        this.throwableObjects.forEach((throwBottle) => {
            this.level.enemies.forEach((enemy) => {
                if (throwBottle.isColliding(enemy) && !enemy.isDead() && !throwBottle.splashAnimationFinished && !this.gameOver) {
                    enemy.damage = 100;
                    enemy.hit();
                    enemy.getDeadImage();
                    throwBottle.getSplashAnimation();
                }
            })
            if (throwBottle.isColliding(boss) && !throwBottle.splashAnimationFinished && !throwBottle.splashed && !boss.isHurt() && !boss.isDead()) {
                boss.hit();
                console.log(boss.energy);
                boss.setState('hurt');
                throwBottle.getSplashAnimation();
            }
        })
    };

    checkThrowableObjects() {
        if(this.keyboard.KEYD && this.bottleDisplay.value > 0 && this.canThrow) {
            let bottle = new ThrowableObjects(this.character.x + 100, this.character.y + 100);
            bottle.world = this;
            bottle.throw();
            this.throwableObjects.push(bottle);
            this.bottleDisplay.reduceNumber();
            this.canThrow = false;
        }   
        if (!this.keyboard.KEYD) {
            this.canThrow = true;
        }
    };
};