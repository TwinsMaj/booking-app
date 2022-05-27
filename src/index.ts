import express from 'express';
import http from 'http';
import Router from './routes';
import { config } from './config/config';
import Logger from './logger';
import cookieParser from 'cookie-parser';
import { apiRules } from './middleware/api-rules';
import { bodyParser } from './middleware/body-parser';
import { errorHandler } from './middleware/error-handler';
import { requestLogger } from './middleware/request-logger';
import { healthCheck } from './routes/health-check';

const app = express();

const initServer = async () => {
	// log request
	app.use(requestLogger);

	app.use(bodyParser);

	app.use(cookieParser());
	// define API Rules
	app.use(apiRules);

	// Healthcheck
	app.get('/health-check', healthCheck);

	// load routes...
	app.use('/api/v1', Router);

	// handle errors
	app.use(errorHandler);

	http
		.createServer(app)
		.listen(config.server.port, () => Logger.info(`Server is running on port: ${config.server.port}`));
};

(async () => {
	try {
		await initServer();
	} catch (error) {
		Logger.error(`error occurred while initializing service`, { error });
	}
})();
