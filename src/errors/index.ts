import { makeError, ServerError } from './server-error';

let v;

export const errors = {
	ServerError,
	makeError,
	[(v = 'ERR_INVALID_INPUT')]: makeError(v),
	[(v = 'ERR_REQUEST_BODY')]: makeError(v),
	[(v = 'ERR_DUPLICATE_USER')]: makeError(v),
	[(v = 'ERR_EXPIRED_OTP')]: makeError(v),
	[(v = 'ERR_INCORRECT_OTP')]: makeError(v),
	[(v = 'ERR_TOKEN_EXPIRED')]: makeError(v),
	[(v = 'ERR_BOOKING_OVERLAP')]: makeError(v),
	[(v = 'ERR_BOOKING_LIMIT')]: makeError(v),
};
