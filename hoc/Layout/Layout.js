import React, { Component } from "react";
import Aux from "../Aux";
import ToolBar from "../../components/Navigation/ToolBar/ToolBar";
import "../../containers/BurgerBuilder/BurgurBuilder.css";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import * as actionCreators from "../../Store/index";
import { connect } from "react-redux";

class Layout extends Component {
  state = { showSideDrawer: false };
  SideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false
    });
  };
  SideTogglerHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <ToolBar
          loggingOut={this.props.logOutHandler}
          sideDrawToggle={this.SideTogglerHandler}
        />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.SideDrawerClosedHandler}
          loggingOut={this.props.logOutHandler}
        />
        <main className="content">{this.props.children}</main>
      </Aux>
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logOutHandler: () => dispatch(actionCreators.logOutIntentionally())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
