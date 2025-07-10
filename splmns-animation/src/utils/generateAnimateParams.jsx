export function generateMotionParams(movement = "ground") {
  const screenWidth = window.innerWidth;

  let y,
    startX = 0,
    endX = screenWidth;

  if (movement === "air") {
    y = 0;
  } else {
    y = 0;
  }

  return {
    startX,
    endX,
    y,
  };
}
