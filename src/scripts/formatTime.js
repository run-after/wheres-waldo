const formatTime = (time) => {
  let min = Math.floor(time / 60000);
    if (min > 59) {
      min = min % 60;
    };
    let sec = Math.floor(time / 1000);
    if (sec > 59) {
      sec = sec % 60;
    };
    let centiSec = Math.floor(time / 100);
    if (centiSec > 10) {
      centiSec = centiSec % 10;
    };
    let milSec = Math.floor(time / 10);
    if (milSec > 10) {
      milSec = milSec % 10;
    };
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}:${centiSec}${milSec}`;
};

export default formatTime;