import { combineReducers } from 'redux';

import auth from './auth';
import run from './run';

export default combineReducers({
	auth,
	run
});