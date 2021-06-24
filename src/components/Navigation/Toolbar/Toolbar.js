import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../Navigation_Items/NavigationItems";
import BurgerMenu from "../../UI/Burger_Menu/BurgerMenu";

const toolbar = (props) => (
	<div className={classes.Toolbar}>
		<BurgerMenu clicked={props.clickHandler} />
		<div className={classes.Logo}>
			<Logo />
		</div>
		<nav className={classes.DesctopOnly}>
			<NavigationItems isAuthenticated={props.isAuth} />
		</nav>
	</div>
);

export default toolbar;
