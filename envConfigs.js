const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  MB_APIKEY: process.env.MBAPI_KEY,
  PORT: process.env.PORT
};
