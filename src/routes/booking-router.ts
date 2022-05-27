import express from 'express';
import controller from '../controllers/booking-controller';
import { decodeToken } from '../middleware/authenticate-user';
import validate from '../middleware/validate';
import bookingValidation from '../validation/validation-schema';

const router = express.Router();
const { CREATE_BOOKING_JOI_SCHEMA } = bookingValidation;

router.post('/reserve', decodeToken, validate(CREATE_BOOKING_JOI_SCHEMA), controller.reserve);
router.get('/view', decodeToken, controller.bookingList);

export default router;
