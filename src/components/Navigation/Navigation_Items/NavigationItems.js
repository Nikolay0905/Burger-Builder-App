import React from "react";
import NavigationItem from "./Navigation_Item/NavigationItem";
import classes from "./NavigationItems.module.css";

const navigationItems = (props) => (
	<div className={classes.NavigationItems}>
		<NavigationItem link="/burger" exact>
			Burger Builder
		</NavigationItem>
		<NavigationItem link="/orders">Orders</NavigationItem>
		{!props.isAuthenticated ? (
			<NavigationItem link="/authentication">Authenticate</NavigationItem>
		) : (
			<NavigationItem link="/logout">Logout</NavigationItem>
		)}
	</div>
);

export default navigationItems;
