const track = document.getElementById("image-track");

function handleOnDown(clientX) {
  track.dataset.mouseDownAt = clientX;
  track.dataset.prevShift = track.dataset.shift || "0";
}

function handleOnUp() {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevShift = track.dataset.shift || "0";
}

function clampShift(shift) {
  const carousel = document.querySelector('.carousel') || document.documentElement;
  const containerWidth = carousel.clientWidth;
  const trackWidth = track.scrollWidth;
  const maxShift = Math.max((trackWidth - containerWidth) / 2, 0);
  return Math.min(Math.max(shift, -maxShift), maxShift);
}

function updateTransform(shift) {
  track.style.transform = `translate(calc(-50% + ${shift}px), -50%)`;
  track.dataset.shift = shift;
}

function handleOnMove(clientX) {
  if (track.dataset.mouseDownAt === "0") return;

  const startX = parseFloat(track.dataset.mouseDownAt);
  const prevShift = parseFloat(track.dataset.prevShift || "0");
  const delta = clientX - startX;

  const nextShiftUnconstrained = prevShift + delta;
  const nextShift = clampShift(nextShiftUnconstrained);

  updateTransform(nextShift);
}


track.addEventListener('pointerdown', e => {
  handleOnDown(e.clientX);
  try { track.setPointerCapture(e.pointerId); } catch (err) {}
});

track.addEventListener('pointermove', e => {
  handleOnMove(e.clientX);
});

track.addEventListener('pointerup', e => {
  handleOnUp();
  try { track.releasePointerCapture(e.pointerId); } catch (err) {}
});
track.addEventListener('pointercancel', e => {
  handleOnUp();
  try { track.releasePointerCapture(e.pointerId); } catch (err) {}
});


