export function generateMotionParams(movement = "ground") {
  const screenWidth = window.innerWidth;

  let y,
    startX = -300,
    endX = screenWidth + 300;

  if (movement === "air") {
    y = -250;
  } else {
    y = -70;
  }

  return {
    startX,
    endX,
    y,
  };
}
