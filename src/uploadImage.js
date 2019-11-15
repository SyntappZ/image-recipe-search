import * as firebase from "firebase";






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
    const docId = `IMAGE_ID:${Math.floor(Math.random() * 100000000000)} `;
    const db = firebase.firestore()
    

    const uploadTask = firebase
      .storage()
      .ref(docId)
      .put(image);
    

    //const photoRef = db.collection("photos").doc(docId);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, {
      complete: () => getVisionData()
    });


    const getVisionData = () => {
      db.collection('photos').get().then((snapshot) => {
       snapshot.docs.forEach(doc => {
         if(doc.id == docId) {
           console.log(doc)
         }
       })
      })
    
    }

    resolve(image);
  });
}
