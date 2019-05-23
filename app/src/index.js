import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import axios from 'axios';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-vis/dist/style.css';
import './styles/main.scss';

import { TOKEN_STORAGE, USER_STORAGE } from './constants/storage';
import { setAuthenticated, deauthenticate, setToken } from './actions/auth';
import Router from './router';
import reducers from './reducers';
import App from './app';

const store = createStore(reducers, applyMiddleware(thunk));

const token = localStorage.getItem(TOKEN_STORAGE);
const user = JSON.parse(localStorage.getItem(USER_STORAGE));

if (token && user) {
	store.dispatch(setAuthenticated(user));
}

// Axios
if (token) {
	setToken(token);
}

axios.interceptors.response.use(response => {
	return response.data;
}, (error) => {
	if (error.response.status === 401) {
		store.dispatch(deauthenticate());
		return;
	}

	return error.response;
});

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
	, document.getElementById('root')
);
