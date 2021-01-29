import image from '../media/maps_troy.jpeg';
import '../styles/Picture.css';
import { useEffect } from 'react';

const Picture = () => {
  // will proabaly put this into state
  let characters = ['waldo', 'wanda', 'odlaw', 'wizard'];

  const popUpSelection = (coords) => {
    const selector = document.createElement('div');
    selector.classList.add('selector');    
    selector.style = `left: ${coords.x}px; top: ${coords.y}px;`;
    const pic = document.querySelector('.picture');
    pic.appendChild(selector);
  };

  const dropDownSelection = (coords) => {
    const menu = document.createElement('div');
    menu.classList.add('menu');
    menu.style = `left: ${coords.x}px; top: ${coords.y}px;`;
    characters.forEach((person) => {
      const btn = document.createElement('button');
      btn.classList.add('person-selector');
      btn.textContent = person;
      btn.value = person;
      menu.appendChild(btn);
    })
    const pic = document.querySelector('.picture');
    pic.appendChild(menu);
  };


  useEffect(() => {
    const img = document.getElementById('image');
    
    img.addEventListener('click', (e) => {
      popUpSelection({ x: (e.layerX - 25), y: (e.layerY - 25) });
      dropDownSelection( {x: e.layerX + 25, y: e.layerY + 25})
    })

  }, []);

  return (
    <div className='picture'>
      <img id='image' src={image} alt='Troy' />
    </div>
  );
};

export default Picture;