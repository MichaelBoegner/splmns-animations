import "./RainOverlay.css";

function RainOverlay() {
  const drops = Array.from(
    { length: 77 },
    () => Math.floor(Math.random() * 100) + 1
  );

  console.log("drops: ", drops);

  return (
    <div className="rain-overlay">
      {drops.map((i, index) => {
        const x = 0.01 * i * 1.2;
        const d = (i % 10) / 10;
        return (
          <div
            key={index}
            className="raindrop"
            style={{
              "--x": x,
              "--d": d,
            }}
          />
        );
      })}
    </div>
  );
}

export default RainOverlay;
