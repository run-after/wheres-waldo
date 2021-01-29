import image from '../media/maps_troy.jpeg';
import '../styles/Picture.css';
import { useEffect } from 'react';

const Picture = () => {
  // will proabaly put this into state
  let characters = ['waldo', 'wanda', 'odlaw', 'wizz'];

  const popUpSelection = (coords) => {
    const div = document.createElement('div');
    div.classList.add('selector');    
    div.style = `left: ${coords.x}px; top: ${coords.y}px;`;
    const pic = document.querySelector('.picture');
    pic.appendChild(div);
  };

  useEffect(() => {
    const img = document.getElementById('image');
    
    img.addEventListener('click', (e) => {
      popUpSelection({x: (e.layerX - 25), y: (e.layerY - 25)});
    })

  }, []);

  

  

  return (
    <div className='picture'>
      <img id='image' src={image} alt='Troy' />
    </div>
  );
};

export default Picture;