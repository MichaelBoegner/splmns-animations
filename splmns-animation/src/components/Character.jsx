import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import "./Sprite.css";
import "./Character.css";

function Character({ name, type }) {
  const startX = -300;
  const endX = window.innerWidth + 300;
  const x = useMotionValue(startX);
  const theta = useTransform(x, [startX, endX], [0, Math.PI]);
  const arcY = useTransform(theta, (t) => -550 * Math.sin(t));
  const className = type.movement === "ground" ? "sprite-ground" : "sprite-air";
  const y = type.movement === "air" ? arcY : 75;
  const rotation = useTransform(theta, (t) => {
    const slope = -750 * Math.cos(t);
    const dx = endX - startX;
    const dθdx = Math.PI / dx;
    const dy_dx = slope * dθdx;
    return (Math.atan2(dy_dx, 1) * 180) / Math.PI;
  });

  useEffect(() => {
    const controls = animate(x, endX, {
      duration: type.speed,
      ease: "linear",
    });

    return () => controls.stop();
  }, [x, startX, endX, type.speed]);

  return (
    <motion.div style={{ x, y }} className="character">
      <div className="name">{name}</div>
      <motion.div
        className={className}
        style={{
          backgroundImage: `url(${type.asset})`,
          rotate: type.movement === "air" ? rotation : 0,
        }}
      />
    </motion.div>
  );
}

export default Character;
