export function generateMotionParams(movement = "ground") {
  const screenWidth = window.innerWidth;

  let y,
    startX = -200,
    endX = screenWidth + 20;

  if (movement === "air") {
    y = -800;
  } else {
    y = -205;
  }

  return {
    startX,
    endX,
    y,
  };
}
