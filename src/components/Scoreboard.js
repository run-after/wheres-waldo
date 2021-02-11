import '../styles/Scoreboard.css';
import firebase from 'firebase';

const Scoreboard = (props) => {
 
  const db = firebase.firestore();

  let scores;

  db.collection('Troy').doc('hiScores').get().then((doc) => {
    scores = doc.data();
  }).then(() => {
    let index = scores.scores.findIndex(i => props.score < i.time); 
    const player = { name: props.name, time: props.score };
    if (index > -1) {
      scores.scores.splice(index, 0, player);
      scores.scores.pop();
      // Write scores to DB
    db.collection('Troy').doc('hiScores').set(scores).then(() => {
      console.log('written');
    });
    };
  }).then(() => {
    // display existing scores
    scores.scores.forEach((x,i) =>{
      const place = document.getElementById(i + 1);
      const name = place.querySelector('.name');
      name.textContent = scores.scores[i].name;
      const time = place.querySelector('.time');
      time.textContent = formatTimer(scores.scores[i].time);
    });
  });

  // Maybe can move this to a different module... this and from Timer
  const formatTimer = (time) => {
    if (time === 9999999999) {
      return '99:99:99';
    } else {
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
    }
  };

  const timer = document.querySelector('.timer');
  timer.textContent = formatTimer(props.score);

  return (
    <div className='scoreboard'>
      <div className='banner'>
        <span className='place'>Place</span>
        <span className='name'>Name</span>
        <span className='time'>Time</span>
      </div>
      <div className='score-spot' id='1'>
        <span className='place'>1</span>
        <span className='name'></span>
        <span className='time'></span>
      </div>
      <div className='score-spot' id='2'>
        <span className='place'>2</span>
        <span className='name'></span>
        <span className='time'></span>
      </div>
      <div className='score-spot' id='3'>
        <span className='place'>3</span>
        <span className='name'></span>
        <span className='time'></span>
      </div>
      <div className='score-spot' id='4'>
        <span className='place'>4</span>
        <span className='name'></span>
        <span className='time'></span>
      </div>
      <div className='score-spot' id='5'>
        <span className='place'>5</span>
        <span className='name'></span>
        <span className='time'></span>
      </div>
      <div className='score-spot' id='6'>
        <span className='place'>6</span>
        <span className='name'></span>
        <span className='time'></span>
      </div>
      <div className='score-spot' id='7'>
        <span className='place'>7</span>
        <span className='name'></span>
        <span className='time'></span>
      </div>
      <div className='score-spot' id='8'>
        <span className='place'>8</span>
        <span className='name'></span>
        <span className='time'></span>
      </div>
      <div className='score-spot' id='9'>
        <span className='place'>9</span>
        <span className='name'></span>
        <span className='time'></span>
      </div>
      <div className='score-spot ten' id='10'>
        <span className='place'>10</span>
        <span className='name'></span>
        <span className='time'></span>
      </div>
    </div>
  );

};

export default Scoreboard;