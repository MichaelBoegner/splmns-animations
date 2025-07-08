export function generateMotionParams(movement = "ground") {
  const screenWidth = window.innerWidth;

  let y,
    startX = -200,
    endX = screenWidth + 200;

  if (movement === "air") {
    y = -800;
  } else {
    y = -230;
  }

  return {
    startX,
    endX,
    y,
  };
}
