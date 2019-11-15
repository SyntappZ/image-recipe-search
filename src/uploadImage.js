



import * as firebase from 'firebase'
import { storage } from 'firebase'
//import db from "./firebaseInit";

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


  
    


  
  export function uploadImage(image) {
    return new Promise((resolve, reject) => {

       

       const docId = Math.floor(Math.random() * 1000000000).toString()

       

       
       // const reg = new RegExp(image.name)

        

       

      
      
    const uploadTask = firebase.storage().ref().put(image)
    console.log()

 //   const photoRef = db.collection("photos").doc(path)

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, {
        'complete': function() {
          console.log('upload complete!');


        }
      });

       // Create a reference to 'mountains.jpg'
      // const imageRef = storageRef.child();



       
     resolve(image)
    });
  }