import './styles/App.css';
import Picture from './components/Picture';
import Header from './components/Header';
import firebase from 'firebase';
import { useEffect } from 'react';

function App() {
  // Sign in anonymously
  useEffect(() => {
    firebase.auth().signInAnonymously().then(() => {
      console.log('signedin as', firebase.auth().currentUser.uid);
    }).catch((error) => {
      console.log(error)
    });    
  },[]);

  return (
    <div className='container'>
      <Header />
      <Picture />
    </div>
  );
};

export default App;

// signing in ANON
// write startTime to DB
// when finished, write endTime to DB