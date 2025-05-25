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
  // Fondo semi-transparente para efecto trail
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; 
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ff3399";
  ctx.shadowColor = "#ff3399";
  ctx.shadowBlur = 5; // Reducido para menos lag
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const x = i * fontSize * 4;
    const y = drops[i] * fontSize;
    ctx.fillText(text, x, y);

    if (y > canvas.height && Math.random() > 0.98) {
      drops[i] = 0;
    }

    drops[i]++;
  }

  ctx.shadowBlur = 0;

  requestAnimationFrame(draw);
}
draw();

function createBurstText(x, y) {
  const fragments = 6; // Reducido a la mitad
  for (let i = 0; i < fragments; i++) {
    const burst = document.createElement('div');
    burst.className = 'burst-text';
    burst.textContent = text;

    burst.style.left = x + 'px';
    burst.style.top = y + 'px';

    // Movimiento reducido a rango +-100 px
    const moveX = (Math.random() * 200 - 100).toFixed(2) + 'px';
    const moveY = (Math.random() * 200 - 100).toFixed(2) + 'px';
    burst.style.setProperty('--move-x', moveX);
    burst.style.setProperty('--move-y', moveY);

    // Duración de animación reducida a 1.5s
    burst.style.animationDuration = '1.5s';

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
