var client;

exports.setClient = function(dbClient) {
  client = dbClient;
};

exports.getClient = function() {
  return client;
};
