import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('listings', (table) => {
		table.increments('id');
		table.integer('location_id').notNullable().references('id').inTable('locations').onDelete('CASCADE');
		table.integer('bike_id').notNullable().references('id').inTable('bikes').onDelete('CASCADE');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('listings');
}
