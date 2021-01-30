import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/reset.css';
import firebase from 'firebase/app';

firebase.initializeApp({
  apiKey: "AIzaSyDfrvu6lFPHgpa-VfobKgF3leWgziYxpqg",
  authDomain: "where-s-waldo-f0b97.firebaseapp.com",
  projectId: "where-s-waldo-f0b97",
  storageBucket: "where-s-waldo-f0b97.appspot.com",
  messagingSenderId: "5481585257",
  appId: "1:5481585257:web:68f08a2aa08b0e968160f8"
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);