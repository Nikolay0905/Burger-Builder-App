import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./Build_Control/BuildControl";
import { useHistory } from "react-router";

import { ROUTES } from "../../../routes";

const controls = [
	{ label: "Salad", type: "salad" },
	{ label: "Bacon", type: "bacon" },
	{ label: "Cheese", type: "cheese" },
	{ label: "Meat", type: "meat" },
];

const BurgerControls = (props) => {
	const history = useHistory();

	return (
		<div className={classes.BuildControls}>
			<p>
				Total : <strong>{props.totalPrice.toFixed(2)}$</strong>
			</p>
			{controls.map((control) => (
				<BuildControl
					key={control.label}
					label={control.label}
					addIngredient={() => props.addIngredients(control.type)}
					removeIngredient={() => props.removeIngredients(control.type)}
					disabeledIngredient={props.disabeledIngredient[control.type]}
				/>
			))}
			{props.isAuth ? (
				<button
					className={classes.OrderButton}
					disabled={!props.purchasable}
					onClick={props.order}>
					ORDER NOW
				</button>
			) : (
				<button
					className={classes.OrderButton}
					disabled={!props.purchasable}
					onClick={() => {
						history.push({
							pathname: ROUTES.authentication,
						});
					}}>
					SIGN IN TO ORDER
				</button>
			)}
		</div>
	);
};

export default BurgerControls;
