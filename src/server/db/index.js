const pg = require('pg');
const utils = require('../utils/db-utils');

const config = utils.getDbConfig();
const client = new pg.Client(config);
client.connect();

module.exports = client;
