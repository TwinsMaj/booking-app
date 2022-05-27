import knex from 'knex';
import config from './knexfile';
import * as appConfig from './config/config';

const env = appConfig.config.server.env;

export default knex(config[env]);
