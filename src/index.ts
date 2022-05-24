import express from 'express';
import http from 'http';
import { config } from './config/config';
import Logger from './logger';
import { bodyParser } from './middleware/body-parser';
import { requestLogger } from './middleware/request-logger';
import { healthCheck } from './routes/health-check';

const app = express();

const initServer = async () => {
	// log request
	app.use(requestLogger);

	app.use(bodyParser);

	// Healthcheck
	app.get('/health-check', healthCheck);

	http
		.createServer(app)
		.listen(config.server.port, () => Logger.info(`Server is running on port ${config.server.port}`));
};

(async () => {
	try {
		await initServer();
	} catch (error) {
		Logger.error(`error occurred while initializing service, ${error}`);
	}
})();
