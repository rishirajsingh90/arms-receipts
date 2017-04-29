const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const routes = require('./routes');
const db = require('./db');

// using webpack-dev-server and middleware in development environment
if(process.env.NODE_ENV !== 'production') {
  process.env.NODE_ENV = 'dev';
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpack = require('webpack');
  const config = require('./../../webpack.config.js');
  const compiler = webpack(config);
  
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

console.log('Environment set to ' + process.env.NODE_ENV);

app.use(express.static(path.join(__dirname, '../../public')));

app.use('/api', routes);

app.get('*', function(request, response) {
  response.sendFile('/index.html', {'root': './public'})
});

db.connect();

app.listen(PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  }
});
