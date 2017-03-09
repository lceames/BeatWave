export const formatTime = (totalSeconds) => {
  let seconds = (totalSeconds % 60).toString();
  let minutes = Math.floor(totalSeconds / 60).toString();
  if (seconds.length < 2) {
    seconds = "0" + seconds;
  }
  return `${minutes}:${seconds}`;
};
