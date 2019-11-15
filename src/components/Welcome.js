import React from "react";
import Card from "./Card";

import { recipeData } from "../recipeData.js";
import { uploadImage } from "../uploadImage.js";

class Welcome extends React.Component {
  constructor(props) {
    super(props);

    
    this.handleChange = this.handleChange.bind(this);
    
  }

  clickChangeInput = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handleChange = event => {
    const image = event.target.files[0];

    const upload = uploadImage(image);

    upload.then(data => {
      //console.log(data)
    });

    // recipes.then((data) => {
    //   console.log(data)
    // })
  };

  render() {
    return (
      <div>
        <header className="App-header">
          <input
            type="file"
            id="imageInput"
            onChange={this.handleChange}
            hidden="hidden"
          ></input>
          <button className="btn" onClick={this.clickChangeInput}>
            select image
          </button>
          <Card welcome="Image" />
        </header>
      </div>
    );
  }
}

export default Welcome;
