import chalk from 'chalk';

class HTTPError {
	constructor(msg, code = 500, methodName = '') {
		this.name = 'HTTPError';
		this.code = code;
		this.message = msg;
		this.methodName = methodName;
	}

	toString() {
		let string = `${this.name}:`;

		if (this.code) {
			string += ` [${this.code}]`;
		}

		string += ` '${this.message}'`;

		if (this.methodName) {
			string += ` in ${this.methodName}()`;
		}

		return chalk.red(string);
	}
}

global.HTTPError = HTTPError;