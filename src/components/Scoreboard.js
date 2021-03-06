import '../styles/Scoreboard.css';
import formatTime from '../scripts/formatTime';
import firebase from 'firebase/app';
import 'firebase/firestore';

const Scoreboard = (props) => {
 
  const db = firebase.firestore();

  let scores;

  db.collection(props.map).doc('hiScores').get().then((doc) => {
    scores = doc.data();
  }).then(() => {
    let index = scores.scores.findIndex(i => props.score < i.time); 
    const player = { name: props.name, time: props.score };
    if (index > -1) {
      scores.scores.splice(index, 0, player);
      scores.scores.pop();
      // Write scores to DB
      db.collection(props.map).doc('hiScores').set(scores);
    };
  }).then(() => {
    // display existing scores
    scores.scores.forEach((x,i) =>{
      const place = document.getElementById(i + 1);
      const name = place.querySelector('.name');
      name.textContent = scores.scores[i].name;
      const time = place.querySelector('.time');
      time.textContent = formatTime(scores.scores[i].time);
    });
  });

  const timer = document.querySelector('.timer');
  timer.textContent = formatTime(props.score);

  // Delete start/stop time from DB
  db.collection(props.map).doc(firebase.auth().currentUser.uid).delete();

  return (
    <div className='scoreboard'>
      <button className='restart-btn' onClick={()=>window.location.reload()}>Restart</button>
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