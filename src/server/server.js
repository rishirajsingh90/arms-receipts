const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const routes = require('./routes');
const MongoClient = require('mongodb').MongoClient;
const dbUtils = require('./utils/db-utils');
const db = require('./db');

// using webpack-dev-server and middleware in development environment
if(process.env.NODE_ENV !== 'production') {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpack = require('webpack');
  const config = require('./../../webpack.config.js');
  const compiler = webpack(config);
  
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.join(__dirname, '../../public')));

app.get('/', function(request, response) {
  response.sendFile('/index.html', {'root': './public'})
});

// Initialize connection once
MongoClient.connect(dbUtils.getDbConfig(), function(err, database) {  if(err) throw err;
  db.setClient(database);
  app.listen(PORT, function(error) {
    if (error) {
      console.error(error);
    } else {
      console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    }
  });
});

app.use('/', routes);
