const formatTime = (time) => {
  const timeObj = new Date(time);
  const hours = String(timeObj.getHours()).padStart(2, 0);
  const minutes = String(timeObj.getMinutes()).padStart(2, 0);

  return `${hours}:${minutes}`;
}

export default formatTime;