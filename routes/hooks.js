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

/* Message Created Webhook */
// GET to connect webhook with challenge in response
router.get('/created', (req, res, next) => {
  res.send(req.query.challenge);
});

// POST to handle webhook events
router.post('/created', (req, res, next) => {
  logger.debug(`-------------------------------`);
  logger.debug(`Created webhook called`);

  const data = req.body.deltas;
  if(data) {
    for (var i = 0; i < data.length; i++) {
      var readableDate = new Date(data[i].date*1000);
      logger.info(
        `${data[i].type} at "${readableDate.toLocaleString()}" with id ${data[i].object_data.id}`
      );
    }
  }

  return res.status(200).send('success');
});

/* All Events Webhook */
// GET to connect webhook with challenge in response
router.get('/events', (req, res, next) => {
  res.send(req.query.challenge);
});

// POST to handle webhook events
router.post('/events', (req, res, next) => {
  const nylas_src = Nylas.with(src_access_token);
  const nylas_dest = Nylas.with(dest_access_token);

  logger.debug(`-------------------------------`);
  logger.debug(`Events webhook called`);

  const data = req.body.deltas;
  if(data) {
    for (var i = 0; i < data.length; i++) {
      var readableDate = new Date(data[i].date*1000);
      logger.info(
        `${data[i].type} at "${readableDate.toLocaleString()}" with id ${data[i].object_data.id}`
      );
      if(data[i].type == "event.updated"){
        nylas_dest.events.find(data[i].object_data.id).then(event => {
          logger.info(`Event found! "${event.title}"`);
        });
      }
    }
  }

  return res.status(200).send('success');
});

module.exports = router;