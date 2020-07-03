import React from "react";
import "./SideDrawerToggle.css";
const sideDrawerToggle = props => (
  <div onClick={props.clickToggle} className="DrawerToggle">
    <div></div>
    <div></div>
    <div></div>
  </div>
);
export default sideDrawerToggle;
