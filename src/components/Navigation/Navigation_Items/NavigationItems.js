import React from "react";
import NavigationItem from "./Navigation_Item/NavigationItem";
import classes from "./NavigationItems.module.css";

import { ROUTES } from "../../../routes";

const navigationItems = (props) => (
	<div className={classes.NavigationItems}>
		<NavigationItem link={ROUTES.burger} exact>
			Burger Builder
		</NavigationItem>
		{props.isAuthenticated ? (
			<NavigationItem link={ROUTES.orders}>Orders</NavigationItem>
		) : null}
		{!props.isAuthenticated ? (
			<NavigationItem link={ROUTES.authentication}>Authenticate</NavigationItem>
		) : (
			<NavigationItem link={ROUTES.logout}>Logout</NavigationItem>
		)}
	</div>
);

export default navigationItems;
