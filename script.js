

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