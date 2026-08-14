let world;
let canvas;
let keyboard = new Keyboard();
let startMenu;
let startBtn;
let pauseMenu;
let tutorial;
let endscreenDiv;
let controlsDiv;
let settingsDiv;
let mobileControls;
let btnSound = new Audio('assets/audio/btn-sound.mp3');
let isMuted = false;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    world.paused = true;
    startMenu = document.getElementById('start-div');
    startBtn = document.getElementById('start-btn');
    pauseMenu = document.getElementById('pause-div');
    tutorial = document.getElementById('tutorial-div')
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

function showTutorial() {
    startBtn.style.display = 'none';
    tutorial.style.display = 'flex';
    getButtonSound();
}

function startGame() {
    startBtn.style.display = 'block';
    startMenu.style.display = 'none';
    tutorial.style.display = 'none';
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
    btnSound.muted = isMuted;
    updateMuteButtons();
    let tooltip = button.parentElement.querySelector('.sound-text');
    tooltip.innerText = isMuted ? 'Sound off' : 'Sound on';
}

function openSettings() {
    settingsDiv = document.getElementById('settings-div-overlay');
    settingsDiv.style.display = 'flex';
}

function closeSettings() {
    settingsDiv = document.getElementById('settings-div-overlay');
    settingsDiv.style.display = 'none';
    closeControls();
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
    const leftArrow = document.getElementById('left-arrow-mobile');
    const rightArrow = document.getElementById('right-arrow-mobile');
    const jumpArrow = document.getElementById('jump-arrow-mobile');
    const throwArrow = document.getElementById('throw-arrow-mobile');

    leftArrow.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    leftArrow.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    rightArrow.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    rightArrow.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    jumpArrow.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    jumpArrow.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
    throwArrow.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.KEYD = false;
    });
    throwArrow.addEventListener('touchend', (e) => {
        e.preventDefault();
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
        e.preventDefault();
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

async function toggleFullscreen() {
    document.activeElement.blur();
    const element = document.getElementById('fullscreen');

    try {
        if (!document.fullscreenElement) {
            await element.requestFullscreen();
        } else {
            await document.exitFullscreen();
        }
    } catch (error) {
        console.log("Fullscreen error:", error);
    }
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
        console.log("exit");
        
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

window.addEventListener("resize", () => {
    let mobileControls = document.getElementById('mobile-controls')
    if (window.matchMedia("(pointer: coarse)").matches) {
        mobileControls.style.display = "flex";
    } else {
        mobileControls.style.display = "none";
    }
});