import React from "react";
import '../image.css'
const ImageScanner = ({ image }) => {
  return (
    <div>
      <div className="search-image-wrap">
          <div className="scanner-line"></div>
        <img src={image} alt="food" className="search-image" />
      </div>
    </div>
  );
};

export default ImageScanner;
