import * as actionTypes from "../Actions/actionNames";

import { updateObject } from "../utility";

const initialState = {
	ingredients: null,
	totalPrice: 4.0,
	error: false,
};

const INGREDIENTS_PRICE = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
};

const addIngredient = (state, action) => {
	return updateObject(state, {
		ingredients: {
			...state.ingredients,
			[action.ingType]: state.ingredients[action.ingType] + 1,
		},
		totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingType],
	});
};

const removeIngredient = (state, action) => {
	return updateObject(state, {
		ingredients: {
			...state.ingredients,
			[action.ingType]: state.ingredients[action.ingType] - 1,
		},
		totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingType],
	});
};

const setIngredients = (state, action) => {
	return updateObject(state, {
		ingredients: {
			salad: action.ingredients.salad,
			bacon: action.ingredients.bacon,
			cheese: action.ingredients.cheese,
			meat: action.ingredients.meat,
		},
		error: false,
		totalPrice: 4,
	});
};

const fetchIngredientFailure = (state, action) => {
	return updateObject(state, {
		error: true,
	});
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return addIngredient(state, action);
		case actionTypes.DELETE_INGREDIENT:
			return removeIngredient(state, action);
		case actionTypes.SET_INGREDIENT:
			return setIngredients(state, action);
		case actionTypes.FETCH_INGREDIENT_FAILED:
			return fetchIngredientFailure(state, action);
		default:
			return state;
	}
};

export default reducer;
