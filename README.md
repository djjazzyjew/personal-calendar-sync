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

## Webhooks
In order to get notified when your source calendar has changed, you will need to set up [Nylas Webhooks](https://developer.nylas.com/docs/developer-tools/webhooks/) to receive those events.

### Testing webhooks locally
The easiest way to test webhook functionality locally is by using the [Nylas CLI](https://developer.nylas.com/docs/developer-tools/cli/).  Once you have the CLI installed, use the following command to receive only calendar event `created`, `deleted`, and `updated` notifications:
```
nylas webhook tunnel --print --triggers event.created,event.updated,event.deleted
```