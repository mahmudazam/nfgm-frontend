const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const fs = require('fs');
const https = require('https');
const http = require('http');
const querystring = require('querystring');
const bodyParser = require('body-parser');
const email = require('./src/util/email');
const asset_handler = require('./src/util/file_handler');
const app = express();

const compiler = webpack(webpackConfig);

// Default Email Objects:
var defaultEmailToCustomer = function (fName) {
  return ({
    subject: "Your message to Natural Fresh Meat & Grocery",
    body: "Hi " + fName
      + ",\nThank you for contacting Natural Fresh Grocery & Meat.\n"
      + "We will get back to you as soon as possible."
  });
}

var emailToStorePersonnel = function(emailObj) {
  return ({
    subject: "Website Email from " + emailObj.fName + " " + emailObj.lName,
    body: "Email Address of Customer: " +  emailObj.eMail + "\n" +
          "Email Body: " + emailObj.message
  });
}

const storePersonnelEmail = [ 'tafique05@yahoo.com' , 'eximfoodinc@gmail.com' ];

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

// Handle POST Requests:
app.post('/customer_email', function(req, res) {
  // Respond to customer with a default email :
  email.sendEmail([req.body.eMail], defaultEmailToCustomer(req.body.fName));
  // Forward email to store personnel :
  email.sendEmail(storePersonnelEmail, emailToStorePersonnel(req.body))
  // Respond to browser :
  res.send('Email Received: ');
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
