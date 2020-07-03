import React from "react";
import "./Input.css";
const input = props => {
  let inputElement = null;
  switch (props.elementType) {
    case " input":
      inputElement = (
        <input
          className="InputElement"
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case " textarea":
      inputElement = (
        <textarea
          className="InputElement"
          {...props.elementConfig}
          onChange={props.changed}
          value={props.value}
          className="InputElement"
        />
      );
      break;
    case "select":
      inputElement = (
        <select className="InputElement" onChange={props.changed}>
          {props.elementConfig.options.map(option => {
            return (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          {...props.elementConfig}
          value={props.value}
          className="InputElement"
          onChange={props.changed}
        />
      );
  }

  return <div className="Input">{inputElement}</div>;
};
export default input;
