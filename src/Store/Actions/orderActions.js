import * as actionTypes from "./actionNames";
import axios from "../../axiosOrders";

export const fetchOrdersFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENT_FAILED,
	};
};

export const syncedOrderAction = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders,
	};
};

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START,
	};
};

export const fetchOrders = () => {
	return (dispatch) => {
		fetchOrdersStart();
		axios
			.get("/orders.json")
			.then((response) => {
				const fetchedOrders = [];
				for (const key in response.data) {
					fetchedOrders.push({ ...response.data[key], id: key });
				}
				dispatch(syncedOrderAction(fetchedOrders));
			})
			.catch((err) => dispatch(fetchOrdersFailed(err)));
	};
};

export const syncedBurgerPurchasingFail = (error) => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAILED,
		error: error,
	};
};

export const syncedBurgerPurchasing = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData,
	};
};

export const purchaseBurger = (orderData) => {
	return (dispatch) => {
		purchaseBurgerStart();
		axios
			.post("/orders.json", orderData)
			.then((response) =>
				dispatch(syncedBurgerPurchasing(response.data.name, orderData)),
			)
			.catch((error) => dispatch(syncedBurgerPurchasingFail(error)));
	};
};

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START,
	};
};
