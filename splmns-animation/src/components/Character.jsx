import { motion } from "framer-motion";
import "./Sprite.css";

function Character({ name, type, motionParams }) {
  const className = type.movement === "ground" ? "sprite-ground" : "sprite-air";

  return (
    <motion.div
      initial={{ x: motionParams.startX, y: motionParams.y }}
      animate={{ x: motionParams.endX }}
      transition={{ duration: type.speed, ease: "linear" }}
      style={{
        position: "absolute",
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pointerEvents: "none",
        zIndex: 75,
      }}
    >
      <div
        style={{
          color: "#fff",
          padding: "0.25rem 0.5rem",
          borderRadius: "4px",
          fontSize: "0.8rem",
        }}
      >
        {name}
      </div>
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
