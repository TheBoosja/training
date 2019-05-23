import express from 'express';
import { getRuns, getRun, addRun } from '../controllers/runController';
import parse from 'date-fns/parse';

const router = express.Router();

router.get('/', (req, res, next) => {
	const currentUser = req.user;

	getRuns(currentUser.id)
		.then(runs => {
			res.json(runs);
		})
		.catch(next);
});

// router.get('/get', (req, res, next) => {
// 	const date = parse(req.query.date);

// 	getRun(date)
// 		.then(run => {
// 			res.json(run);
// 		})
// 		.catch(next);
// });

router.post('/', (req, res, next) => {
	const run = req.body;
	const runRequest = {
		date: run.date,
		distance: run.distance,
		duration: run.duration,
		user: req.user
	};

	addRun(runRequest)
		.then(result => {
			res.json(result);
		})
		.catch(next);
});

export default router;