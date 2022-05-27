import nodemailer from 'nodemailer';
import { config } from '../config/config';

const { email } = config.server;

const transporter = nodemailer.createTransport({
	service: 'hotmail',
	auth: {
		user: email.user,
		pass: email.pass,
	},
});

export const sendEmail = async (receiver: string, subject: string, text: string) => {
	await transporter.sendMail({
		from: `Scott Tiger <${email.user}>`,
		to: `${receiver}`,
		subject: `${subject}`,
		text: `${text}`,
	});
};

export function pick(object: { [x: string]: any }, keys: any[]) {
	return keys.reduce((obj, key) => {
		if (object && Object.prototype.hasOwnProperty.call(object, key)) {
			obj[key] = object[key];
		}
		return obj;
	}, {});
}
