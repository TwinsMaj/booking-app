import express from 'express';
import controller from '../controllers/listing-controller';

const router = express.Router();

router.get('/listings', controller.fetchListings);

export default router;
