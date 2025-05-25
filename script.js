const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const text = "TE AMO";
const fontSize = 18;
const columns = Math.floor(canvas.width / (fontSize * 4));
const drops = new Array(columns).fill(1);

ctx.font = fontSize + "px monospace";

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ff3399";
  ctx.shadowColor = "#ff3399";
  ctx.shadowBlur = 10;
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const x = i * fontSize * 4;
    const y = drops[i] * fontSize;
    ctx.fillText(text, x, y);

    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }

  ctx.shadowBlur = 0;
}

setInterval(draw, 50);

function createBurstText(x, y) {
  const fragments = 12;
  for (let i = 0; i < fragments; i++) {
    const burst = document.createElement('div');
    burst.className = 'burst-text';
    burst.textContent = text;

    burst.style.left = x + 'px';
    burst.style.top = y + 'px';

    const moveX = (Math.random() * 300 - 150).toFixed(2) + 'px';
    const moveY = (Math.random() * 300 - 150).toFixed(2) + 'px';
    burst.style.setProperty('--move-x', moveX);
    burst.style.setProperty('--move-y', moveY);

    document.body.appendChild(burst);

    burst.addEventListener('animationend', () => {
      burst.remove();
    });
  }
}

window.addEventListener('click', e => {
  createBurstText(e.clientX, e.clientY);
});

window.addEventListener('touchstart', e => {
  const touch = e.touches[0];
  if (touch) createBurstText(touch.clientX, touch.clientY);
});
