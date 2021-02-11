import '../styles/Picture.css';
import { useState, useEffect } from 'react';
import firebase from 'firebase';
import Scoreboard from './Scoreboard';

const Picture = (props) => {

  const [score, setScore] = useState(0);

  const characters = props.characters;

  const db = firebase.firestore();

  // I can have a screen before this displays giving choices of maps
  // I can pass in the choice of map via props when this is rendered
  const storage = firebase.storage();
  const storageRef = storage.ref('maps_troy.jpeg');

  let timeStart;
  let timeEnd;

  const loadMap = () => {
    storageRef.getDownloadURL().then((url) => {
      const pic = document.querySelector('#image');
      pic.setAttribute('src', url);
    }).catch((error) => {
      console.log(error)
    });
  };
  
  const isGameOver = () => {
    return Object.keys(characters).length === 0;
  };

  const popUpSelection = (event) => {
    const currentSelector = document.querySelector('.selector');
    if (currentSelector) { currentSelector.remove() };
    
    const x = event.layerX;
    const y = event.layerY;
    const selector = document.createElement('div');
    selector.classList.add('selector');    
    selector.style = `left: ${x - 25}px; top: ${y - 25}px;`;
    const pic = document.querySelector('.picture');
    pic.appendChild(selector);
  };

  const dropDownSelection = (event) => {
    const currentMenu = document.querySelector('.menu');
    if (currentMenu) { currentMenu.remove() };
    
    const x = event.layerX;
    const y = event.layerY;
    const menu = document.createElement('div');
    menu.classList.add('menu');
    menu.style = `left: ${x + 25}px; top: ${y + 25}px;`;
    Object.keys(characters).forEach((person) => {
      const btn = document.createElement('button');
      btn.classList.add('person-selector');
      btn.textContent = person;
      btn.value = person;
      menu.appendChild(btn);
      btn.addEventListener('click', () => {
        makeGuess(person, x, y);
      });
    });
    const pic = document.querySelector('.picture');
    pic.appendChild(menu);
  };

  const makeGuess = (person, x, y) => {
    const menu = document.querySelector('.menu');
    const selector = document.querySelector('.selector');
    if((x >= characters[person].x - 25 && x <= characters[person].x + 25) &&
      (y >= characters[person].y - 30 && y <= characters[person].y + 30)) {
      const char = document.querySelector(`#${person}-img`);
      char.style = 'opacity: 0.25;';
      delete characters[person];
      menu.remove();
      selector.classList.remove('selector');
      selector.classList.add('correct');

      if (isGameOver()) {
        timeEnd = new Date().getTime();
        // Read timeStart from DB
        db.collection('Troy').doc(firebase.auth().currentUser.uid).get().then((doc) => {
          timeStart = doc.data().timeStart;
          //Set end time to DB
          db.collection('Troy').doc(firebase.auth().currentUser.uid).set({
            timeStart: timeStart,
            timeEnd: new Date().getTime()
          }).then(() => {
            setScore(timeEnd - timeStart);
          }).then(() => {
            firebase.auth().signOut().then(() => {
            console.log('signed out');
            });
          });
        });
        const timer = document.querySelector('.timer');
        // stop timer
        timer.textContent = '';
      };
    } else {
      menu.remove();
      selector.remove();
      console.log('Wrong');
    };
  };

  useEffect(() => {
    const img = document.getElementById('image');
    
    img.addEventListener('click', (e) => {
      popUpSelection(e);
      dropDownSelection(e);
    });

    loadMap();

  }, []);
  // If map is passed in via props, so too would this 'alt'
  return (
    <div className='picture'>
      <img id='image' alt='Troy' />
      {isGameOver() && <Scoreboard score={score} name={props.name}/>}
    </div>
  );
};

export default Picture;