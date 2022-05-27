import knex from '../../knex';

export const generateSeeds = async () => {
	await knex('users').insert([
		{ id: 1, username: 'John' },
		{ id: 2, username: 'Maria' },
		{ id: 3, username: 'Tomy' },
	]);

	await knex('locations').insert([
		{ id: 1, name: 'Harbor' },
		{ id: 2, name: 'Airport' },
		{ id: 3, name: 'Park' },
		{ id: 4, name: 'Hall' },
	]);

	await knex('bikes').insert([
		{ id: 1, type: 'electric', price_per_day: 10 },
		{ id: 2, type: 'classic', price_per_day: 3 },
		{ id: 3, type: 'modern', price_per_day: 5 },
		{ id: 4, type: 'classic', price_per_day: 3 },
	]);

	await knex('listings').insert([
		{ id: 1, location_id: 1, bike_id: 4 },
		{ id: 2, location_id: 3, bike_id: 1 },
		{ id: 3, location_id: 4, bike_id: 3 },
		{ id: 4, location_id: 2, bike_id: 2 },
	]);
};
