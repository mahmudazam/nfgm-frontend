const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const fs = require('fs');
const https = require('https');
const http = require('http');
const querystring = require('querystring');
const bodyParser = require('body-parser');
const app = express();

const compiler = webpack(webpackConfig);

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

app.use(express.static(__dirname + '/www'));
app.post('/', function(req, res) {
  console.log(req.body);
  res.send('POST Received');
});

https_server = https.createServer({
  key: fs.readFileSync('src/ssl/key.pem'),
  cert: fs.readFileSync('src/ssl/cert.pem'),
  passphrase: 'crypto111'
}, app);

https_server.listen(443);

http_server = http.createServer(function(req, res) {
  res.writeHead(301, {"Location" : "https://" + req.headers['host'] + req.url })
  res.end();
});

http_server.listen(80);
