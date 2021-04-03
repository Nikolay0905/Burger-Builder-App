import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../Navigation_Items/NavigationItems";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = (props) => {
	return (
		<React.Fragment>
			<Backdrop show={props.open} clicked={props.closed} />
			<div
				className={[
					classes.SideDrawer,
					props.open ? classes.Open : classes.Close,
				].join(" ")}>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems isAuthenticated={props.isAuth} />
				</nav>
			</div>
		</React.Fragment>
	);
};
export default sideDrawer;
