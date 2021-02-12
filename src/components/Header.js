import Timer from './Timer';
import '../styles/Header.css';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';


const Header = (props) => {

  const storage = firebase.storage();
  const storageRef = storage.ref();

  const db = firebase.firestore();

  let characters;

  db.collection(props.map).doc('listOfCharacters').get().then((doc) => {
    characters = doc.data().characters;
  }).then(() => {
    characters.forEach((character) => {
      storageRef.child(`${character}.png`).getDownloadURL().then((url) => {
        const characterImg = document.querySelector(`#${character}-img`);
        characterImg.setAttribute('src', url);
      }).catch((error) => {
        console.log(error)
      });
    });  
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
      <Timer setName={props.setName} map={props.map}/>
    </div>
    
  )

};

export default Header;