import knex from '../knex';
import { BookingDetails } from '../types';
import { getUser } from './user-service';
import { errors } from '../errors';
import { StatusCodes } from 'http-status-codes';

const { ERR_BOOKING_OVERLAP, ERR_BOOKING_LIMIT, ServerError } = errors;
const BOOKING_LIMIT = 3;

export const makeBooking = async (details: BookingDetails): Promise<Array<any>> => {
	const { username, listing_id, start_date, end_date } = details;
	const { id: user_id } = await getUser(username);

	const isLimitExceeded = await isBookingLimit(user_id, BOOKING_LIMIT);
	const isOverlap = await isBookingOverlap(listing_id, start_date, end_date);

	if (isLimitExceeded) {
		throw new ERR_BOOKING_LIMIT(`Booking limit exceeded. Max is ${BOOKING_LIMIT}`, {
			level: ServerError.WARN,
			status: StatusCodes.FORBIDDEN,
		});
	}

	if (isOverlap) {
		throw new ERR_BOOKING_OVERLAP('Booking dates not available', {
			level: ServerError.WARN,
			status: StatusCodes.CONFLICT,
		});
	}

	return await knex('bookings').insert({ user_id, listing_id, start_date, end_date });
};

export const getUserBookings = async (username: string) => {
	const { id: user_id } = await getUser(username);
	const userBookings = await knex('bookings')
		.join('listings', 'listings.id', 'bookings.listing_id')
		.join('bikes', 'bikes.id', 'listings.bike_id')
		.join('locations', 'locations.id', 'listings.location_id')
		.select('listings.id as listing_id', 'bikes.type', 'bikes.price_per_day', 'locations.name as location')
		.where({ user_id });

	return userBookings;
};

const isBookingOverlap = async (listing_id: number, start_date: string, end_date: string): Promise<boolean> => {
	const result = await knex('bookings')
		.count('id', { as: 'total' })
		.whereBetween('start_date', [start_date, end_date])
		.orWhereBetween('end_date', [start_date, end_date])
		.orWhere('start_date', '<=', start_date)
		.andWhere('end_date', '>=', end_date)
		.andWhere({ listing_id });

	const { total } = result[0];

	return total > 0;
};

const isBookingLimit = async (user_id: number, max: number): Promise<boolean> => {
	const result = await knex('bookings').count('id', { as: 'total' }).where({ user_id });
	const { total } = result[0];
	return total >= max;
};
