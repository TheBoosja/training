import axios from 'axios';
import { history } from '../router';
import { TOKEN_STORAGE, USER_STORAGE } from '../constants/storage';
import { API_URL } from '../constants/request';
import {
	AUTHENTICATE,
	AUTHENTICATION_ERROR,
	DEAUTHENTICATE
} from '../constants/types';

export const authenticate = (email, password) => {
	return async dispatch => {
		const url = API_URL + '/api/auth/signin';
		const body = {
			email,
			password
		};

		try {
			const result = await axios.post(url, body);

			localStorage.setItem(TOKEN_STORAGE, result.token);
			localStorage.setItem(USER_STORAGE, JSON.stringify(result.user));
			setToken(result.token);

			dispatch({
				type: AUTHENTICATE,
				payload: result.user
			});
		}
		catch (error) {
			dispatch({
				type: AUTHENTICATION_ERROR
			});
		}
	};
};

export const setAuthenticated = (user) => {
	return {
		type: AUTHENTICATE,
		payload: user
	};
}

export const deauthenticate = () => {
	localStorage.removeItem(TOKEN_STORAGE);
	localStorage.removeItem(USER_STORAGE);

	history.push('/login');

	return {
		type: DEAUTHENTICATE
	};
};

export const setToken = (token) => {
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}
