import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getListings } from '../services/listing-service';

const fetchListings = async (req: Request, res: Response, next: NextFunction): Promise<Record<string, any> | void> => {
	try {
		const listings = await getListings();
		return res.status(StatusCodes.OK).send({ data: listings });
	} catch (err) {
		return next(err);
	}
};

export default { fetchListings };
