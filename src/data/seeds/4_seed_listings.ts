import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('listings').del();

	// Inserts seed entries
	await knex('listings').insert([
		{ id: 1, location_id: 1, bike_id: 4 },
		{ id: 2, location_id: 3, bike_id: 1 },
		{ id: 3, location_id: 4, bike_id: 3 },
		{ id: 4, location_id: 2, bike_id: 2 },
	]);
}
