import React from "react";
import Card from "./Card";
import Preloader from "./Preloader";
import firebase from "../firebaseConfig";
import { recipeData } from "../recipeApi.js";
import { uploadImage } from "../uploadImage.js";
import ImageScanner from "./ImageScanner";
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      searchTitle: null,
      searchData: null,
      visionFoodData: null,
      imageId: null,
      showLoader: false,
      isFood: true,
      showCards: false,
      foodImage: null,
    };
  }

  clickChangeInput = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handleChange = (event) => {
    this.setState({ showCards: false });
    const removeFromFoods = [
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
      "diner",
      "temple emanu-el",
    ];
    const image = event.target.files[0];

    this.setState({ showLoader: true, foodImage: URL.createObjectURL(image) });
    const upload = uploadImage(image);

    upload.then(([data, docId]) => {
      if (data) {
        data = data.filter((food) => !removeFromFoods.includes(food));
        this.setState({ visionFoodData: data, imageId: docId, isFood: true });
        this.getRecipes();
      } else {
        this.setState({ showLoader: false, isFood: false });
      }
    });
  };

  getRecipes = () => {
    const recipes = recipeData(this.state.visionFoodData);

    recipes.then(([data, title]) => {
      this.setState({
        showLoader: false,
        searchTitle: title,
        searchData: data,
        showCards: true,
        foodImage: null,
      });

      this.removeImageFromDB();
    });
  };

  removeImageFromDB = () => {
    const db = firebase.firestore();
    console.log("deleted data from database");
    //delete data from database
    db.collection("image-data")
      .doc(this.state.imageId)
      .delete()
      .then(() => {
        console.log("removed image from bucket");
        //delete image from storage bucket
        firebase.storage().ref().child(this.state.imageId).delete();
      });
  };

  render() {
    let loader, title;
    const { showLoader, foodImage } = this.state;
    if (showLoader) {
      loader = <Preloader />;
    } else if (!this.state.isFood) {
      loader = <h3>I do not recognise this food!</h3>;
    } else if (this.state.showCards) {
      loader = <h3>Recipes found!</h3>;
      title = <h1>{this.state.searchTitle}</h1>;
    } else {
      title = null;
      loader = null;
    }

    let cards;
    if (this.state.showCards) {
      cards = this.state.searchData.map((value, index) => {
        return <Card key={index} recipe={value} />;
      });
    } else {
      cards = null;
    }

    return (
      <div>
        <div className="wrap">
          <div className="upload-image">
            <div className="title-wrap">
              <h1>Image Recipe Search</h1>
              <p>{foodImage ? 'Scanning Image...' : 'Upload an image of food.'}</p>
            </div>
            {foodImage ? (
              <ImageScanner image={foodImage} />
            ) : (
              <div>
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
              </div>
            )}

            <div className="loader-container">{loader}</div>
          </div>
          <div className="recipe-title">{title}</div>
          <div className="card-wrap">{cards}</div>
        </div>
      </div>
    );
  }
}

export default Main;
