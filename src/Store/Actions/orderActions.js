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

export const fetchOrders = (token, userId) => {
	return (dispatch) => {
		fetchOrdersStart();
		axios
			.get("/orders.json?auth=" + token)
			.then((response) => {
				const fetchedOrders = [];
				for (const key in response.data) {
					if (response.data[key].userId === userId) {
						fetchedOrders.push({ ...response.data[key], id: key });
					}
				}
				dispatch(syncedOrderAction(fetchedOrders));
			})
			.catch((err) => {
				console.log(err);
				dispatch(fetchOrdersFailed(err));
			});
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

export const purchaseBurger = (orderData, token) => {
	return (dispatch) => {
		dispatch(purchaseBurgerStart());
		axios
			.post("/orders.json?auth=" + token, orderData)
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
