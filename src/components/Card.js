import React from "react";


class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.recipe.label,
      image: this.props.recipe.image,
      calories: this.props.recipe.calories.toString().match(/\w+/)[0],
      source: this.props.recipe.source,
      healthLabels: this.props.recipe.healthLabels,
      url: this.props.recipe.url
    };
  }



  render() {
    // let healthLabels = this.state.healthLabels;
    let title = this.state.title
    const { healthLabels } = this.state
    if(title.length > 27) {
      title = title.split(' ').slice(0, 3).join(' ') + '...'
    }
    healthLabels.length = 5;
    return (
      <div>
        <div className="card">
          <div className="image-wrap">
            <div className="image-cover">
              <div className="card-title">
                <p>{this.state.source}</p>
              </div>
            </div>
            <img src={this.state.image} alt={this.state.title}></img>
          </div>
          <div className="card-info">
            <div className="info-text">
              <h3>{title}</h3>

              <ul>
                {healthLabels.map((value, index) => {
                  return <li key={index}>{value}</li>;
                })}
              </ul>
              <p>calories: {this.state.calories}</p>
            </div>
            <div className="button-wrap">
              <a href={this.state.url} target="_blank"  rel="noopener noreferrer">
                <div className="card-btn">recipe</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
