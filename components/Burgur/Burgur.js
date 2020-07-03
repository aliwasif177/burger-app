import React from "react";
import "./Burgur.css";
import BurgurIngredient from "./BurgurIngredient/BurgurIngredient";
import "./BurgurIngredient/BurgurIngredient.css";
const burgur = props => {
  let transformedIngredient = Object.keys(props.ingredient)
    .map(igKey => {
      return [...Array(props.ingredient[igKey])].map((_, i) => {
        return <BurgurIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    });
  if (transformedIngredient.length === 0) {
    transformedIngredient = <p>Please add ingredients</p>;
  }
  return (
    <div className="Burgur">
      <BurgurIngredient type="BreadTop" />
      {transformedIngredient}

      <BurgurIngredient type="BreadBottom" />
    </div>
  );
};
export default burgur;
