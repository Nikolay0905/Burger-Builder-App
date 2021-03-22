import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import * as orderActions from "../../Store/Actions/compiled";

import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Inputs/Input";

import axios from "../../axiosOrders";
import "./OrderForm.css";

class OrderForm extends Component {
	state = {
		orderForm: {
			name: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your Name ",
				},
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			street: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your Street ",
				},
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			zipCode: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your Postal Code ",
				},
				value: "",
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5,
				},
				valid: false,
				touched: false,
			},
			country: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your Country",
				},
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Your E-Mail",
				},
				value: "",
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			deliveryMethod: {
				elementType: "select",
				elementConfig: {
					options: [
						{ value: "fastest", displayValue: "Fastest" },
						{ value: "cheapest", displayValue: "Cheapest" },
					],
				},
				value: "fastest",
				valid: true,
			},
		},
		isFormValid: false,
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
		}

		return isValid;
	}

	orderHandler = (event) => {
		event.preventDefault();

		let formData = {};

		for (const key in this.state.orderForm) {
			formData[key] = this.state.orderForm[key].value;
		}

		const order = {
			ingredients: this.props.ingredients,
			price: this.props.total.toFixed(2),
			userData: formData,
		};

		this.props.burgerPurchasing(order);

		this.setState({ loading: true });
		this.props.history.push("/");
	};

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedOrderForm = { ...this.state.orderForm };
		const valueToUpdate = { ...updatedOrderForm[inputIdentifier] };

		valueToUpdate.valid = this.checkValidaty(
			valueToUpdate.value,
			updatedOrderForm[inputIdentifier].validation,
		);
		valueToUpdate.touched = true;
		valueToUpdate.value = event.target.value;
		updatedOrderForm[inputIdentifier] = valueToUpdate;

		let isFormValid = true;
		for (const inputIdentifier in updatedOrderForm) {
			isFormValid = updatedOrderForm[inputIdentifier].valid && isFormValid;
		}

		this.setState({ orderForm: updatedOrderForm, isFormValid: isFormValid });
	};

	render() {
		const formComponentsArray = [];
		for (const key in this.state.orderForm) {
			formComponentsArray.push({
				config: this.state.orderForm[key],
				id: key,
			});
		}

		let form = (
			<form onSubmit={this.orderHandler}>
				{formComponentsArray.map((formElement) => {
					return (
						<Input
							elementType={formElement.config.elementType}
							elementConfig={formElement.config.elementConfig}
							key={formElement.id}
							value={formElement.config.value}
							changed={(event) =>
								this.inputChangedHandler(event, formElement.id)
							}
							isValid={!formElement.config.valid}
							shouldValid={formElement.config.validation}
							touched={formElement.config.touched}
						/>
					);
				})}
				<Button btnType="Success" disabled={!this.state.isFormValid}>
					ORDER
				</Button>
			</form>
		);
		if (this.props.loading) {
			form = <Spinner />;
		}
		return (
			<div className="OrderForm-container">
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ingredients: state.burger.ingredients,
		total: state.burger.totalPrice,
		loading: state.orders.loading,
	};
};

const dispatchActions = (dispatch) => {
	return {
		burgerPurchasing: (orderData) =>
			dispatch(orderActions.purchaseBurger(orderData)),
	};
};

export default connect(
	mapStateToProps,
	dispatchActions,
)(withRouter(OrderForm, axios));
