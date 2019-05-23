import passport from 'passport';
import User from '../models/user';
import { secret } from '../../config';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import LocalStrategy from 'passport-local';

const localOptions = {
	usernameField: 'email'
};
const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
	try {
		const user = await User.findOne({ email: email });

		if (!user) {
			return done(null, false);
		}

		user.comparePassword(password, (err, isMatch) => {
			if (err) {
				return done(err);
			}

			if (!isMatch) {
				return done(null, false);
			}

			return done(null, user);
		});
	} catch (error) {
		return done(err);
	}
});

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: secret
};

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
	try {
		const user = await User.findById(payload.sub);

		if (user) {
			done(null, user);
		}
		else {
			done(null, false);
		}
	} catch (error) {
		return done(error, false);
	}
});

passport.use(localLogin);
passport.use(jwtLogin);
