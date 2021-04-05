import axios from "axios";

import * as actionTypes from "./actionNames";

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: token,
		userId: userId,
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAILED,
		error: error,
	};
};

export const logout = () => {
	localStorage.clear();
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
				const expirationDate = new Date(
					new Date().getTime() + response.data.expiresIn * 1000,
				);
				localStorage.setItem("token", response.data.idToken);
				localStorage.setItem("userId", response.data.localId);
				localStorage.setItem("expirationDate", expirationDate);

				dispatch(authSuccess(response.data.idToken, response.data.localId));
				dispatch(expiresTimer(response.data.expiresIn));
			})
			.catch((error) => {
				console.log(error);
				dispatch(authFail(error));
			});
	};
};

export const autoAuthenticate = () => {
	return (dispatch) => {
		const token = localStorage.getItem("token");
		if (!token) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem("expirationDate"));
			if (expirationDate >= new Date()) {
				const userId = localStorage.getItem("userId");
				dispatch(authSuccess(token, userId));
				dispatch(
					expiresTimer(
						(expirationDate.getTime() - new Date().getTime()) / 1000,
					),
				);
			} else {
				dispatch(logout());
			}
		}
	};
};
