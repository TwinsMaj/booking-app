import { NextFunction, Request, Response } from 'express';
import { logLevels } from '../errors/log-levels';
import { ServerError } from '../errors/server-error';
import Logger from '../logger';

export async function errorHandler(
	error: ServerError,
	req: Request,
	res: Response,
	_next: NextFunction,
): Promise<void> {
	Logger.log(`[errorHandler]:: request ${req.method} ${req.originalUrl} :: ${error.message}`, { ...error });

	res.status(error.status || 500).json({
		error: {
			message: error.message,
			code: error.code,
		},
	});
}
