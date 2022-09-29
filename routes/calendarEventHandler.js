var express = require('express');
var router = express.Router();
const { access_token, client_id, client_secret, src_access_token, dest_access_token, src_calendar_id, dest_calendar_id } = require('../config');
const logger = require('../logger');

var nylasAppConfigs = {
    clientId: client_id,
    clientSecret: client_secret,
};
// setup the Nylas API
global.Nylas = require('nylas').config(nylasAppConfigs);

router.get('/', function(req, res, next) {
    res.render("admin", { title: "Welcome to PCS event handler"});
});

router.get('/test-calendar-conectivity', function(req, res, next) {
  const nylas_src = Nylas.with(src_access_token);
  const nylas_dest = Nylas.with(dest_access_token);

  nylas_src.calendars.find(src_calendar_id).then(calendars => logger.debug(calendars));

//   // Return all accounts connected to your Nylas App.
//   if(Nylas.accounts) {
//     Nylas.accounts.list().then(accounts => {
//       for (let account of accounts) {
//         logger.debug(`Email: ${account.emailAddress} | Billing State: ${account.billingState} | Sync State: ${account.syncState} | ID: ${account.id}`);
//       }
//     });
//   } else { logger.debug('No accounts or this user')};

  res.render("admin", { title: "Testing Nylas connection" });
});

module.exports = router;