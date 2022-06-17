var express = require('express');
var router = express.Router();
const logger = require('../logger');

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
  logger.debug(`-------------------------------`);
  logger.debug(`Events webhook called`);

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

module.exports = router;