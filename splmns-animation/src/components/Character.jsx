import { motion } from "framer-motion";
import "./Sprite.css";
import "./Character.css";

function Character({ name, type, motionParams }) {
  const className = type.movement === "ground" ? "sprite-ground" : "sprite-air";

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
