import { errors } from '../errors';
import express, { NextFunction, Request, Response } from 'express';

const { ERR_REQUEST_BODY, ServerError } = errors;

export function bodyParser(req: Request, res: Response, next: NextFunction): void {
	express.json()(req, res, (err) => {
		if (err) {
			return next(
				new ERR_REQUEST_BODY(err, {
					message: 'Failed to parse request body',
					level: ServerError.WARN,
					status: 400,
				}),
			);
		}

		next();
	});
}
