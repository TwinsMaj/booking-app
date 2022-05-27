import type { Knex } from 'knex';
import path from 'path';

const config: { [key: string]: Knex.Config } = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: path.resolve(__dirname, '../dev.sqlite3'),
			dateStrings: true,
		},
		migrations: {
			tableName: 'migrations',
			directory: './data/migrations',
		},
		seeds: {
			directory: './data/seeds',
		},
		useNullAsDefault: true,
	},
	test: {
		client: 'sqlite3',
		connection: {
			filename: path.resolve(__dirname, '../test.sqlite3'),
			dateStrings: true,
		},
		migrations: {
			tableName: 'migrations',
			directory: './data/migrations',
		},
		seeds: {
			directory: './data/seeds',
		},
		useNullAsDefault: true,
	},
};

export default config;
