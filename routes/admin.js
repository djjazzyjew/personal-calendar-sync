var express = require('express');
var router = express.Router();
const { access_token, client_id, client_secret } = require('../config');
const logger = require('../logger');

var nylasAppConfigs = {
  clientId: client_id,
  clientSecret: client_secret,
};
// setup the Nylas API
global.Nylas = require('nylas').config(nylasAppConfigs);

const nylas = Nylas.with(access_token);

router.get('/', function(req, res, next) {
  res.render("admin", { title: "Welcome to PCS admin"});
});

router.get('/test-connection', function(req, res, next) {
  // Make call to Nylas API to make sure everything is setup correctly
  nylas.account.get().then(account => logger.debug(`Account found: ${account}`));

  // Return all accounts connected to your Nylas App.
  if(Nylas.accounts) {
    Nylas.accounts.list().then(accounts => {
      for (let account of accounts) {
        logger.debug(`Email: ${account.emailAddress} | Billing State: ${account.billingState} | Sync State: ${account.syncState} | ID: ${account.id}`);
      }
    });
  } else { logger.debug('No accounts or this user')};

  res.render("admin", { title: "Testing Nylas connection" });
});

module.exports = router;