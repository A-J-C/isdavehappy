const defaults = { startVelocity: 30, spread: 360, ticks: 60, decay: 0.95, gravity: 0.5, particleCount: 200, scalar: 2 };
const freefall = {particleCount: 1, startVelocity: 0, ticks: 5000, shapes: ['circle'] }

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function happyConfetti() {
  confetti({ ...defaults, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
  setTimeout(() => {
      confetti({ ...defaults, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  }, randomInRange(200, 500));
}

function tears() {
  confetti({
    ...freefall,
    origin: { x: Math.random(), y: (Math.random() * 0.8) - 0.2 },
    colors: ['#00a8dc', '#29cdff', '#006e90', '#00a8dd', '#2bccff'],
    gravity: randomInRange(1.2, 2.0),
    scalar: randomInRange(1, 2),
    drift: randomInRange(-0.4, 0.4)
  });
}

function snow() {
  confetti({
    ...freefall,
    origin: { x: Math.random(), y: (Math.random() * 0.8) - 0.2 },
    colors: ['#ffffff'],
    gravity: randomInRange(0.4, 0.6),
    scalar: randomInRange(0.4, 1),
    drift: randomInRange(-0.4, 0.4)
  });
}

function startConfetti() {
  fetch('/get_states')
      .then(response => response.json())
      .then(data => {
        document.getElementById("davePic").src = `daves/${data.season}_${data.mood}_dave.png`;
          if (data.season === 'christmas') {
              setInterval(snow, 10);
          } else if (data.season === 'standard') {
              if (data.mood == 'happy') {
                setInterval(happyConfetti, 1000);
              }
              else if (data.mood == 'sad') {
                setInterval(tears, 10);
              }
              else {
                console.log("Mood not defined");
              }
          } else {
              console.log("Season not defined");
          }
      })
      .catch(error => {
          console.error('Error fetching states:', error);
      });
}

document.addEventListener('DOMContentLoaded', startConfetti);