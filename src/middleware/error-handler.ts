import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ServerError } from '../errors/server-error';
import Logger from '../logger';

export async function errorHandler(
	error: ServerError,
	req: Request,
	res: Response,
	_next: NextFunction,
): Promise<void> {
	Logger.log(`[errorHandler]:: request ${req.method} ${req.originalUrl} :: ${error.message}`, { ...error });

	res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
		error: {
			message: error.message,
			code: error.code,
		},
	});
}
