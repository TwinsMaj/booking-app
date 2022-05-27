import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getUserBookings, makeBooking } from '../services/bookings-service';

const reserve = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { username } = req;
		const { listingId: listing_id, startDate: start_date, endDate: end_date } = req.body;
		await makeBooking({ username, listing_id, start_date, end_date });

		return res.status(StatusCodes.CREATED).json({ success: true });
	} catch (error) {
		return next(error);
	}
};

const bookingList = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { username } = req;
		const bookings = await getUserBookings(username);

		return res.status(StatusCodes.OK).json({ data: bookings });
	} catch (error) {
		return next(error);
	}
};

export default { reserve, bookingList };
