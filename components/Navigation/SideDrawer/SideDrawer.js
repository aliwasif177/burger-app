import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../Logo/Logo";
import "./SideDrawer.css";
import BackDrop from "../../UI/BackDrop/BackDrop";
import Aux from "../../../hoc/Aux";
const sideDrawer = props => {
  let attachedClasses = ["SideDrawer", "Close"];
  if (props.open) {
    attachedClasses = ["SideDrawer", "Open"];
  }
  return (
    <Aux>
      <BackDrop showed={true} showed={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        <div className="MYLogo">
          <Logo />
        </div>

        <nav>
          <NavigationItems logOut={props.loggingOut} />
        </nav>
      </div>
    </Aux>
  );
};
export default sideDrawer;
