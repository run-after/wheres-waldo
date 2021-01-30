import '../styles/Picture.css';
import { useEffect } from 'react';
import firebase from 'firebase';

const Picture = () => {

  const storage = firebase.storage();
  const storageRef = storage.ref('maps_troy.jpeg');

  storageRef.getDownloadURL().then((url) => {
    const pic = document.querySelector('#image');
    pic.setAttribute('src', url);
  }).catch((error) => {
    console.log(error)
  });

  // will proabaly put this into state
  let characters = { 'waldo': { x: 474, y: 1548 }, 'wanda': { x: 2141, y: 1395 }, 'odlaw': {x: 2446, y: 1504}, 'wizard': {x: 818, y: 248} };

  const popUpSelection = (event) => {
    const x = event.layerX;
    const y = event.layerY;
    const selector = document.createElement('div');
    selector.classList.add('selector');    
    selector.style = `left: ${x - 25}px; top: ${y - 25}px;`;
    const pic = document.querySelector('.picture');
    pic.appendChild(selector);
  };

  const dropDownSelection = (event) => {
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
    if((x >= characters[person].x - 25 && x <= characters[person].x + 25) &&
      (y >= characters[person].y - 30 && y <= characters[person].y + 30)) {
      const char = document.querySelector(`#${person}-img`);
      char.style = 'opacity: 0.5;';
      delete characters[person];
      const menu = document.querySelector('.menu');
      const selector = document.querySelector('.selector');
      menu.remove();
      selector.remove();
    };
  };

  useEffect(() => {
    const img = document.getElementById('image');
    
    img.addEventListener('click', (e) => {
      popUpSelection(e);
      dropDownSelection(e);
    })

  }, []);

  return (
    <div className='picture'>
      <img id='image' alt='Troy' />
    </div>
  );
};

export default Picture;