import React from "react";

import classes from "./Input.module.css";

const input = (props) => {
	let inputElement = null;
	const elementClasses = [classes.InputElement];

	if (props.isValid && props.shouldValid && props.touched) {
		elementClasses.push(classes.Invalid);
	}

	switch (props.elementType) {
		case "input":
			inputElement = (
				<input
					className={elementClasses.join(" ")}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
		case "textArea":
			inputElement = (
				<textarea
					className={elementClasses.join(" ")}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
		case "select":
			const options = props.elementConfig.options.map((option) => {
				return (
					<option
						key={option.value}
						value={option.value}
						onChange={props.changed}>
						{option.displayValue}
					</option>
				);
			});
			inputElement = (
				<select
					className={elementClasses.join(" ")}
					value={props.value}
					onChange={props.changed}>
					{options}
				</select>
			);
			break;
		default:
			inputElement = (
				<input
					className={elementClasses.join(" ")}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
	}
	let validationError = null;
	if(props.touched && props.isValid){
		validationError = <p className={classes.ValidationError}>Please enter a valid value!</p>
	}

	return (
		<div className={classes.InputContainer}>
			<label>{props.label}</label>
			{inputElement}
			{validationError}
		</div>
	);
};

export default input;
