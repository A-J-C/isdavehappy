var defaults = { startVelocity: 30, spread: 360, ticks: 60, decay: 0.95, gravity: 0.5, particleCount: 200, scalar: 2 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function happyConfetti() {
  confetti({ ...defaults, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
  setTimeout(() => {
      confetti({ ...defaults, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  }, randomInRange(200, 500));
}

function snow() {
  confetti({
    particleCount: 1,
    startVelocity: 0,
    ticks: 5000,
    origin: {
      x: Math.random(),
      y: (Math.random() * 0.8) - 0.2
    },
    colors: ['#ffffff'],
    shapes: ['circle'],
    gravity: randomInRange(0.4, 0.6),
    scalar: randomInRange(0.4, 1),
    drift: randomInRange(-0.4, 0.4)
  });
}

// setInterval(happyConfetti, 1000);
setInterval(snow, 10);