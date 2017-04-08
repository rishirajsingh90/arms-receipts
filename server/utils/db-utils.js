const getDbConfig = function() {
  try {
      return require('../config/config.json');
      // do stuff
  } catch (ex) {
    // Receive and parse DB URL from env var
    return process.env.DATABASE_URL;
  }
};

module.exports.getDbConfig = getDbConfig;