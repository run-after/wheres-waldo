import { useEffect, useState } from 'react';
import '../styles/Timer.css';
import firebase from 'firebase';
import 'firebase/firestore';// not sure if useful

const Timer = () => {

  const db = firebase.firestore();
  const troy = db.collection('Troy');

  //troy.doc('test').set({
  //  timeStart: 45
  //})

  const [timer, setTimer] = useState({
    timerOn: false,
    timeStart: 0,
    time: 0
  });
  // This is temporary. I will get startTime from DB
  const startTimer = () => {
    const blockOut = document.querySelector('.block-out-box');
    blockOut.remove();
    let startTime = new Date().getTime();
    // Save time start to DB
    troy.doc(firebase.auth().currentUser.uid).set({
      timeStart: startTime
    });
    ///////////////////////
    setInterval(() => {
      setTimer({
        timerOn: true,
        timeStart: startTime,
        time: new Date().getTime() - startTime
      })
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
        <h1>Click to begin</h1>
        <p>When you click start, your timer will begin. Find all 4 characters</p>
        <button className='start-button' onClick={startTimer}>Start</button>
      </div>
      {formatTimer(timer.time)}
    </div>
  )

};

export default Timer;