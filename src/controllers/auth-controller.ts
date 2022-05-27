import express, { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { refreshTokens } from '../services/auth-service';

export const refreshAccessToken = (req: Request, res: Response, next: NextFunction) => {
	try {
		const { refreshToken: token } = req.cookies;
		const accessToken = refreshTokens(token);

		res.cookie('accessToken', accessToken, {
			expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
			sameSite: 'strict',
			httpOnly: true,
		});

		return res.status(StatusCodes.OK).send({ success: true });
	} catch (error) {
		return next(error);
	}
};
