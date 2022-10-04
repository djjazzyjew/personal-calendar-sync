# personal-calendar-sync
Using the Nylas APIs to sync personal calendar with work calendar

## To get started:
* Download this repo
* Run `npm install` to get packages
* Run `npm run dev` to start server with nodemon
* Go to [http://localhost:8000](http://localhost:8000) to load home page

## Logging
Logs will be sent to /logs/app.log locally.  See logger.js for options.

## Environment variables:
Create an .env file in the root of your app with the following information:
* ACCESS_TOKEN=\<your access token\>
* CLIENT_ID=\<your client id\>
* CLIENT_SECRET=\<your client secret\>
* SESSION_SECRET=\<your session secret\>
* SRC_CALENDAR_ID=\<id of calendar where the events will be pulled from\>
* SRC_ACCESS_TOKEN=\<access token of the account where the events will be pulled from\>
* DEST_CALENDAR_ID=\<id of calendar where the events will be pushed to\>
* DEST_ACCESS_TOKEN=\<access token of the account where the events will be pushed to\>

## Webhooks
In order to get notified when your source calendar has changed, you will need to set up [Nylas Webhooks](https://developer.nylas.com/docs/developer-tools/webhooks/) to receive those events.
