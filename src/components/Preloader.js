import React, { Component } from "react";
import preLoader from '../preLoader.svg'


class Preloader extends Component {
  constructor(props) {
    super(props);
    this.state = {
       
    }
  }
  render() {
    return(
       
        <div>
          <h3 className="preloader-text">Scanning Image...</h3>
          <img src={preLoader} alt="pre loader"></img>
        </div>
      
    );
  }
}

export default Preloader;
