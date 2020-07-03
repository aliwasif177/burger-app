import React, { Component } from "react";
import BurgurBuilder from "./containers/BurgerBuilder/BurgurBuilder";
import { connect } from "react-redux";
import * as actionCreators from "./Store/index";
import Layout from "./hoc/Layout/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import Auth from "./containers/Auth/Auth";

import { Route, Switch, Redirect } from "react-router-dom";
import CheckOut from "./containers/CheckOut/CheckOut";

import Orders from "./containers/Orders/Orders";

class App extends Component {
  componentDidMount() {
    this.props.onInit();
  }
  render() {
    let routes = (
      <Switch>
        <Route exact path="/" component={BurgurBuilder} />

        <Route component={Auth} path="/Auth" />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.auth) {
      routes = (
        <Switch>
          <Route exact path="/" component={BurgurBuilder} />
          <Route component={Auth} path="/Auth" />
          <Route path="/checkout" component={CheckOut} />

          <Route component={Orders} path="/orders" />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          <Switch>{routes}</Switch>
        </Layout>
      </div>
    );
  }
}
const mapDisptachToState = dispatch => {
  return {
    onInit: () => dispatch(actionCreators.initAuth())
  };
};
const mapStateToProps = state => {
  return {
    auth: state.auth.token
  };
};
export default connect(mapStateToProps, mapDisptachToState)(App);
