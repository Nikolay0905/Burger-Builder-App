import React, { Component } from "react";
import axios from "../../axiosOrders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as orderActions from "../../Store/Actions/compiled";

import Order from "./Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
	componentDidMount() {
		this.props.fetchOrders();
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
		if (this.props.orders.length === 0) {
			orders = (
				<div
					style={{
						textAlign: "center",
						padding: "15px",
						border: "1px solid red",
					}}>
					<p>
						Oops...There is no Orders! Create Some?{" "}
						<NavLink to="/">Burger</NavLink>{" "}
					</p>
				</div>
			);
		}

		return <div style={{ width: "60%", margin: "auto" }}>{orders}</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		orders: state.orders.orders,
		loading: state.orders.loading,
	};
};

const dispatchActions = (dispatch) => {
	return {
		fetchOrders: () => dispatch(orderActions.fetchOrders()),
		failFetchOrders: () => dispatch(orderActions.fetchOrdersFailed()),
	};
};

export default connect(
	mapStateToProps,
	dispatchActions,
)(withErrorHandler(Orders, axios));
