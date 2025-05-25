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
let columns = Math.floor(canvas.width / (fontSize * 4));
let drops = new Array(columns).fill(1);

ctx.font = fontSize + "px monospace";

function draw() {
  // Fondo semitransparente para efecto "desvanecido"
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)"; // Aumenté un poco la opacidad para mejor performance y menos efecto de ghosting
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ff3399";
  ctx.shadowColor = "#ff3399";
  ctx.shadowBlur = 8; // reduje el blur para menos carga
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

// Usar requestAnimationFrame para mejor rendimiento
function animate() {
  draw();
  requestAnimationFrame(animate);
}
animate();

function createBurstText(x, y) {
  const fragments = 8; // Reducido de 12 para menor carga
  for (let i = 0; i < fragments; i++) {
    const burst = document.createElement('div');
    burst.className = 'burst-text';
    burst.textContent = text;

    burst.style.left = x + 'px';
    burst.style.top = y + 'px';

    const moveX = (Math.random() * 200 - 100).toFixed(2) + 'px'; // Rango reducido para menos movimiento exagerado
    const moveY = (Math.random() * 200 - 100).toFixed(2) + 'px';
    burst.style.setProperty('--move-x', moveX);
    burst.style.setProperty('--move-y', moveY);

    document.body.appendChild(burst);

    burst.addEventListener('animationend', () => {
      burst.remove();
    });
  }
}

// Limitar la frecuencia para evitar bursts muy seguidos y saturar DOM
let lastBurstTime = 0;
function tryCreateBurst(e) {
  const now = Date.now();
  if (now - lastBurstTime > 100) { // 100 ms entre bursts
    createBurstText(e.clientX, e.clientY);
    lastBurstTime = now;
  }
}

window.addEventListener('click', tryCreateBurst);

window.addEventListener('touchstart', e => {
  const touch = e.touches[0];
  if (touch) tryCreateBurst(touch);
});
