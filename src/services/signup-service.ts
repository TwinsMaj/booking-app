import { createUser, doesUserExist } from './user-service';
import { generateOTP, verifyOTP } from './auth-service';
import { StatusCodes } from 'http-status-codes';
import { errors } from '../errors';
import { sendEmail } from '../utils';
const { ERR_DUPLICATE_USER, ServerError } = errors;

export const beginSignupProcess = async (username: string, email: string): Promise<string> => {
	const isUserExists = await doesUserExist(username);

	if (isUserExists) {
		throw new ERR_DUPLICATE_USER('Duplicate usernames not allowed.', {
			level: ServerError.WARN,
			status: StatusCodes.CONFLICT,
		});
	}

	const [otp, fullHash] = generateOTP(username);
	console.log(`OTP HERE...`, otp);
	// await sendEmail(email, `Authentication Code`, `here is your otp: ${otp}`);

	return fullHash;
};

export const finishSignupProcess = async (username: string, otp: number, hash: string): Promise<Array<any>> => {
	const [accessToken, refreshToken] = verifyOTP(username, otp, hash);
	await createUser(username);

	return [accessToken, refreshToken];
};
