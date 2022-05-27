process.env.NODE_ENV = 'test';

import knex from '../../knex';
import { makeBooking } from '../../services/bookings-service';
import { generateSeeds } from './helper';

describe('bookings', () => {
	const username = 'Tomy';
	const bookingLimit = 1;
	const bookingDetails = {
		username,
		listing_id: 3,
		start_date: '2022-06-03',
		end_date: '2022-06-05',
	};

	beforeAll(async () => {
		await generateSeeds();
	});

	it('should create a booking', async () => {
		const result = await makeBooking(bookingDetails);

		expect(result[0]).toEqual(1);
	});

	it('should fail when booking overlaps', async () => {
		try {
			await makeBooking(bookingDetails);
		} catch (error: any) {
			expect(error.message).toEqual('Booking dates not available');
		}
	});

	it('should fail when booking exceeds limit', async () => {
		try {
			bookingDetails.start_date = `2022-06-12`;
			bookingDetails.end_date = `2022-06-17`;

			await makeBooking(bookingDetails);
		} catch (error: any) {
			expect(error.message).toEqual(`Booking limit exceeded. Max is ${bookingLimit}`);
		}
	});
});
