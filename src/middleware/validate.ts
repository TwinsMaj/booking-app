import Joi from 'joi';
import { errors } from '../errors';
import { StatusCodes } from 'http-status-codes';
import { pick } from '../utils';
import { Request, Response, NextFunction } from 'express';

const { ERR_INVALID_INPUT, ServerError } = errors;

const validate =
	(schema: { [x: string]: unknown }, stripUnknown = false) =>
	(req: Request, _res: Response, next: NextFunction): void => {
		try {
			const validSchema = pick(schema, ['params', 'query', 'body']);
			const object = pick(req, Object.keys(validSchema));
			const { value, error } = Joi.compile(validSchema)
				.prefs({ errors: { label: 'key' } })
				.validate(object, {
					abortEarly: false,
					allowUnknown: true,
					stripUnknown,
				});

			if (error) {
				const errorDetails = error.details.map((detail) => detail.message).join(', ');

				throw new ERR_INVALID_INPUT(`Invalid input: ${errorDetails}`, {
					level: ServerError.WARN,
					status: StatusCodes.BAD_REQUEST,
					message: `Invalid input: ${errorDetails}`,
					metadata: { failed_fields: error.details.map((err) => err.path.join('.')) },
				});
			}

			Object.assign(req, value);
			return next();
		} catch (err) {
			return next(err);
		}
	};

export default validate;
