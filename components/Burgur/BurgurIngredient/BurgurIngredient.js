import "./BurgurIngredient.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
class BurgurIngredient extends Component {
  render() {
    let ingredient = null;
    switch (this.props.type) {
      case "BreadBottom":
        ingredient = <div className="BreadBottom"></div>;
        break;
      case "BreadTop":
        ingredient = (
          <div className="BreadTop">
            <div className="Seeds1"></div>
            <div className="Seeds2"></div>
          </div>
        );
        break;
      case "Meat":
        ingredient = <div className="Meat"></div>;
        break;
      case "Cheese":
        ingredient = <div className="Cheese"></div>;
        break;
      case "Salad":
        ingredient = <div className="Salad"></div>;
        break;
      case "Bacon":
        ingredient = <div className="Bacon"></div>;
        break;
      default:
        ingredient = null;
    }
    return ingredient;
  }
}
BurgurIngredient.propTypes = { type: PropTypes.string.isRequired };

export default BurgurIngredient;
