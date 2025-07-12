export function generateMotionParams(movement = "ground") {
  const screenWidth = window.innerWidth;

  let y,
    startX = -300,
    endX = screenWidth + 300;

  if (movement === "air") {
    y = -200;
  } else {
    y = 50;
  }

  return {
    startX,
    endX,
    y,
  };
}
