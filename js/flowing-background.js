const canvas = document.getElementById('flowing-bg');
const ctx = canvas.getContext('2d');

let width, height;
let shapes = [];

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function randomColor() {
  const colors = ['#00f260', '#0575e6', '#ff6a00', '#f85032', '#00c3ff'];
  return colors[Math.floor(Math.random() * colors.length)];
}

class Shape {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = height + Math.random() * 100;
    this.size = 10 + Math.random() * 20;
    this.speed = 0.5 + Math.random() * 1;
    this.alpha = 0.1 + Math.random() * 0.5;
    this.color = randomColor();
    this.angle = Math.random() * Math.PI * 2;
  }

  update() {
    this.y -= this.speed;
    this.x += Math.sin(this.angle) * 0.5;
    if (this.y < -50) this.reset();
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color + Math.floor(this.alpha * 255).toString(16).padStart(2, '0');
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

for (let i = 0; i < 70; i++) {
  shapes.push(new Shape());
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  for (let shape of shapes) {
    shape.update();
    shape.draw();
  }
  requestAnimationFrame(animate);
}

animate();