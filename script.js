const canv = document.getElementById('canvas');
const ctx = canv.getContext('2d');

canv.width = window.innerWidth;
canv.height = window.innerHeight;

const FONT_SIZE = 16;

ctx.font = `bold ${FONT_SIZE}px Monospace`;

let x = 0, y = 0;

function paintOverSymbol() {
    ctx.fillRect(0, 0, canv.width, canv.height);
}

function Column(x,  canvasHeight, fontSize, context) {
    const CHARACTERS = "アァカサタナハマヤャラワガザダバパイィキシ" +
      "チニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケ" +
      "セテネヘメレヱゲゼデベペオォコソトホモヨョロヲゴゾドボポヴッン";

    const currentDelay = Math.floor(Math.random() * FONT_SIZE * 100);

    this.x = x;
    this.y = 0 - currentDelay;
    this.canvasHeight = canvasHeight;
    this.fontSize = fontSize;
    this.context = context;

    this.drawSymbol = function() {
        const charIndex = Math.floor(Math.random() * CHARACTERS.length);
        const currentChar = CHARACTERS[charIndex];
        this.context.fillText(currentChar, this.x, this.y);
        if(this.y > this.canvasHeight) this.y = 0 - currentDelay;
        else this.y += this.fontSize;
    }
}

const columns = [];

for(let i = 0; i < canv.width / FONT_SIZE; i ++) {
    columns.push(new Column(i * FONT_SIZE, canv.height, FONT_SIZE, ctx));
}

function animate() {
    ctx.fillStyle = 'green';
    columns.forEach(column => column.drawSymbol());

    ctx.fillStyle = 'rgba(0, 0, 0, .05)';
    paintOverSymbol();

    setTimeout(() => requestAnimationFrame(animate), 50);
}

animate();