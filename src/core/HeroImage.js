import React from "react";
const HeroImage = (props) => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const style = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    "max-height": "50vh",
  };

  return (
    <div style={style}>
      <img
        src={`https://unsplash.it/${width}/${height}?image=${props.number}`}
        style={style}
      />
    </div>
  );
};

export default HeroImage;
