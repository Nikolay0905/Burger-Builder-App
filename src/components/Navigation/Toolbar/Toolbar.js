import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../Navigation_Items/NavigationItems";
import BurgerMenu from "../../UI/Burger_Menu/BurgerMenu";

const toolbar = (props) => {
	return (
		<div className={classes.Toolbar}>
			<BurgerMenu clicked={props.clickHandler} show={!props.open} />
			<div className={classes.Logo}>
				<Logo />
			</div>
			<nav className={classes.DesctopOnly}>
				<NavigationItems isAuthenticated={props.isAuth} />
			</nav>
		</div>
	);
};

export default toolbar;
