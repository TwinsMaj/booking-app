/* eslint-disable new-cap */
import express, { Router } from 'express';
import SignupRouter from './signup-router';
import AuthRouter from './auth-router';
import BookingRouter from './booking-router';
import ListingRouter from './listings-route';

const router: Router = express.Router();

// mount all routes here...
router.use('/signup', SignupRouter);
router.use('/token', AuthRouter);
router.use('/bookings', BookingRouter);
router.use('/view', ListingRouter);

export default router;
