import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./Build_Control/BuildControl";

const controls = [
	{ label: "Salad", type: "salad" },
	{ label: "Bacon", type: "bacon" },
	{ label: "Cheese", type: "cheese" },
	{ label: "Meat", type: "meat" },
];

const burgerControls = (props) => (
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

		<button
			className={classes.OrderButton}
			disabled={!props.purchasable}
			onClick={props.order}>
			ORDER NOW
		</button>
	</div>
);

export default burgerControls;
