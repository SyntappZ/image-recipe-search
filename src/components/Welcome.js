import React from "react";
import Card from "./Card";
import Preloader from "./Preloader";
import firebase from "../firebaseConfig";
import { recipeData } from "../recipeApi.js";
import { uploadImage } from "../uploadImage.js";
import { thisTypeAnnotation } from "@babel/types";

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      visionFoodData: null,
      imageId: null,
      showLoader: false,
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

  clickChangeInput = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handleChange = event => {
    const image = event.target.files[0];
    this.setState({ showLoader: true });
    const upload = uploadImage(image);

    upload
      .then(([data, docId]) => {
        data = data.filter(food => !this.state.removeFoods.includes(food));
        this.setState({ visionFoodData: data, imageId: docId });
      })
      .then(() => {
        this.getRecipes();
        this.removeImageFromDB();
      });
  };

  getRecipes = () => {
    const recipes = recipeData(this.state.visionFoodData);

    recipes.then(data => {});
    console.log(this.state.imageId);
    console.log(this.state.visionFoodData);
  };

  removeImageFromDB = () => {};

  render() {
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
           <button className="btn button-glow" onClick={this.clickChangeInput}>
             upload
             <i class="fas fa-upload"></i>
           </button>
           </div>
          
           <Preloader showLoader={this.state.showLoader}/>
         </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
