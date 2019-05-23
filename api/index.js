require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import chalk from 'chalk';
// Leave this! Defines custom error to be used for HTTP errors.
import HTTPError from './HTTPError';

// import { initDatabase } from './database';
import routes from './src/routes';

// Database setup
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const app = express();
const port = process.env.PORT || 5000;

// CORS
const corsOptions = {
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
// app.use(morgan('[:date[iso]] :method :status :url :response-time ms - :res[content-length]'));
app.use(morgan('combined'));
app.use(bodyParser.json())

// Routes
app.use('/api', routes, (req, res) => {
	// No route match => return 404
	res.sendStatus(404);
});

// 404 on base route
app.route('/').all((req, res, next) => {
	res.sendStatus(404);
});

// Error handling
app.use((err, req, res, next) => {
	if (err.name === 'HTTPError') {
		console.error(err.toString());
		res.status(err.code).json({ msg: err.message });
	}
	else {
		next(err);
	}
});

app.listen(port, () => {
	const url = chalk.blue.underline(`http://localhost:${port}/`);
	console.log(Date.now() + ` Listening at ${url}`);
});
