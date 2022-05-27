// import crypto form 'crypto';
import crypto from 'crypto';
import { StatusCodes } from 'http-status-codes';
import { config } from '../config/config';
import { errors } from '../errors';
import { sign, verify } from 'jsonwebtoken';
import { JwtPayload } from '../types';

const { ERR_EXPIRED_OTP, ERR_INCORRECT_OTP, ServerError } = errors;
const { auth } = config.server;

export const generateOTP = (identity: string): Array<any> => {
	const otp = Math.floor(100000 + Math.random() * 900000);

	const ttl = 2 * 60 * 1000;
	const expires = Date.now() + ttl;
	const data = `${identity}.${otp}.${expires}`;

	const hash = crypto.createHmac('sha256', auth.otp_secret).update(data).digest('hex');
	const fullHash = `${hash}.${expires}`;

	return [otp, fullHash];
};

export const verifyOTP = (username: string, otp: number, hash: string): Array<any> => {
	const [hashValue, expires] = hash.split('.');

	const now = Date.now();

	if (now > parseInt(expires)) {
		throw new ERR_EXPIRED_OTP('OTP has expired. Request another one.', {
			level: ServerError.WARN,
			status: StatusCodes.GATEWAY_TIMEOUT,
		});
	}

	const data = `${username}.${otp}.${expires}`;
	const derivedHash = crypto.createHmac('sha256', auth.otp_secret).update(data).digest('hex');

	if (derivedHash !== hashValue) {
		throw new ERR_INCORRECT_OTP('Incorret OTP.', {
			level: ServerError.WARN,
			status: StatusCodes.BAD_REQUEST,
		});
	}

	const accessToken = sign({ data: username }, auth.access_secret, { expiresIn: '1d' });
	const refreshToken = sign({ data: username }, auth.refresh_secret, { expiresIn: '1y' });

	return [accessToken, refreshToken];
};

export const refreshTokens = (refreshToken: string): string => {
	try {
		const payload = verify(refreshToken, auth.refresh_secret) as JwtPayload;
		const { username } = payload;

		const accessToken = sign({ data: username }, auth.access_secret, { expiresIn: '1d' });

		return accessToken;
	} catch (err: any) {
		throw new ServerError(err, {
			message: 'Refresh token unauthorized',
			level: ServerError.ERROR,
			status: StatusCodes.UNAUTHORIZED,
		});
	}
};
