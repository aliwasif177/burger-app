import React from "react";
import { connect } from "react-redux";
import { store } from "../../../index";

import NavigationItem from "./NavigationItem/NavigationItem";
import "./NavigationItems.css";

const navigationItems = props => {
  let storage = null;
  storage = store.getState();
  let navigationItems = (
    <ul className="NavigationItems">
      <NavigationItem link={"/"}>Burgur Builder</NavigationItem>
      <NavigationItem link={"/auth"}>LogIn</NavigationItem>
    </ul>
  );
  if (storage.auth.token) {
    navigationItems = (
      <ul className="NavigationItems">
        <NavigationItem link={"/"}>Burgur Builder</NavigationItem>
        <NavigationItem link={"/orders"}>CheckOut</NavigationItem>
        <NavigationItem logOut={props.logOut} link={"/auth"}>
          LogOut
        </NavigationItem>
      </ul>
    );
  }

  return <div>{navigationItems}</div>;
};
const mapStateToProps = state => {
  return {
    auth: state.auth.token
  };
};
export default connect(mapStateToProps)(navigationItems);
