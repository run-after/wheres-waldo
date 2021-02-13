import './styles/App.css';
import Picture from './components/Picture';
import Header from './components/Header';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useEffect, useState } from 'react';

function App(props) {

  const [name, setName] = useState('');

  const db = firebase.firestore();

  const [characters, setCharacters] = useState({});

  // get all coords from DB and set them in characters object
  const loadCharacters = () => {
    let tempCharacters = {};
    db.collection(props.map).doc('listOfCharacters').get().then((doc) => {
      const charArray = doc.data().characters;
      charArray.forEach((character) => {
        db.collection(props.map).doc('characters')
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
    <div className='app'>
      <Header setName={setName} map={props.map}/>
      {
        Object.keys(characters).length === 4 &&
        <Picture characters={characters} name={name} map={props.map} />
      }
    </div>
  );
};

export default App;