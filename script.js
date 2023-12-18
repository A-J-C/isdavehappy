var defaults = { startVelocity: 30, spread: 360, ticks: 60, decay: 0.95, gravity: 0.5, particleCount: 200, scalar: 2 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

var interval = setInterval(function() {
  confetti({ ...defaults, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
  setTimeout(() => {
      confetti({ ...defaults, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  }, randomInRange(200, 500));
}, 1000);