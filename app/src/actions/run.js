import axios from 'axios';
import { API_URL } from '../constants/request';
import {
	ADD_RUN,
	GET_RUNS
} from '../constants/types';

export const addRun = (date, distance, duration) => {
	return async dispatch => {
		const url = API_URL + '/api/runs';
		const body = {
			date,
			distance,
			duration
		};
		const result = await axios.post(url, body);

		dispatch({
			type: ADD_RUN,
			payload: result.status === 200
		});
	};
}

export const getRuns = () => {
	return async dispatch => {
		const url = API_URL + '/api/runs';
		const result = await axios.get(url);

		dispatch({
			type: GET_RUNS,
			payload: result
		});
	};
}