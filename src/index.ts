import express from 'express';
import http from 'http'

const app = express();

const initServer = () => {
	http.createServer(app).listen(8585, () => console.log(`Server started`))
}

initServer();