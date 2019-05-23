import mongoose, { Schema } from 'mongoose';

const runSchema = new Schema({
	date: Date,
	distance: Number,
	duration: Number,
	userId: { type: Schema.Types.ObjectId, ref: 'user' }
});

const RunModel = mongoose.model('run', runSchema);

export default RunModel;
