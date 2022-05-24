import express from 'express';
import http from 'http';
import { config } from './config/config';
import Logger from './logger';

const app = express();

const initServer = () => {
	http
		.createServer(app)
		.listen(config.server.port, () => Logger.info(`Server is running on port ${config.server.port}`));
};

initServer();
