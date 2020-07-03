import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../../Store/index";

import CheckOutSummary from "../../components/Order/CheckOutSummary/CheckOutSummary";
import ContactData from "../ContactData/ContactData";
class CheckOut extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.push("/");
  };
  checkoutContinueddHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckOutSummary
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinueddHandler}
            ingredient={this.props.ingredients}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return <div>{summary}</div>;
  }
}
const mapStateToProps = state => {
  return {
    ingredients: state.ing.ingredients,
    purchased: state.ord.purchased
  };
};

export default connect(mapStateToProps)(CheckOut);
