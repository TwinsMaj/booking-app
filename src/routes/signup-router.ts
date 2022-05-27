import express from 'express';
import controller from '../controllers/signup-controller';
import userValidation from '../validation/validation-schema';
import validate from '../middleware/validate';

const router = express.Router();
const { CREATE_USER_OTP_JOI_SCHEMA, CREATE_USER_JOI_SCHEMA } = userValidation;

router.post('/start', validate(CREATE_USER_OTP_JOI_SCHEMA), controller.startSignupProcess);
router.post('/finish', validate(CREATE_USER_JOI_SCHEMA), controller.completeSignupProcess);

export default router;
