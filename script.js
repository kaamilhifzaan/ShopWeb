const track = document.getElementById("image-track");

function handleOnDown(clientX) {
  track.dataset.mouseDownAt = clientX;
}

function handleOnUp() {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage || "0";
}

function handleOnMove(clientX) {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - clientX;
  const maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100;
  const nextPercentageUnconstrained =
    parseFloat(track.dataset.prevPercentage || "0") + percentage;

  const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  track.dataset.percentage = nextPercentage;
  track.style.transform = `translate(${nextPercentage}%, -50%)`;
}


window.onmousedown = e => handleOnDown(e.clientX);
window.onmouseup = () => handleOnUp();
window.onmousemove = e => handleOnMove(e.clientX);


window.ontouchstart = e => handleOnDown(e.touches[0].clientX);
window.ontouchend = () => handleOnUp();
window.ontouchmove = e => handleOnMove(e.touches[0].clientX);
