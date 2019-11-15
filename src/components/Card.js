import React from 'react';

class Card extends React.Component {

    constructor(props) {
        super(props);
       
      }
     
  
    render() {
      return (
        <div>
      <h1>{this.props.welcome}</h1>
      </div>
      );
    }
  }

  export default Card