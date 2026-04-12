let world;
let canvas;
let keyboard = new Keyboard();
let startMenu;
let pauseMenu;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function startGame() {
    startMenu = document.getElementById('start-div');
    startMenu.style.display = 'none';
    world.paused = false;
    };

function backToGame() {
    if (pauseMenu.style.display = 'block') {
        pauseMenu.style.display = 'none';
        world.paused = false;
    }
}

function restartGame() {
    world.restart();
    pauseMenu.style.display = 'none';
    world.paused = false;
}

function backToStartMenu() {
    world.restart();
    world.paused = true;
    pauseMenu.style.display = 'none';
    startMenu.style.display = 'flex'  
}

window.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowRight') {
        keyboard.RIGHT = true;    
    };
    if (e.key == 'ArrowLeft') {
        keyboard.LEFT = true;    
    };
    if (e.key == 'ArrowUp') {
        keyboard.UP = true;    
    };
    if (e.key == 'ArrowDown') {
        keyboard.DOWN = true;    
    };
    if (e.key == ' ') {
        keyboard.SPACE = true;    
    };
    if (e.key == 'd') {
        keyboard.KEYD = true;    
    };
    if (e.key == 'Escape' && keyboard.ESC == false && startMenu.style.display == 'none') {
        pauseMenu = document.getElementById('pause-div')
        keyboard.ESC = true;    
        world.paused = true;
        pauseMenu.style.display = 'block';
    } else if (e.key == 'Escape' && keyboard.ESC == true && startMenu.style.display == 'none') {
        keyboard.ESC = false; 
        world.paused = false;
        pauseMenu.style.display = 'none';
    };    
    
})

window.addEventListener('keyup', (e) => {
    if (e.key == 'ArrowRight') {
        keyboard.RIGHT = false;    
    };
    if (e.key == 'ArrowLeft') {
        keyboard.LEFT = false;    
    };
    if (e.key == 'ArrowUp') {
        keyboard.UP = false;    
    };
    if (e.key == 'ArrowDown') {
        keyboard.DOWN = false;    
    };
    if (e.key == ' ') {
        keyboard.SPACE = false;    
    };
    if (e.key == 'd') {
        keyboard.KEYD = false;    
    };
})