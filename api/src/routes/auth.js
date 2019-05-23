import express from 'express';
import passport from 'passport';
import { updateUser, signUp, signIn } from '../controllers/authentication';

const router = express.Router();

const requireSignIn = passport.authenticate('local', { session: false });

// router.post('/user', (req, res, next) => {
// 	updateUser({ email: 'mathias.iversen487@gmail.com', displayName: 'The Boosja' })
// 		.then(() => {
// 			res.json('success');
// 		})
// 		.catch(next);
// });

router.post('/signup', (req, res, next) => {
	const { email, password } = req.body;

	signUp(email, password)
		.then(result => {
			res.json(result);
		})
		.catch(next);
});

router.post('/signin', requireSignIn, (req, res, next) => {
	signIn(req.user)
		.then(result => {
			res.json(result);
		})
		.catch(next);
});

export default router;