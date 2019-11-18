import firebase from "./firebaseConfig";

export async function uploadImage(image) {
  return new Promise((resolve, reject) => {
    const docId = `IMAGE_ID:${Math.floor(Math.random() * 100000000000)} `;
    const db = firebase.firestore();

    const uploadTask = firebase
      .storage()
      .ref(docId)
      .put(image);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, {
      error: err => reject(err),
      complete: () => getFirestoreData()
    });

    const getFirestoreData = () => {
      db.collection("image-data")
        .doc(docId)
        .onSnapshot(doc => {
          if (doc.exists) {
            resolve([doc.data().webResults, docId]);
          }
        });
    };
  });
}
