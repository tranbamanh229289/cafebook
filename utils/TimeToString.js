const TimeToString = (created) => {
  const deltaTime = Math.floor(new Date().getTime() / 1000) - created;
  if (deltaTime <= 10) {
    return "Vừa xong";
  } else
  if (10 < deltaTime && deltaTime< 60) {
    return `${deltaTime}s`;
  } else
  if (60 <= deltaTime && deltaTime < 60 * 60) {
    return `${Math.floor(deltaTime / 60)}m`;
  } else
  if (60 * 60 <= deltaTime && deltaTime < 60 * 60 * 24) {
    return `${Math.floor(deltaTime / (60 * 60))}h`;
  } else
  if (60 * 60 * 24 <= deltaTime && deltaTime < 60 * 60 * 24 * 30) {
    return `${Math.floor(deltaTime / (60 * 60 * 24))} days`;
  } else
  if (60 * 60 * 24 * 30 <= deltaTime && deltaTime < 60 * 60 * 24 * 30 * 12) {
    return `${Math.floor(deltaTime / (60 * 60 * 24 * 30))} months`;
  } else
  if (60 * 60 * 24 * 30 * 12 <= deltaTime) {
    return `${Math.floor(deltaTime / (60 * 60 * 24 * 30 * 12))} months`;
  }
};

export default TimeToString;
