
// External modules:
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const fs = require('fs');
const https = require('https');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const compiler = webpack(webpackConfig);

// Post request handlers:
const db_edit_post_handler =
  require('./src/util/server_utils/db_edit_post_handler');
const email_post_handler =
  require('./src/util/server_utils/email_post_handler');

// Express configurations:
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.json({limit : '3mb'}));
app.use(express.static(__dirname + '/www'));

// Configure post request handlers for database edits:
db_edit_post_handler.configure(app); // refer to db_edit_post_handler.js

// Configure post request handler for email:
email_post_handler.configure(app);

// Handle GET requests:
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/www/index.html'))
});

if("HTTPS" === process.argv[2]) {
  https_server = https.createServer({
    key: fs.readFileSync('src/ssl/key.pem'),
    cert: fs.readFileSync('src/ssl/cert.pem'),
    passphrase: 'crypto111'
  }, app);

  https_server.listen(443);

  http_server = http.createServer(function(req, res) {
    res.writeHead(301,
      {"Location" : "https://" + req.headers['host'] + req.url })
    res.end();
  });

  http_server.listen(80);
} else {
  const server = app.listen(3000, function() {
    const host = server.address().address;
    const port = server.address().port;
    console.log('NFGM listening at http://%s:%s', host, port);
  })
}

