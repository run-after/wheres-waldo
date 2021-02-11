import { useState } from 'react';
import '../styles/Timer.css';
import firebase from 'firebase/app';
import 'firebase/firestore';

const Timer = (props) => {

  const db = firebase.firestore();
  const troy = db.collection('Troy');

  const [timer, setTimer] = useState({
    timerOn: false,
    timeStart: 0,
    time: 0
  });
  // This is temporary. I will get startTime from DB
  const startTimer = () => {
    const name = document.querySelector('#name');
    props.setName(name.value);
    const blockOut = document.querySelector('.block-out-box');
    blockOut.remove();
    let startTime = new Date().getTime();
    // Save time start to DB
    troy.doc(firebase.auth().currentUser.uid).set({
      timeStart: startTime
    });
    ///////////////////////

    // This updates timer on screen
    setInterval(() => {
      setTimer({
        timerOn: true,
        timeStart: startTime,
        time: new Date().getTime() - startTime
      });
    }, 10);
  };

  const formatTimer = (time) => {
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

  return (
    <div className='timer'>
      <div className='block-out-box'>
        <h1>Click 'Start' to begin</h1>
        <p>Enter your name, then click start.</p>
        <p>Your timer will begin. Find all 4 characters.</p>
        <p>(found in upper right-hand corner)</p>
        <form onSubmit={startTimer}> 
          <input required={true} maxLength='15' id='name' type='text' placeholder='Please enter your name' />
          <button type='submit' className='start-button'>Start</button>
        </form>
        
      </div>
      {formatTimer(timer.time)}
    </div>
  )

};

export default Timer;