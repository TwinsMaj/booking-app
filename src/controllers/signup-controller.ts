import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { beginSignupProcess, finishSignupProcess } from '../services/signup-service';

const startSignupProcess = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<Record<string, any> | void> => {
	try {
		const { username, email } = req.body;
		const signupHash = await beginSignupProcess(username, email);

		return res.status(StatusCodes.OK).send({ hash: signupHash });
	} catch (err) {
		return next(err);
	}
};

const completeSignupProcess = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<Record<string, any> | void> => {
	try {
		const { username, otp, hash } = req.body;
		const [accessToken, refreshToken] = await finishSignupProcess(username, otp, hash);

		res.cookie('accessToken', accessToken, {
			expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
			sameSite: 'strict',
			httpOnly: true,
		});

		res.cookie('refreshToken', refreshToken, {
			expires: new Date(new Date().getTime() + 31557600000),
			sameSite: 'strict',
			httpOnly: true,
		});

		return res.status(StatusCodes.CREATED).send({ success: true });
	} catch (err) {
		return next(err);
	}
};

export default { startSignupProcess, completeSignupProcess };
