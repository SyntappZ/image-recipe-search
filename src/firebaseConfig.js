import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyDiXntU5MVBNscHxgMUoNMny4ygkrkZrhM",
  authDomain: "vision-camera-1584b.firebaseapp.com",
  databaseURL: "https://vision-camera-1584b.firebaseio.com",
  projectId: "vision-camera-1584b",
  storageBucket: "vision-camera-bucket",
  messagingSenderId: "422441599874",
  appId: "1:422441599874:web:9ac460803a82ec4d65459b",
  measurementId: "G-54B3SXT7FS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase