import React from "react";

class Card extends React.Component {
  render() {
    const {
      healthLabels,
      label,
      image,
      source,
      url,
      calories,
    } = this.props.recipe;

    const title = label.length < 23 ? label : label.slice(0, 23) + "...";

    healthLabels.length = 5;
    return (
      <div>
        <div className="card">
          <div className="image-wrap">
            <div className="image-cover">
              <div className="card-title">
                <p>{source}</p>
              </div>
            </div>
            <img src={image} alt={title}></img>
          </div>
          <div className="card-info">
            <div className="info-text">
              <h3>{title}</h3>

              <ul>
                {healthLabels.map((value, index) => {
                  return <li key={index}>{value}</li>;
                })}
              </ul>
              <p>calories: {calories.toString().match(/\w+/)[0]}</p>
            </div>
            <div className="button-wrap">
              <a href={url} target="_blank" rel="noopener noreferrer">
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
