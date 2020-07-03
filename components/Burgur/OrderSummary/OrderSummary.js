import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";
const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => (
    <li key={igKey}>
      <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
      {props.ingredients[igKey]}
    </li>
  ));

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>Your delecious burgur has folowing ingredients </p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Your total price is {props.summaryPrice}</strong>
      </p>
      <p>Continue to checkout</p>

      <Button btnType="Success" clicked={props.purchasingContinue}>
        Continue
      </Button>
      <Button btnType="Danger" clicked={props.purchasingCancelled}>
        Cancel
      </Button>
    </Aux>
  );
};
export default orderSummary;
