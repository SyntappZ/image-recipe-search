import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();


const vision = require("@google-cloud/vision");
//import * as vision from "@google-cloud/vision"
const visionClient = new vision.ImageAnnotatorClient();

// Dedicated bucket for cloud function invocation
const bucketName = "vision-camera-bucket";

export const imageTagger = functions.storage

  .bucket(bucketName)
  .object()
  .onFinalize(async (object, _context) => {
    const filePath = object.name || "";

    const imageUri = `gs://${bucketName}/${filePath}`;

    const docId = filePath.split(".jpg")[0];

    const docRef = admin
      .firestore()
      .collection("photos")
      .doc(docId);

    const results = await visionClient.labelDetection(imageUri);

    const labels = results[0].labelAnnotations.map(
      (obj: { description: string }) => obj.description
    );
    const food = labels.includes("Food");


    //if labels have food check web detection results
    if (food) {
      const [webResult] = await visionClient.webDetection(imageUri);
      const webDetection = webResult.webDetection;
      const webResults = webDetection.webEntities.map(
        (webEntity: { description: string }) => webEntity.description
      );
      return docRef.set({ webResults, labels });
    } else {
      return docRef.set({ webResults: "false" });
    }
  });
