import React, { Component } from "react";
import Spinner from "../../components/UI/Spinner/Spinner";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import { connect } from "react-redux";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionCreators from "../../Store/index";

class Orders extends Component {
  componentWillMount() {
    this.props.loadOrders(localStorage.getItem("Token"));
  }
  render() {
    let order = <Spinner />;
    if (!this.props.loading) {
      order = this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={+order.price}
        />
      ));
    }

    return <div>{order}</div>;
  }
}
const mapDispatchToProps = dispatch => {
  return {
    loadOrders: auth => dispatch(actionCreators.loadOrders(auth))
  };
};
const mapStateToProps = state => {
  return {
    orders: state.ord.orders,
    loading: state.ord.loading,
    auth: state.auth.token
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
