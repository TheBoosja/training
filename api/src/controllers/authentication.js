import jwt from 'jsonwebtoken';
import { secret } from '../../config';
import User from '../models/user';

const generateToken = (user) => {
	const payload = {
		sub: user.id
	};
	const options = {
		expiresIn: '6h'
	};

	return jwt.sign(payload, secret, options);
}

export const signUp = async (email, password) => {
	if (!email || !password) {
		throw new HTTPError('You must provide email and password', 422, 'signUp');
	}

	const existingUser = await User.findOne({ email: email }).exec();
	if (existingUser) {
		throw new HTTPError('Email is in use', 422, 'signUp');
	}

	const user = new User({
		email,
		password
	});

	const savedUser = await user.save();
	return {
		token: generateToken(savedUser)
	};
};

export const signIn = async (user) => {
	return {
		token: generateToken(user),
		user: user.cleanUser()
	};
};

// export const updateUser = async (userDetails) => {
// 	try {
// 		const user = await admin.auth().getUserByEmail(userDetails.email);

// 		const updatedUser = {
// 			...user,
// 			...userDetails
// 		};

// 		const result = await admin.auth().updateUser(user.uid, updatedUser);
// 		return result.uid;
// 	} catch (error) {
// 		if (error.errorInfo)
// 			throw new HTTPError(error.errorInfo.message, 400, 'updateUser');
// 		else
// 			throw error;
// 	}
// };

// export const createUser = async (userDetails) => {
// 	try {
// 		const createdUser = await admin.auth().createUser(userDetails);
// 		return createdUser.uid;
// 	} catch (error) {
// 		throw new HTTPError(error.errorInfo.message, 400, 'createUser');
// 	}
// }