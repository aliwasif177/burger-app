import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import * as actionCreators from "../../Store/index";
import Burgur from "../../components/Burgur/Burgur";
import BuildControls from "../../components/Burgur/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burgur/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";

class BurgurBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    me: ""
  };
  purchasableIngredient = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };
  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  };
  purchaseHandler = () => {
    this.props.auth
      ? this.setState({
          purchasing: true
        })
      : this.props.history.push("/Auth");
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  componentDidMount() {
    this.props.getIngredients();
  }

  render() {
    const disabledInfo = {
      ...this.props.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burgur = this.props.error ? (
      <p style={{ textAlign: "center" }}>Ingredients can't be added</p>
    ) : (
      <Spinner />
    );
    if (this.props.ingredients) {
      burgur = (
        <Aux>
          {/* <Input onChange={} /> */}
          <Burgur ingredient={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.addIngredientHandler}
            ingredientDrop={this.props.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchase={this.purchasableIngredient(this.props.ingredients)}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          purchasingCancelled={this.purchaseCancelHandler}
          purchasingContinue={this.purchaseContinueHandler}
          summaryPrice={this.props.totalPrice}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burgur}
      </Aux>
    );
  }
}
const mapStateToProps = state => {
  return {
    ingredients: state.ing.ingredients,
    totalPrice: state.ing.totalPrice,
    error: state.ing.error,
    auth: state.auth.token
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addIngredientHandler: type => dispatch(actionCreators.addIngredients(type)),
    removeIngredientHandler: type =>
      dispatch(actionCreators.removeIngredients(type)),
    getIngredients: () => dispatch(actionCreators.loadIngredients()),
    onInitPurchase: () => dispatch(actionCreators.purchaseInit())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgurBuilder, axios));
