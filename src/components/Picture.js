import '../styles/Picture.css';
import { useEffect } from 'react';
import firebase from 'firebase';

const Picture = (props) => {

  const characters = props.characters;

  const db = firebase.firestore();

  // I can have a screen before this displays giving choices of maps
  // I can pass in the choice of map via props when this is rendered
  const storage = firebase.storage();
  const storageRef = storage.ref('maps_troy.jpeg');

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
      char.style = 'opacity: 0.5;';
      delete characters[person];
      menu.remove();
      selector.classList.remove('selector');
      selector.classList.add('correct');

      if (isGameOver()) {
        let timeStart;
        let endTime = new Date().getTime();
        // Read timeStart from DB
        db.collection('Troy').doc(firebase.auth().currentUser.uid).get().then((doc) => {
          timeStart = doc.data().timeStart;
          //Set end time to DB
          db.collection('Troy').doc(firebase.auth().currentUser.uid).set({
            timeStart: timeStart,
            timeEnd: new Date().getTime()
          }).then(() => {
            // Show scoreboard, don't alert
            alert(`You win! Time is: ${formatTimer(endTime - timeStart)}`);
          }).then(() => {
            firebase.auth().signOut().then(() => {
            console.log('signed out');
            });
          });
        });
        const timer = document.querySelector('.timer');
        // stop timer
        timer.textContent = timer.textContent;
      };
    } else {
      menu.remove();
      selector.remove();
      console.log('Wrong');
    };
  };

  // Maybe can move this to a different module... this and from Timer
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
    </div>
  );
};

export default Picture;