import Joi from 'joi';

const createUserOTP = {
	body: Joi.object().keys({
		email: Joi.string().required().email(),
		username: Joi.string().required(),
	}),
};

const createUser = {
	body: Joi.object().keys({
		username: Joi.string().required(),
		otp: Joi.number().required(),
		hash: Joi.string().required(),
	}),
};

const createBooking = {
	body: Joi.object().keys({
		listingId: Joi.number().required(),
		startDate: Joi.date()
			.iso()
			.greater(Date.now() + 72 * 60 * 60 * 1000)
			.messages({ 'date.format': `Date format is YYYY-MM-DD`, 'date.greater': `startDate must be 3 days earlier` })
			.required(),
		endDate: Joi.date()
			.iso()
			.min(Joi.ref('startDate'))
			.messages({ 'date.format': `Date format is YYYY-MM-DD`, 'date.min': `endDate must be greater than startDate` })
			.required(),
	}),
};

export default {
	CREATE_USER_OTP_JOI_SCHEMA: createUserOTP,
	CREATE_USER_JOI_SCHEMA: createUser,
	CREATE_BOOKING_JOI_SCHEMA: createBooking,
};
