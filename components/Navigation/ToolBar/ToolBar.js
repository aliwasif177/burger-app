import React from "react";
import "./ToolBar.css";
import Logo from "../../Logo/Logo";
import SideDrawerToggle from "../SideDrawer/SideDrawerToggle/SideDrawerToggle";
import NavigationItems from "../NavigationItems/NavigationItems";

const toolbar = props => (
  <header className="ToolBar">
    <SideDrawerToggle clickToggle={props.sideDrawToggle} />

    <div className="Mylogo">
      <Logo />
    </div>

    <nav className="DesktopOnly">
      <NavigationItems logOut={props.loggingOut} />
    </nav>
  </header>
);

export default toolbar;
