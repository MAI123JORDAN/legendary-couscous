document.getElementById('change-color').addEventListener('click', function() {
    const randomColor = getRandomColor();
    document.getElementById('color-box').style.backgroundColor = randomColor;
});

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}