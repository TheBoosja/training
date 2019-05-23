import {
	ADD_RUN,
	GET_RUNS
} from '../constants/types';

const initialState = {
	addRunResult: '',
	runs: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_RUN:
			return {
				...state,
				addRunResult: action.payload
			};
		case GET_RUNS:
			return {
				...state,
				runs: action.payload || []
			};
		default:
			return state;
	}
}