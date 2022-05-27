import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verify } from 'jsonwebtoken';
import { config } from '../config/config';
import { errors } from '../errors';

const { ERR_TOKEN_EXPIRED, ServerError } = errors;
const { auth } = config.server;

export const decodeToken = (req: Request, res: Response, next: NextFunction): void => {
	const { accessToken } = req.cookies;

	verify(accessToken, auth.access_secret, async (err, payload) => {
		if (payload) {
			req.username = payload.data;
			return next();
		}

		if (err?.message === 'TokenExpiredError') {
			return next(
				new ERR_TOKEN_EXPIRED(err, {
					message: 'Access token expired',
					level: ServerError.ERROR,
					status: StatusCodes.FORBIDDEN,
				}),
			);
		}

		return next(
			new ServerError(err, {
				message: 'User not authenticated',
				level: ServerError.ERROR,
				status: StatusCodes.FORBIDDEN,
			}),
		);
	});
};
