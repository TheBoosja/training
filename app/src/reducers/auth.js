import {
	AUTHENTICATE,
	AUTHENTICATION_ERROR,
	DEAUTHENTICATE
} from "../constants/types";

const initialState = {
	isAuthenticated: false,
	user: null,
	authFailed: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case AUTHENTICATE:
			return {
				...state,
				isAuthenticated: true,
				user: action.payload,
				authFailed: false
			};
		case AUTHENTICATION_ERROR:
			return {
				...state,
				isAuthenticated: false,
				authFailed: true
			};
		case DEAUTHENTICATE:
			return {
				...state,
				isAuthenticated: false,
				user: null,
				authFailed: false
			};
		default:
			return state;
	}
}