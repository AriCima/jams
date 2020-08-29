import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';  

// REAL TIME DATABASE : https://www.youtube.com/watch?v=noB98K6A0TY

// Initialize Firebase
var config = {
  apiKey: "AIzaSyC1mrq3vi-l49QxShQKF3DyO1fDzv4eFlY",
  authDomain: "jammint2-6a409.firebaseapp.com",
  databaseURL: "https://jammint2-6a409.firebaseio.com",
  projectId: "jammint2-6a409",
  storageBucket: "jammint2-6a409.appspot.com",
  messagingSenderId: "441787301493"
};

// const realTimeDB = firebase.database().ref().child('object');


firebase.initializeApp(config);
export default firebase;