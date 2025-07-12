import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import "./Character.css";

function Character({ name, type }) {
  const startX = -300;
  const endX = window.innerWidth + 300;
  const x = useMotionValue(startX);
  const amplitude = -550;
  const theta = useTransform(x, [startX, endX], [0, Math.PI]);
  const arcY = useTransform(theta, (t) => amplitude * Math.sin(t));
  const className = type.movement === "ground" ? "sprite-ground" : "sprite-air";
  const y = type.movement === "air" ? arcY : 75;

  const rotation = useTransform(theta, (t) => {
    const slope = amplitude * Math.cos(t);
    const dx = endX - startX;
    const dθdx = Math.PI / dx;
    const dy_dx = slope * dθdx;
    return (Math.atan2(dy_dx, 1) * 180) / Math.PI;
  });

  useEffect(() => {
    let isMounted = true;

    const loopAnimation = async () => {
      while (isMounted) {
        x.set(startX);
        await animate(x, endX, {
          duration: type.speed,
          ease: "linear",
        }).finished;
      }
    };

    loopAnimation();

    return () => {
      isMounted = false;
    };
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
