import { useEffect, useRef } from "react";
import "./RainOverlay.css";

function RainOverlay() {
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const splashProbabilty = 0.75;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const numDrops = 100;
    const drops = Array.from({ length: numDrops }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 4 + Math.random() * 3,
      color: Math.random() < 0.5 ? "white" : "blue",
    }));

    const splashes = [];

    const maxSplashes = 100;
    function spawnSplash(x, y, color) {
      if (splashes.length > maxSplashes) return;
      const count = 5 + Math.floor(Math.random() * 5);
      for (let i = 0; i < count; i++) {
        splashes.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 4,
          vy: -Math.random() * 3,
          age: 0,
          maxAge: 8 + Math.floor(Math.random() * 3),
          color,
        });
      }
    }

    let lastTime = 0;
    let frameId;

    function animate(now) {
      if (now - lastTime >= 15) {
        lastTime = now;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drops.forEach((drop) => {
          ctx.beginPath();
          ctx.strokeStyle = drop.color;
          ctx.lineWidth = 4.5;
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x, drop.y + 10);
          ctx.stroke();

          drop.y += drop.speed;
          if (drop.y > canvas.height) {
            if (Math.random() < splashProbabilty) {
              // spawnSplash(drop.x, canvas.height, drop.color);
            }
            drop.y = -10;
            drop.x = Math.random() * canvas.width;
          }
        });

        for (let i = splashes.length - 1; i >= 0; i--) {
          const p = splashes[i];
          ctx.beginPath();
          ctx.fillStyle = p.color;
          ctx.arc(p.x, p.y, 1.5, 0, 2 * Math.PI);
          ctx.fill();

          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.2;
          p.age++;

          if (p.age > p.maxAge) {
            splashes.splice(i, 1);
          }
        }
      }

      frameId = requestAnimationFrame(animate);
    }

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="rain-canvas">
      <canvas ref={canvasRef} />
    </div>
  );
}

export default RainOverlay;
