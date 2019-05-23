import express from 'express';
import passport from 'passport';
import passportService from '../services/passport';

import auth from './auth';
import runs from './runs';

const router = express.Router();

//
const requireAuth = passport.authenticate('jwt', { session: false });

router.get('/ping', (req, res) => {
	res.json(1);
});

// Unauthorized routes
router.use('/auth', auth);

// Authorized routes
router.use(requireAuth);
router.use('/runs', runs);

export default router;