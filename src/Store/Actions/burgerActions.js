import * as actionTypes from "./actionNames";
import axios from "../../axiosOrders";

export const addIngredient = (ingredientType) => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingType: ingredientType,
	};
};
export const deleteIngredient = (ingredientType) => {
	return {
		type: actionTypes.DELETE_INGREDIENT,
		ingType: ingredientType,
	};
};

export const fetchIngredientFails = () => {
	return {
		type: actionTypes.FETCH_INGREDIENT_FAILED,
	};
};

export const setIngredients = (ingredients) => {
	return {
		type: actionTypes.SET_INGREDIENT,
		ingredients: ingredients,
	};
};

export const initIngredients = () => {
	return (dispatch) => {
		axios
			.get("ingredients.json")
			.then((response) => dispatch(setIngredients(response.data)))
			.catch((error) => {
				dispatch(fetchIngredientFails());
			});
	};
};
