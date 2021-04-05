import React, { Component } from "react";
import axios from "../../axiosOrders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as orderActions from "../../Store/Actions/compiled";

import Order from "./Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
	componentDidMount() {
		this.props.fetchOrders(this.props.token, this.props.userId);
	}
	render() {
		let orders = <Spinner />;

		if (this.props.orders) {
			orders = this.props.orders.map((order) => (
				<Order
					key={order.id}
					ingredients={order.ingredients}
					price={order.price}
				/>
			));
		}

		return <div style={{ width: "60%", margin: "auto" }}>{orders}</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		orders: state.orders.orders,
		loading: state.orders.loading,
		token: state.auth.idToken,
		userId: state.auth.userId,
	};
};

const dispatchActions = (dispatch) => {
	return {
		fetchOrders: (token, userId) =>
			dispatch(orderActions.fetchOrders(token, userId)),
		failFetchOrders: () => dispatch(orderActions.fetchOrdersFailed()),
	};
};

export default connect(
	mapStateToProps,
	dispatchActions,
)(withErrorHandler(Orders, axios));
