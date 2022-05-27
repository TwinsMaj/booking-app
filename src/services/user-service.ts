import knex from '../knex';

export const doesUserExist = async (username: string): Promise<boolean> => {
	const result = await knex('users').count('id', { as: 'total' }).where({ username });
	const { total } = result[0];
	return total > 0;
};

export const createUser = async (username: string): Promise<void> => {
	await knex('users').insert({ username });
};

export const getUser = async (username: string) => {
	const result = await knex('users').select({ id: 'id', username: 'username' }).where({ username });
	return result[0];
};
