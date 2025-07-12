import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import "./Sprite.css";
import "./Character.css";

function Character({ name, type, motionParams }) {
  const x = useMotionValue(motionParams.startX);

  const theta = useTransform(
    x,
    [motionParams.startX, motionParams.endX],
    [0, Math.PI]
  );

  const arcY = useTransform(theta, (t) => -750 * Math.sin(t));

  const rotation = useTransform(theta, (t) => {
    const slope = -750 * Math.cos(t);
    const dx = motionParams.endX - motionParams.startX;
    const dθdx = Math.PI / dx;
    const dy_dx = slope * dθdx;
    return (Math.atan2(dy_dx, 1) * 180) / Math.PI;
  });

  useEffect(() => {
    let controls = animate(x, motionParams.endX, {
      duration: type.speed,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
      onUpdate: () => {
        if (x.get() >= motionParams.endX) {
          x.set(motionParams.startX);
        }
      },
    });

    return () => controls.stop();
  }, [x, motionParams.startX, motionParams.endX, type.speed]);

  const className = type.movement === "ground" ? "sprite-ground" : "sprite-air";
  const y = type.movement === "air" ? arcY : motionParams.y;

  return (
    <motion.div style={{ x, y }} className="character">
      <div className="name">{name}</div>
      <motion.div
        className={className}
        style={{
          backgroundImage: `url(${type.asset})`,
          scale: type.scale,
          rotate: type.movement === "air" ? rotation : 0,
        }}
      />
    </motion.div>
  );
}

export default Character;
