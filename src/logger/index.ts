import chalk from 'chalk';

export default class Logger {
	public static log = (message: string, ...metadata: Array<Record<string, unknown>>) => this.info(message, ...metadata);

	public static info = (message: string, ...metadata: Array<Record<string, unknown>>) => {
		if (process.env.NODE_ENV !== 'test') {
			console.log(chalk.blue(`[${new Date().toLocaleString()}] [INFO]`), message, ...metadata);
		}
	};

	public static warning = (message: string, ...metadata: Array<Record<string, unknown>>) => {
		if (process.env.NODE_ENV !== 'test') {
			console.log(chalk.yellow(`[${new Date().toLocaleString()}] [WARN]`), message, ...metadata);
		}
	};

	public static error = (message: string, ...metadata: Array<Record<string, unknown>>) => {
		if (process.env.NODE_ENV !== 'test') {
			console.log(chalk.red(`[${new Date().toLocaleString()}] [ERROR]`), message, ...metadata);
		}
	};
}
