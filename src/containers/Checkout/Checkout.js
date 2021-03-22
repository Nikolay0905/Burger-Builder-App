import React from "react";
import { Route, Redirect } from "react-router";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Other/CheckoutSummary/CheckoutSummary";
import OrderForm from "../OrderForm/OrderForm";

const checkout = (props) => {
	const goToOrderForm = () => {
		props.history.push(props.match.url + "/orderForm");
	};
	const cancelOrdering = () => {
		props.history.goBack();
	};
	let summary = <Redirect to="/"></Redirect>;

	if (props.ingredients) {
		summary = (
			<div>
				<CheckoutSummary
					ingredients={props.ingredients}
					cancelOrdering={cancelOrdering}
					goToOrderForm={goToOrderForm}
				/>
				<Route
					path={props.match.url + "/orderForm"}
					exact
					render={() => <OrderForm />}
				/>
			</div>
		);
	}
	return summary;
};

const mapStateToProps = (state) => {
	return {
		ingredients: state.burger.ingredients,
		total: state.burger.totalPrice,
	};
};

export default connect(mapStateToProps)(checkout);
