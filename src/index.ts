import express from 'express';
import http from 'http'
import { config } from './config/config'

const app = express();

const initServer = () => {
	http.createServer(app).listen(config.server.port, () => console.log(`Server started`))
}

initServer();