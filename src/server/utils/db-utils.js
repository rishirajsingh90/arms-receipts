const getDbConfig = function() {
  try {
      const config = require('../config/config.json');
      return config.DATABASE_URL;
      // do stuff
  } catch (ex) {
    // Receive and parse DB URL from env var
    return process.env.MONGODB_URI;
  }
};

module.exports.getDbConfig = getDbConfig;