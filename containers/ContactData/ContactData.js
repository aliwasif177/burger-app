import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../Store/index";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import Button from "../../components/UI/Button/Button";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import "./ContactData.css";
import Input from "../../components/UI/Forms/Input/Input";
import { Redirect } from "react-router-dom";

class ContactData extends Component {
  componentDidMount() {
    this.props.loadForm();
  }

  orderHandler = (event, auth) => {
    event.preventDefault();
    const formdata = {};
    for (let formElementIdentifier in this.props.orderForm) {
      formdata[formElementIdentifier] = this.props.orderForm[
        formElementIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formdata,
      userId: this.props.userId
    };
    this.props.orderHandler(order, auth);
  };

  render() {
    let formElementsArray = [];
    for (let key in this.props.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.props.orderForm[key]
      });
    }
    let error = null;
    if (this.props.error) {
      error = this.props.error;
    }
    let form = <Spinner />;
    if (this.props.purchased) {
      form = <Redirect to="/" />;
    } else if (!this.props.loading) {
      form = (
        <form
          onSubmit={event => this.orderHandler(event, this.props.auth)}
          style={{ marginTop: "150px" }}
        >
          {error}

          <h4>Enter Your Contact Data</h4>
          {formElementsArray.map(formElement => {
            return (
              <Input
                key={formElement.id}
                invalid={!formElement.config.valid}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={event =>
                  this.props.inputChangedHandler(event, formElement.id)
                }
              />
            );
          })}

          <Button btnType="Success">ORDER</Button>
        </form>
      );
    }
    return <div className="ContactData">{form}</div>;
  }
}
const mapPropsToState = state => {
  return {
    ingredients: state.ing.ingredients,
    totalPrice: state.ing.totalPrice,
    orderForm: state.ord.orderForm,
    loading: state.ord.loading,
    purchased: state.ord.purchased,
    auth: state.auth.token,
    userId: state.auth.userId,
    error: state.ord.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    loadForm: () => dispatch(actionCreators.loadForm()),
    inputChangedHandler: (event, id) =>
      dispatch(actionCreators.inputChange(event, id)),
    orderHandler: (order, auth) =>
      dispatch(actionCreators.orderConfirm(order, auth))
  };
};
export default connect(
  mapPropsToState,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
