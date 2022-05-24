import { makeError, ServerError } from './server-error';

let v;

export const errors = {
	ServerError,
	makeError,
	[(v = 'ERR_INVALID_INPUT')]: makeError(v),
	[(v = 'ERR_REQUEST_BODY')]: makeError(v),
};
