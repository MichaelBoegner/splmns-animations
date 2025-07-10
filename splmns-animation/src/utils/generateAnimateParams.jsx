export function generateMotionParams(movement = "ground") {
  const screenWidth = window.innerWidth;

  let y,
    startX = 0,
    endX = screenWidth + 300;

  if (movement === "air") {
    y = -150;
  } else {
    y = -70;
  }

  return {
    startX,
    endX,
    y,
  };
}
