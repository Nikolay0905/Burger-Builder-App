import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/Build_Controls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Order_Summary/orderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import axios from "../../axiosOrders";
import { connect } from "react-redux";
import * as actionCreator from "../../Store/Actions/compiled";

import { ROUTES } from "../../routes";

class BurgerBuilder extends Component {
	state = {
		purchasing: false,
		loading: false,
	};

	componentDidMount() {
		this.props.onInitIngredient();
	}

	updatePurchasable() {
		const sum = Object.keys(this.props.ingredients)
			.map((igKey) => {
				return this.props.ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0;
	}

	changhePurchasing = () => {
		this.setState({ purchasing: true });
	};
	cancelPurchasingHangler = () => {
		this.setState({ purchasing: false });
	};

	continuePurchasingHandler = () => {
		this.props.history.push(ROUTES.checkout);
	};

	render() {
		const disabeledInfo = {
			...this.props.ingredients,
		};

		for (let key in disabeledInfo) {
			disabeledInfo[key] = disabeledInfo[key] <= 0;
		}

		let burger = this.props.error ? (
			<p>The ingredients can't be fetched!</p>
		) : (
			<Spinner />
		);

		let orderSummary = null;

		if (this.props.ingredients) {
			burger = (
				<React.Fragment>
					<Burger ingredients={this.props.ingredients} />
					<BuildControls
						isAuth={this.props.isAuthenticated}
						addIngredients={this.props.addIngredient}
						removeIngredients={this.props.removeIngredient}
						disabeledIngredient={disabeledInfo}
						totalPrice={this.props.total}
						purchasable={this.updatePurchasable()}
						order={this.changhePurchasing}
					/>
				</React.Fragment>
			);
			orderSummary = (
				<OrderSummary
					ingredients={this.props.ingredients}
					continuePurchasing={this.continuePurchasingHandler}
					cancellPuchasing={this.cancelPurchasingHangler}
					totalPrice={this.props.total}
				/>
			);
		}

		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		return (
			<React.Fragment>
				<Modal
					purchased={this.state.purchasing}
					cancelPurchasingHangler={this.cancelPurchasingHangler}>
					{orderSummary}
				</Modal>
				{burger}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		ingredients: state.burger.ingredients,
		total: state.burger.totalPrice,
		error: state.burger.error,
		isAuthenticated: state.auth.idToken !== null,
	};
};

const dispatchActions = (dispatch) => {
	return {
		addIngredient: (ingredientType) =>
			dispatch(actionCreator.addIngredient(ingredientType)),
		removeIngredient: (ingredientType) =>
			dispatch(actionCreator.deleteIngredient(ingredientType)),
		onInitIngredient: () => dispatch(actionCreator.initIngredients()),
	};
};
export default connect(
	mapStateToProps,
	dispatchActions,
)(withErrorHandler(BurgerBuilder, axios));
