process.env.NODE_ENV = 'test';

import knex from '../../knex';
import { createUser, doesUserExist, getUser } from '../../services/user-service';

describe('users', () => {
	const username = 'rossy';

	beforeAll(async () => {
		await createUser(username);
	});

	afterAll(async () => {
		await knex.raw('DELETE FROM users');
	});

	it('should return true if user exists', async () => {
		const userExist = await doesUserExist(username);
		expect(userExist).toEqual(true);
	});

	it('should return user details', async () => {
		const userData = await getUser(username);
		expect(userData.username).toEqual(username);
	});
});
