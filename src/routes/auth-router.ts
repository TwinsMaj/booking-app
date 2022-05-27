import express from 'express';
import { refreshAccessToken } from '../controllers/auth-controller';

const router = express.Router();

router.post('/refresh', refreshAccessToken);

export default router;
