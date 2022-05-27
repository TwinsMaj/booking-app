# booking-app

A simple app for making bike reservations

### Project Setup

- Node v17.9.0
- `Volta` Nodejs manager (you can use any Node version manageer of choice.)
- `npm` form managing packages

### Development

- make a new `.env` file from the `.env.example` file. Be sure to update the new `.env` file with the correct values
- ensure you have `npm` installed
- run `npm install`
- run `npm run migrate`
- run `npm run seed`
- run `NODE_ENV=test npm run migrate`
- run `npm start:dev to start the server`

### API Endpoints

- `/signup/start` POST request to initialize signup. Request Body should include `{username: string, email: string}`
- `/signup/finish` POST request to complete registration. Body should include
  `{username:string,otp:number, hash:string}` `hash` is returned from `/signup/start` endpoint
- `/token/refresh` POST request to refresh user's token. Token lasts for 24hrs
- `/bookings/reserve` POST request to make a booking. `{listingId: number, startDate:string, endDate:string}` Date
  should be in format `YYYY-MM-DD`
- `/view/listings` GET request to view all available listings
- `/bookings/view` GET request to view user's bookings

### Running Tests

- `npm run test:watch` to run tests

### TODO

- hook up docker
- add debugging with vscode
- unify npm scripts - helps to reduce the number of setup commands
- cache refreshTokens - This way, we can identify malicious tokens and prevent a denial of service attack
