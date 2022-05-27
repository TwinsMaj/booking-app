import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
	await knex('users').del();

	await knex('users').insert([
		{ id: 1, username: 'John' },
		{ id: 2, username: 'Maria' },
		{ id: 3, username: 'Tomy' },
	]);
}
