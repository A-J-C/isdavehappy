// Based on a Pen by Diaco m.lotfollahi  : https://diacodesign.com */ https://codepen.io/MAW/pen/KdmwMb

function R(min, max) {
    return min + Math.random() * (max - min);
  }
  
  var total = 100; // How many divs to be created
  var maxAnimationTime = 30; //Stop animation after x seconds
  var container = document.getElementById("confettiWrapper"),
    w = window.innerWidth,
    h = 400;
  
  //w = window.innerWidth , h = window.innerHeight;
  
  TweenMax.set("#confettiWrapper", {
    perspective: 600
  });
  TweenMax.set("#confettiWrapper img", {
    xPercent: "-50%",
    yPercent: "-50%"
  });
  
  for (i = 0; i < total; i++) {
    //Create divs and assign color classes
    var Div = document.createElement("div");
    TweenLite.set(Div, {
      attr: {
        class: "confetti"
      },
      x: R(-80, w),
      y: R(-200, -150),
      z: R(-200, 200)
    });
    container.appendChild(Div);
    $(".confetti")
      .slice(0, 10)
      .addClass("red");
    $(".confetti")
      .slice(11, 20)
      .addClass("blue");
    $(".confetti")
      .slice(30, 40)
      .addClass("pink");
    $(".confetti")
      .slice(50, 60)
      .addClass("yellow");
    $(".confetti")
      .slice(70, 80)
      .addClass("green");
    animm(Div);
  }
  
  function animm(elm) {
    var tlConfetti = new TimelineMax({ repeat: -1 });
    tlConfetti.timeScale( 1.5 ); // Adjust speed. Higher number is faster
    tlConfetti
      .to(elm, R(6, 15), {
        y: h + 100,
        opacity: R(0.2, 0.9),
        scale: R(2, 0.25),
        ease: Linear.easeNone,
        repeat: -1
      },"-=2"
      )
      .to(
        elm,
        R(4, 8),
        {
          x: "+=100",
          rotationZ: R(0, 180),
          yoyo: true,
          ease: Sine.easeInOut
        },
        "-=10"
      )
      .to(
        elm,
        R(2, 8),
        {
          rotationX: R(0, 360),
          rotationY: R(0, 360),
          yoyo: true,
          ease: Sine.easeInOut,
          repeat: -1
        },
        "-=8"
      );
  
    TweenMax.delayedCall(maxAnimationTime, stopAnimation);
  
    function stopAnimation() {
      tlConfetti.pause();
    }
  }
  
  function R(min, max) {
    return min + Math.random() * (max - min);
  }
  