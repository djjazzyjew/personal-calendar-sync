var express = require('express');
const { default: Event } = require('nylas/lib/models/event');
var router = express.Router();
const { access_token, client_id, client_secret, src_access_token, dest_access_token, src_calendar_id, dest_calendar_id } = require('../config');
const logger = require('../logger');

var nylasAppConfigs = {
    clientId: client_id,
    clientSecret: client_secret,
};
// setup the Nylas API
global.Nylas = require('nylas').config(nylasAppConfigs);

function addEvent(calendarID) {
    //const Nylas = require('nylas');
    //Nylas.config({clientId: 'clientId', clientSecret: 'clientSecret'});
    const nylas = Nylas.with(dest_access_token);

    //Create a new event
    const event = new Event(nylas);

    // Provide the appropriate id for a calendar to add the event to a specific calendar
    event.calendarId=calendarID;

    // Start filling out other fields
    event.title = '🎉 Party! 🎉';
    event.location = 'My House!';
    event.description = 'Let\'s celebrate our calendar integration!!';
    event.busy = true;

    // Participants are added as a list of EventParticipant objects
    // email is required, name is optional
    //event.participants = [new EventParticipant({name: 'My Nylas Friend', email: 'swag@nylas.com'})];
   
    // Set start time for tomorrow around current time
    const startDate = new Date();
    startDate.setMinutes((parseInt((startDate.getMinutes() + 37.5)/15) * 15) % 60);
    startDate.setSeconds(0);

    event.start = Date.parse(startDate)/1000 + (60*60*24); // Add 24 hours
    event.end = event.start + (60*30); // Add 30 min

    // .save()must be called to save the event to the third party provider
    // The event object must have values assigned to calendarId and when before you can save it.
    event.save({notify_participants: false});
}

router.get('/', function(req, res, next) {
    res.render("admin", { title: "Welcome to PCS event handler"});
});

router.get('/test-calendar-conectivity', function(req, res, next) {
  const nylas_src = Nylas.with(src_access_token);
  const nylas_dest = Nylas.with(dest_access_token);

  // Load hardcoded calendars based on IDs from .env
  nylas_src.calendars.find(src_calendar_id).then(calendars => {
    //logger.debug(`Source Calendar = "${calendars.name}"`);
  });
  
  nylas_dest.calendars.find(dest_calendar_id).then(calendars => {
    //logger.debug(`Destination Calendar = "${calendars.name}"`);

    addEvent(dest_calendar_id);
  });

  res.render("admin", { title: "Testing Nylas connection" });
});

module.exports = router;