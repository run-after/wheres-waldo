import Timer from './Timer';
import '../styles/Header.css';
import firebase from 'firebase';
import 'firebase/storage';// not sure if doing anything


const Header = (props) => {

  const storage = firebase.storage();
  const storageRef = storage.ref();

  // Figure out a way to DRY this up

  storageRef.child('waldo.png').getDownloadURL().then((url) => {
    const waldo = document.querySelector('#waldo-img');
    waldo.setAttribute('src', url);
  }).catch((error) => {
    console.log(error)
  });

  storageRef.child('wilma.png').getDownloadURL().then((url) => {
    const waldo = document.querySelector('#wilma-img');
    waldo.setAttribute('src', url);
  }).catch((error) => {
    console.log(error)
  });

  storageRef.child('odlaw.png').getDownloadURL().then((url) => {
    const waldo = document.querySelector('#odlaw-img');
    waldo.setAttribute('src', url);
  }).catch((error) => {
    console.log(error)
  });

  storageRef.child('wizard.png').getDownloadURL().then((url) => {
    const waldo = document.querySelector('#wizard-img');
    waldo.setAttribute('src', url);
  }).catch((error) => {
    console.log(error)
  });

  return (
    <div className='header'>
      <div className='character-container'>
        <h6>Characters</h6>
        <div className='characters'>
          <img id='waldo-img' alt='waldo'/>
          <img id='wilma-img' alt='wilma'/>
          <img id='odlaw-img' alt='odlaw'/>
          <img id='wizard-img' alt='wizard'/>
        </div>
      </div>
      <Timer setName={props.setName}/>
    </div>
    
  )

};

export default Header;