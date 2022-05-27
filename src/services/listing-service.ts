import knex from '../knex';
import { Listing } from '../types';

export const getListings = async (): Promise<Array<Listing>> => {
	const data = await knex('listings')
		.join('bikes', 'bikes.id', 'listings.bike_id')
		.join('locations', 'locations.id', 'listings.location_id')
		.select('listings.id as listing_id', 'bikes.type', 'bikes.price_per_day', 'locations.name as location');

	return data;
};
