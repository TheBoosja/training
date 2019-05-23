import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export default (props) => {
	return (
		<Router history={history}>
			{props.children}
		</Router>
	);
};