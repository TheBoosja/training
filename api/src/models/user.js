import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
	email: { type: String, unique: true, lowercase: true },
	password: String,
	// username: String,
});

userSchema.pre('save', async function(next) {
	try {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(this.password, salt);

		this.password = hash;
		next();
	}
	catch (error) {
		next(error);
	}
});

userSchema.method('comparePassword', async function(candidatePassword, done) {
	try {
		const isMatch = await bcrypt.compare(candidatePassword, this.password);
		done(null, isMatch);
	}
	catch (error) {
		return done(error);
	}
});

userSchema.method('cleanUser', function() {
	return {
		email: this.email,
		username: this.username
	};
});

const UserModel = mongoose.model('user', userSchema);

export default UserModel;
