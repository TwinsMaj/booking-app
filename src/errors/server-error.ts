/* eslint-disable require-jsdoc */
import { ErrorLevel } from '../types';

export interface ErrorOptions {
	level?: ErrorLevel;
	code?: string;
	status?: number;
	metadata?: Record<string, unknown>;
	message?: string;
}

export class ServerError extends Error implements NodeJS.ErrnoException {
	public static ERROR: ErrorLevel = 'error';
	public static WARN: ErrorLevel = 'warn';
	public static INFO: ErrorLevel = 'info';
	public static DEBUG: ErrorLevel = 'debug';

	public level: ErrorLevel;
	public code?: string;
	public metadata?: Record<string, unknown>;
	public status?: number;

	constructor(
		err?: string | ServerError | NodeJS.ErrnoException,
		{ level, code, status, metadata, message }: ErrorOptions = {},
	) {
		if (err instanceof Error) {
			super(message || err.message);
			code = code || err.code;

			if ('level' in err) {
				level = level || err.level;
			}

			if ('metadata' in err) {
				metadata = { ...err.metadata, ...metadata };
			}
		} else {
			super(err || message);
		}

		Object.defineProperty(this, 'name', {
			value: code ? `${this.constructor.name} [${code}]` : this.constructor.name,
			enumerable: false,
		});

		this.level = level || ServerError.ERROR;
		this.status = status;
		this.metadata = metadata;
		this.code = code;

		Error.captureStackTrace(this, this.constructor);

		if (err instanceof Error) {
			this.stack = `${this.stack}\n Original error: ${err.stack}`;
		}
	}
}

const OriginalServerError = ServerError;

export function makeError(code: string, defaultOptions: Omit<ErrorOptions, 'code'> = {}): typeof ServerError {
	return class ServerError extends OriginalServerError {
		constructor(err?: string | ServerError | NodeJS.ErrnoException, options: ErrorOptions = {}) {
			const overrides: ErrorOptions = {
				code,
			};

			if (defaultOptions.metadata) {
				overrides.metadata = Object.assign({}, defaultOptions.metadata, options.metadata);
			}

			const combinedOptions = Object.assign({}, defaultOptions, options, overrides);

			super(err, combinedOptions);
		}
	};
}
