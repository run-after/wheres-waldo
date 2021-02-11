import './styles/App.css';
import Picture from './components/Picture';
import Header from './components/Header';
import firebase from 'firebase';
import { useEffect, useState } from 'react';

function App() {

  const [name, setName] = useState('');

  const db = firebase.firestore();

  const [characters, setCharacters] = useState({});

  // get all coords from DB and set them in characters object
  const loadCharacters = () => {
    let tempCharacters = {};
    db.collection('Troy').doc('listOfCharacters').get().then((doc) => {
      const charArray = doc.data().characters;
      charArray.forEach((character) => {
        db.collection('Troy').doc('characters')
          .collection(character)
          .doc('coords')
          .get()
          .then((doc) => {
            tempCharacters[character] = doc.data();
            if (Object.keys(tempCharacters).length === 4) {
              setCharacters(tempCharacters);
            };
        });
      });
    });
  };

  useEffect(() => {

    firebase.auth().signInAnonymously().catch((error) => {
      console.log(error)
    });   
    
    loadCharacters();

  }, []);

  return (
    <div className='container'>
      <Header setName={setName}/>
      {Object.keys(characters).length === 4 && <Picture characters={characters} name={name} />}
    </div>
  );
};

export default App;

// TODO:

// Make initial screen that allows selection of map
// in Picture - remove event listener after game over

// Timer - remove setInterval after game over

// Maybe add a restart button? After game over