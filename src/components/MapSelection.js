import '../styles/MapSelection.css';
import App from '../App';
import { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';

const MapSelection = () => {

  const [map, setMap] = useState('');
  const [isReady, setIsReady] = useState(false);


  const storage = firebase.storage();
  const troyRef = storage.ref('troy.jpeg');
  troyRef.getDownloadURL().then((url) => {
    const pic = document.querySelector(`#troy-selection`);
    pic.setAttribute('src', url);
  }).catch((error) => {
    console.log(error)
    window.location.reload();
  });
  const giantsRef = storage.ref('giants.jpeg');
  giantsRef.getDownloadURL().then((url) => {
    const pic = document.querySelector(`#giants-selection`);
    pic.setAttribute('src', url);
  }).catch((error) => {
    console.log(error)
    window.location.reload();
  });
  
  const handleSelection = (name) => {
    setMap(name);
    setIsReady(true);
  };
  
  return (
    <div className='container'>
      <div className='map-selection'>
        <div className='map-choice'>
          <img id='troy-selection' alt='troy' />
          <p>Troy</p>
          <button onClick={()=>handleSelection('troy')}>Select</button>
        </div>

        <div className='map-choice'>
          <img id='giants-selection' alt='giants' />
          <p>Giants</p>
          <button onClick={()=>handleSelection('giants')}>Select</button>
        </div>

        <div className='map-choice'>
          <img id='whatever-selection' alt='whatever'  />
          <p>Whatever</p>
          <button onClick={()=>handleSelection('whatever')}>Select</button>
        </div>
      </div>
      {isReady && <App map={map}/>}
    </div>
    
    
  )
};

export default MapSelection;