import React from "react";
import Burgur from "../../Burgur/Burgur";

import Button from "../../UI/Button/Button";
import "./CheckOutSummary.css";
const checkOutSummary = props => {
  return (
    <div className="CheckOutSummary">
      <h1>We hope you like our service</h1>
      <div style={{ width: "100%", height: "300px", margin: "auto" }}>
        <Burgur ingredient={props.ingredient} />

        <Button btnType="Danger" clicked={props.checkoutCancelled}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={props.checkoutContinued}>
          Continue
        </Button>
      </div>
    </div>
  );
};
export default checkOutSummary;
