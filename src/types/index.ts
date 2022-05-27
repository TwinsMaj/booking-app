export type ErrorLevel = 'error' | 'warn' | 'info' | 'debug';
export interface JwtPayload {
	username: string;
}

export type Listing = {
	id: number;
	type: string;
	price_per_day: number;
	location: string;
};

export type BookingDetails = {
	username: string;
	listing_id: number;
	start_date: string;
	end_date: string;
};
