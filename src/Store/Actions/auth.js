import axios from "axios";

import * as actionTypes from "./actionNames";

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (authData) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		authData: authData,
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAILED,
		error: error,
	};
};

export const logout = () => {
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const expiresTimer = (time) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(logout());
		}, time * 1000);
	};
};

export const auth = (email, password, isSignup) => {
	return (dispatch) => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true,
		};
		let url =
			"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBRLFMh4aONxXKrcTdO7uN9NkRv9p5ivuI";

		if (!isSignup) {
			url =
				"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBRLFMh4aONxXKrcTdO7uN9NkRv9p5ivuI";
		}

		axios
			.post(url, authData)
			.then((response) => {
				console.log(response);
				dispatch(authSuccess(response.data));
				dispatch(expiresTimer(response.data.expiresIn));
			})
			.catch((error) => {
				console.log(error);
				dispatch(authFail(error));
			});
	};
};
