const config = require('../config/config.json');

const getDbConfig = function() {
  if (config) {
    return config.DATABASE_URL;
  }
  // Receive and parse DB URL from env var
  return process.env.DATABASE_URL;
};

module.exports.getDbConfig = getDbConfig;