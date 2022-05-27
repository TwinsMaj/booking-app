import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;
const OTP_SECRET = String(process.env.OTP_SECRET);
const EMAIL_USER = String(process.env.EMAIL_USER);
const EMAIL_PASSWORD = String(process.env.EMAIL_PASSWORD);
const JWT_ACCESS_TOKEN_SECRET = String(process.env.JWT_ACCESS_TOKEN_SECRET);
const JWT_REFRESH_TOKEN_SECRET = String(process.env.JWT_REFRESH_TOKEN_SECRET);

const devConfig = {
	server: {
		port: SERVER_PORT,
		env: 'development',
		auth: {
			otp_secret: OTP_SECRET,
			access_secret: JWT_ACCESS_TOKEN_SECRET,
			refresh_secret: JWT_REFRESH_TOKEN_SECRET,
		},
		email: {
			user: EMAIL_USER,
			pass: EMAIL_PASSWORD,
		},
	},
};

const testConfig = {
	server: {
		port: 3434,
		env: 'test',
		auth: {
			otp_secret: OTP_SECRET,
			access_secret: JWT_ACCESS_TOKEN_SECRET,
			refresh_secret: JWT_REFRESH_TOKEN_SECRET,
		},
		email: {
			user: EMAIL_USER,
			pass: EMAIL_PASSWORD,
		},
	},
};

export const config = process.env.NODE_ENV === 'test' ? testConfig : devConfig;
