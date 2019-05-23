import Run from '../models/run';
import isValid from 'date-fns/is_valid'
import parse from 'date-fns/parse'
import format from 'date-fns/format'

export const getRuns = async (currentUserId) => {
	const runs = await Run.where('userId', currentUserId).exec();

	// if (runs.docs.length > 0) {
	// 	return runs.docs.map(d => correctDate(d.data()));
	// }
	return runs;
};

// export const getRun = async (date) => {
// 	const runs = await database.collection('runs')
// 		.where('date', '==', date)
// 		.get();

// 	if (runs.docs.length > 0) {
// 		return correctDate(runs.docs[0].data());
// 	}
// 	return null;
// };

export const addRun = async ({ date, distance, duration, user }) => {
	const parsedDate = parse(date);
	const parsedDistance = parseFloat(distance, 10);
	const parsedDuration = parseInt(duration, 10);

	if (!isValid(parsedDate)) {
		throw new HTTPError('Invalid date', 400, 'addRun');
	}
	else if (isNaN(parsedDistance)) {
		throw new HTTPError('Invalid distance', 400, 'addRun');
	}
	else if (isNaN(parsedDuration)) {
		throw new HTTPError('Invalid duration', 400, 'addRun');
	}

	const strippedDate = parse(format(parsedDate, 'YYYY-MM-DD HH:mm:00'));

	const run = new Run({
		date: strippedDate,
		distance: parsedDistance,
		duration: parsedDuration,
		userId: user.id
	});

	const savedRun = await run.save();
	return savedRun.id;
}

function correctDate(doc) {
	// console.log(doc.date);
	doc.date = doc.date.toDate();
	return doc;
}