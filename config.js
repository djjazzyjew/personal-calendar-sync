// config.js
const dotenv = require('dotenv');
dotenv.config({ silent: true })

module.exports = {
  access_token: process.env.ACCESS_TOKEN,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  session_secret: process.env.SESSION_SECRET,
  src_access_token: process.env.SRC_ACCESS_TOKEN,
  dest_access_token: process.env.DEST_ACCESS_TOKEN,
  src_calendar_id: process.env.SRC_CALENDAR_ID,
  dest_calendar_id: process.env.DEST_CALENDAR_ID
};