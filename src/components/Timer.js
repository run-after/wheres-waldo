import formatTime from '../scripts/formatTime';
import { useState } from 'react';
import '../styles/Timer.css';
import firebase from 'firebase/app';
import 'firebase/firestore';

const Timer = (props) => {

  const db = firebase.firestore();
  const troy = db.collection('Troy');

  const [timer, setTimer] = useState({
    timeStart: 0,
    time: 0
  });

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

    // This updates timer on screen
    setInterval(() => {
      setTimer({
        timeStart: startTime,
        time: new Date().getTime() - startTime
      });
    }, 10);
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
      {formatTime(timer.time)}
    </div>
  )

};

export default Timer;