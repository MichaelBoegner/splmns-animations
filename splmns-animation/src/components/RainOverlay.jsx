import { useEffect, useRef } from "react";

function RainOverlay() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const numDrops = 400;

    const dropsWhite = Array.from({ length: numDrops }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 2 + Math.random() * 5,
      color: "white",
    }));

    const dropsBlue = Array.from({ length: numDrops }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 2 + Math.random() * 5,
      color: "blue",
    }));

    const splashes = [];

    function spawnSplash() {
      const splash = {
        x: Math.random() * canvas.width,
        y: canvas.height - 10,
        arcs: Array.from({ length: 3 }, () => ({
          angle: (Math.random() * 90 - 45) * (Math.PI / 180),
          distance: 20 + Math.random() * 20,
          age: 0,
          maxAge: 10,
        })),
        color: Math.random() < 0.5 ? "white" : "blue",
      };
      splashes.push(splash);
      if (splashes.length > 30) splashes.shift();
    }

    const splashInterval = setInterval(spawnSplash, 50);

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      [...dropsWhite, ...dropsBlue].forEach((drop) => {
        ctx.beginPath();
        ctx.strokeStyle = drop.color;
        ctx.lineWidth = 1.5;
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + 10);
        ctx.stroke();

        drop.y += drop.speed;
        if (drop.y > canvas.height) {
          drop.y = -10;
          drop.x = Math.random() * canvas.width;
        }
      });

      splashes.forEach((splash) => {
        splash.arcs.forEach((arc) => {
          const progress = arc.age / arc.maxAge;
          const dist = arc.distance * progress;
          const x = splash.x + dist * Math.cos(arc.angle);
          const y = splash.y - dist * Math.sin(arc.angle);

          ctx.beginPath();
          ctx.fillStyle = splash.color;
          ctx.arc(x, y, 1.5, 0, 2 * Math.PI);
          ctx.fill();

          arc.age += 1;
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => clearInterval(splashInterval);
  }, []);

  return <canvas ref={canvasRef} className="rain-canvas" />;
}

export default RainOverlay;
