import React from "react";
import { store } from "../../../index";
import "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";
import "./BuildControls.css";
const controls = [
  {
    label: "Cheese",
    type: "Cheese"
  },
  {
    label: "Meat",
    type: "Meat"
  },
  {
    label: "Bacon",
    type: "Bacon"
  },
  {
    label: "Salad",
    type: "Salad"
  }
];
const buildControls = props => {
  let storage = null;
  storage = store.getState();
  return (
    <div className="BuildControls">
      <p>
        Curren price : <strong>{props.price.toFixed(2)}</strong>
      </p>

      {controls.map(el => (
        <BuildControl
          key={el.label}
          label={el.label}
          added={() => props.ingredientAdded(el.type)}
          removed={() => props.ingredientDrop(el.type)}
          disable={props.disabled[el.type]}
          price={props.price}
        />
      ))}
      <button
        className="OrderButton"
        disabled={!props.purchase}
        onClick={() => props.ordered()}
      >
        {storage.auth.token ? "ORDER NOW" : "SignIn To Order"}
      </button>
    </div>
  );
};
export default buildControls;
