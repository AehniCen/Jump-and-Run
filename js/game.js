let world;
let canvas;
let keyboard = new Keyboard();
let startMenu;
let pauseMenu;
let endscreenDiv;
let controlsDiv;
let mobileControls;
let btnSound = new Audio('assets/audio/btn-sound.mp3');
let isMuted = false;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    world.paused = true;
    startMenu = document.getElementById('start-div');
    pauseMenu = document.getElementById('pause-div');
    mobileControls = document.getElementById('mobile-controls');
    endscreenDiv = document.getElementById('endscreen-div');
    showViewportSize();
    bindBtnsPressEvents();
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
    world.character.lastActionTime = Date.now();
    getButtonSound();
    };

function backToGame() {
    if (pauseMenu.style.display === 'block') {
        pauseMenu.style.display = 'none';
        world.paused = false;
        getButtonSound();
    }
}

function restartGame() {
    world.restart();
    pauseMenu.style.display = 'none';
    endscreenDiv.style.display = 'none';
    world.paused = false;
    getButtonSound();
}

function backToStartMenu() {
    world.restart();
    world.paused = true;
    pauseMenu.style.display = 'none';
    endscreenDiv.style.display = 'none';
    startMenu.style.display = 'flex'  
    getButtonSound();
}

function toggleSound(button) {
    isMuted = !isMuted;
    localStorage.setItem('isMuted', isMuted);
    world.setMute(isMuted);
    updateMuteButtons();
    let tooltip = button.parentElement.querySelector('.tooltip-text');
    tooltip.innerText = isMuted ? 'Sound on' : 'Sound off';
}

function openControls() {
    controlsDiv = document.getElementById('controls-div-overlay');
    controlsDiv.style.display = 'flex';
}

function closeControls() {
    controlsDiv = document.getElementById('controls-div-overlay');
    controlsDiv.style.display = 'none';
}

function updateMuteButtons() {
    const icon = isMuted 
        ? 'assets/icons/mute.png'
        : 'assets/icons/sound.png';
    document.querySelectorAll('.mute-btn img').forEach(img => {
        img.src = icon;
    });
}

function getButtonSound() {
    btnSound.play();
    btnSound.volume = 0.5;
    btnSound.playbackRate = 1.5;
}

function bindBtnsPressEvents() {
    const leftArrow = document.getElementById('left-arrow');
    const rightArrow = document.getElementById('right-arrow');
    const jumpArrow = document.getElementById('jump-arrow');
    const throwArrow = document.getElementById('throw-arrow');

    leftArrow.addEventListener('pointerdown', () => {
        keyboard.LEFT = true;
    });
    leftArrow.addEventListener('pointerup', () => {
        keyboard.LEFT = false;
    });
    rightArrow.addEventListener('pointerdown', () => {
        keyboard.RIGHT = true;
    });
    rightArrow.addEventListener('pointerup', () => {
        keyboard.RIGHT = false;
    });
    jumpArrow.addEventListener('pointerdown', () => {
        keyboard.SPACE = true;
    });
    jumpArrow.addEventListener('pointerup', () => {
        keyboard.SPACE = false;
    });
    throwArrow.addEventListener('pointerup', () => {
        keyboard.KEYD = false;
    });
    throwArrow.addEventListener('pointerdown', () => {
        keyboard.KEYD = true;
    });


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
    if (e.key.toLowerCase() === 'd') {
        keyboard.KEYD = true;
    };
    if (e.key == 'Escape' && keyboard.ESC == false && startMenu.style.display == 'none' && endscreenDiv.style.display == 'none') {
        keyboard.ESC = true;    
        world.paused = true;
        world.endbossSound.pause();
        pauseMenu.style.display = 'block';
        mobileControls.style.display = 'none';
    } else if (e.key == 'Escape' && keyboard.ESC == true && startMenu.style.display == 'none') {
        keyboard.ESC = false; 
        world.paused = false;
        pauseMenu.style.display = 'none';
        mobileControls.style.display = 'flex';
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

async function fullscreen() {
    let element = document.getElementById('fullscreen');

    await element.requestFullscreen();

    console.log(
    document.getElementById('fullscreen').getBoundingClientRect()
);

console.log(
    document.getElementById('start-div').getBoundingClientRect()
);
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}