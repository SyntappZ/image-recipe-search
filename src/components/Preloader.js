import React, { Component } from "react";
import preLoader from '../preLoader.svg'


class Preloader extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        showLoader: props.showLoader  
    }
  }
  render() {
    return this.state.showLoader && (
       
        <div>
          <h3 className="preloader-text">Searching for matching recipes.</h3>
          <img src={preLoader}></img>
        </div>
      
    );
  }
}

export default Preloader;
