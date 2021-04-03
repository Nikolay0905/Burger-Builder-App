import * as actionTypes from "../Actions/actionNames";

import { updateObject } from "../utility";

const initialState = {
	idToken: null,
	userId: null,
	error: null,
	loading: false,
};

const authStart = (state) => {
	return updateObject(state, { loading: true });
};

const authSuccess = (state, action) => {
	console.log(action);
	return updateObject(state, {
		loading: false,
		idToken: action.authData.idToken,
		userId: action.authData.localId,
	});
};
const authFailed = (state, action) => {
	return updateObject(state, { error: action.error, loading: false });
};

const logout = (state, action) => {
	return updateObject(state, { idToken: null, userId: null });
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return authStart(state);
		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, action);
		case actionTypes.AUTH_FAILED:
			return authFailed(state, action);
		case actionTypes.AUTH_LOGOUT:
			return logout(state, action);
		default:
			return state;
	}
};

export default reducer;
