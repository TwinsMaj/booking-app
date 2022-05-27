import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('bookings', (table) => {
		table.increments('id');
		table.string('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
		table.integer('listing_id').notNullable().references('id').inTable('listings').onDelete('CASCADE');
		table.date('start_date');
		table.date('end_date');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('bookings');
}
