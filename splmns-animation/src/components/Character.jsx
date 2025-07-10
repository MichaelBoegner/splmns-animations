import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import "./Sprite.css";
import "./Character.css";

function Character({ name, type, motionParams }) {
  const className = type.movement === "ground" ? "sprite-ground" : "sprite-air";

  const x = useMotionValue(motionParams.startX);
  const theta = useTransform(
    x,
    [motionParams.startX, motionParams.endX],
    [0, Math.PI]
  );
  const arcY = useTransform(theta, (t) => -750 * Math.sin(t));
  const rotation = useTransform(theta, (t) => {
    const slope = -750 * Math.cos(t); // dy/dθ
    const dx = motionParams.endX - motionParams.startX;
    const dθdx = Math.PI / dx;
    const dy_dx = slope * dθdx;
    return (Math.atan2(dy_dx, 1) * 180) / Math.PI; // degrees
  });

  useEffect(() => {
    if (type.movement === "air") {
      animate(x, motionParams.endX, {
        duration: type.speed,
        ease: "linear",
      });
    }
  }, [x, motionParams.endX, type.movement, type.speed]);

  if (type.movement === "air") {
    return (
      <motion.div style={{ x, y: arcY }} className="character">
        <div className="name">{name}</div>
        <motion.div
          className={className}
          style={{
            backgroundImage: `url(${type.asset})`,
            scale: type.scale,
            rotate: rotation,
          }}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ x: motionParams.startX, y: motionParams.y }}
      animate={{ x: motionParams.endX }}
      transition={{ duration: type.speed, ease: "linear" }}
      className="character"
    >
      <div className="name">{name}</div>
      <div
        className={className}
        style={{
          backgroundImage: `url(${type.asset})`,
          transform: `scale(${type.scale})`,
        }}
      />
    </motion.div>
  );
}

export default Character;
