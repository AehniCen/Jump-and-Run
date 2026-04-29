let world;
let canvas;
let keyboard = new Keyboard();
let startMenu;
let pauseMenu;
let endscreenDiv;
let isMuted = false;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    startMenu = document.getElementById('start-div');
    pauseMenu = document.getElementById('pause-div');
    endscreenDiv = document.getElementById('endscreen-div');
    [startMenu, pauseMenu, endscreenDiv].forEach(el => {
        el.style.width = canvas.width + "px";
        el.style.height = canvas.height + "px";
    })
    showViewportSize();
}

function showViewportSize() {
    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.bottom = '10px';
    div.style.right = '10px';
    div.style.background = 'black';
    div.style.color = 'white';
    div.style.padding = '5px 10px';
    div.style.zIndex = '9999';
    div.style.fontSize = '14px';
    document.body.appendChild(div);

    function update() {
        div.textContent = `${window.innerWidth} x ${window.innerHeight}`;
    }

    window.addEventListener('resize', update);
    update();
}

function startGame() {
    startMenu.style.display = 'none';
    world.paused = false;
    };

function backToGame() {
    if (pauseMenu.style.display === 'block') {
        pauseMenu.style.display = 'none';
        world.paused = false;
    }
}

function restartGame() {
    world.restart();
    pauseMenu.style.display = 'none';
    endscreenDiv.style.display = 'none';
    world.paused = false;
}

function backToStartMenu() {
    world.restart();
    world.paused = true;
    pauseMenu.style.display = 'none';
    endscreenDiv.style.display = 'none';
    startMenu.style.display = 'flex'  
}

function toggleSound() {
    isMuted = !isMuted;
    localStorage.setItem('isMuted', isMuted);
    updateMuteButton(); 
    world.setMute(isMuted);
}

function updateMuteButton() {
    const img = document.querySelector('#mute-btn img');

    if (isMuted) {
        img.src = 'assets/icons/mute.png';
        img.alt = 'sound-off-icon';
    } else {
        img.src = 'assets/icons/sound.png';
        img.alt = 'sound-on-icon';
    }
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