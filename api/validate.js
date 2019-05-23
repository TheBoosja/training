import jwt from 'jsonwebtoken';
import { secret } from './config';

export const validateToken = (req, res, next) => {
	let token = req.headers['authorization'];
	if (token.startsWith('Bearer ')) {
		token = token.slice('Bearer '.length, token.length);
	}

	if (token) {
		jwt.verify(token, secret, (err, decoded) => {
			if (err) {
				return res.sendStatus(401);
			}
			else {
				console.log('TOKEN decoded: ', decoded);
				req.decoded = decoded;
				next();
			}
		});
	}
	else {
		return res.sendStatus(401);
	}
};

export const createToken = (user) => {
	return jwt.sign(
		{ sub: user.uid },
		secret,
		{ expiresIn: '6h' }
	);
}