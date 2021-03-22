import * as actionTypes from "../Actions/actionNames";
import { updateObject } from "../utility";

const initialState = {
	orders: [],
	loading: false,
};

const purchaseBurgerSuccess = (state, action) => {
	const order = {
		...action.orderData,
		id: action.orderId,
	};
	return updateObject(state, {
		loading: false,
		orders: state.orders.concat(order),
	});
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_ORDERS_START:
			return updateObject(state, { loading: true });
		case actionTypes.FETCH_ORDERS_SUCCESS:
			return updateObject(state, { orders: action.orders, loading: false });
		case actionTypes.FETCH_ORDERS_FAILED:
			return updateObject(state, { error: true });
		case actionTypes.PURCHASE_BURGER_SUCCESS:
			return purchaseBurgerSuccess(state, action);
		case actionTypes.PURCHASE_BURGER_FAILED:
			return updateObject(state, { loading: false });
		case actionTypes.PURCHASE_BURGER_START:
			return updateObject(state, { loading: true });
		default:
			return state;
	}
};
export default reducer;
