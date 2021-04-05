import React, { Component } from "react";
import { connect } from "react-redux";

import Input from "../../components/UI/Inputs/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";

import classes from "./Auth.module.css";

import * as actions from "../../Store/Actions/compiled";
import { ROUTES } from "../../routes";

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Your Email ",
				},
				value: "",
				validation: {
					required: true,
					isEmail: true,
				},
				valid: false,
				touched: false,
			},
			password: {
				elementType: "input",
				elementConfig: {
					type: "password",
					placeholder: "Enter Password ",
				},
				value: "",
				validation: {
					required: true,
					minLength: 6,
				},
				valid: false,
				touched: false,
			},
		},
		isSignup: true,
	};
	checkValidaty(value, rules) {
		let isValid = true;

		if (rules) {
			if (rules.required) {
				isValid = value.trim() !== "" && isValid;
			}
			if (rules.minLength) {
				isValid = value.length >= rules.minLength && isValid;
			}
			if (rules.maxLength) {
				isValid = value.length <= rules.maxLength && isValid;
			}
			if (rules.isEmail) {
				const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				isValid = pattern.test(value) && isValid;
			}
		}

		return isValid;
	}

	inputChangedHandler(event, control) {
		const updatedControls = {
			...this.state.controls,
			[control]: {
				...this.state.controls[control],
				touched: true,
				value: event.target.value,
				valid: this.checkValidaty(
					event.target.value,
					this.state.controls[control].validation,
				),
			},
		};
		this.setState({ controls: updatedControls });
	}

	authenticate(event) {
		event.preventDefault();
		this.props.onAuth(
			this.state.controls.email.value,
			this.state.controls.password.value,
			this.state.isSignup,
		);
	}

	switchAuthMode() {
		this.setState((prevProps) => {
			return {
				isSignup: !prevProps.isSignup,
			};
		});
	}

	render() {
		const transformedControls = [];
		for (const key in this.state.controls) {
			transformedControls.push({
				...this.props.controls,
				id: key,
				config: this.state.controls[key],
			});
		}

		let formInputs = transformedControls.map((formElement) => (
			<Input
				elementType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				key={formElement.id}
				value={formElement.config.value}
				changed={(event) => this.inputChangedHandler(event, formElement.id)}
				isValid={!formElement.config.valid}
				shouldValid={formElement.config.validation}
				touched={formElement.config.touched}
			/>
		));

		if (this.props.loading) {
			formInputs = <Spinner />;
		}

		let errorMessage = null;

		if (this.props.error) {
			errorMessage = <p>{this.props.error.message}</p>;
		}

		if (this.props.isAuthenticated && this.props.isBuilding) {
			this.props.history.push(ROUTES.checkout);
		} else if (this.props.isAuthenticated && !this.props.isBuilding) {
			this.props.history.push(ROUTES.burger);
		}

		return (
			<div className={classes.Auth}>
				{errorMessage}

				<form onSubmit={(e) => this.authenticate(e)}>
					{formInputs}
					<Button btnType="Success">SUBMIT</Button>
				</form>
				<Button clicked={() => this.switchAuthMode()} btnType="Danger">
					GO TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}
				</Button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.idToken !== null,
		isBuilding: state.burger.burgerBuilding,
	};
};
const mapDispatchToProps = (dispatch, action) => {
	return {
		onAuth: (email, password, isSignedup) =>
			dispatch(actions.auth(email, password, isSignedup)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
