import React from "react";
import Card from "./Card";
import Preloader from "./Preloader";
import firebase from "../firebaseConfig";
import { recipeData } from "../recipeApi.js";
import { uploadImage } from "../uploadImage.js";
import { thisTypeAnnotation } from "@babel/types";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      visionFoodData: null,
      imageId: null,
      showLoader: false,
      isFood: true,
      removeFoods: [
        "breakfast",
        "dinner",
        "lunch",
        "eating",
        "restaurant",
        "snack",
        "dessert",
        "hotel",
        "meal",
        "cooking",
        "diner"
      ]
    };
  }
  // this.setState({ showLoader: true });
  clickChangeInput = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handleChange = event => {
    const image = event.target.files[0];
    this.setState({ showLoader: true });
    const upload = uploadImage(image);

    upload.then(([data, docId]) => {
      if (data) {
        data = data.filter(food => !this.state.removeFoods.includes(food));
        this.setState({ visionFoodData: data, imageId: docId, isFood: true });
        this.getRecipes();
        this.removeImageFromDB();
      } else {
        this.setState({ showLoader: false, isFood: false });
      }
    });
  };

  getRecipes = () => {
    const recipes = recipeData(this.state.visionFoodData);

    recipes.then(data => {
      console.log(data);
      this.setState({ showLoader: false });
    });
  };

  removeImageFromDB = () => {
    const db = firebase.firestore();

    //delete data from database
    db.collection("image-data")
      .doc(this.state.imageId)
      .delete()
      .then(() => {
        //delete image from storage bucket
        var storage = firebase.storage();
        var storageRef = storage.ref();
        var imageRef = storageRef.child(this.state.imageId);
        imageRef.delete();
      });
  };

  render() {
    let loader;
    if (this.state.showLoader) {
      loader = <Preloader />;
    } else if (!this.state.isFood) {
      loader = <h3>This is not food!</h3>;
    } else {
      loader = null;
    }

    return (
      <div>
        <div className="wrap">
          <div className="upload-image">
            <div className="title-wrap">
              <h1>Image Recipe Search</h1>
              <p>Upload an image of food.</p>
            </div>
            <input
              type="file"
              id="imageInput"
              onChange={this.handleChange}
              hidden="hidden"
            ></input>
            <div className="btn-wrap">
              <button
                className="btn button-glow"
                onClick={this.clickChangeInput}
              >
                upload
                <i className="fas fa-upload"></i>
              </button>
             
            </div>
            <div className="loader-container">{loader}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
