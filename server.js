const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const fs = require('fs');
const https = require('https');
const http = require('http');
const bodyParser = require('body-parser');
const email = require('./src/util/email');
const app = express();
const path = require('path');
const multiparty = require('multiparty');
const asset_handler = require('./src/util/asset_handler');
const firebase_auth = require('./src/util/firebase_auth');

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

const emailToStorePersonnel = function(emailObj) {
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

// Function for parsing fields to remove single-element arrays:
function simplifyFields(fields) {
  return Object.keys(fields).reduce((result, fieldName) => {
    if('categories' !== fieldName) {
      result[fieldName] = fields[fieldName][0];
    } else {
      result['categories'] = JSON.parse(fields['categories'][0]);
    }
    return result
  }, {});
}

// Handle POST Requests:
app.post('/customer_email', function(req, res) {
  let form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    // Respond to customer with a default email :
    email.sendEmail([fields.eMail], defaultEmailToCustomer(fields.fName));
    // Forward email to store personnel :
    email.sendEmail(storePersonnelEmail, emailToStorePersonnel(fields));
    // Respond to browser :
    res.send("SUCCESS");
  });
});

// Database Edits:
const POST_KEY = process.env.NFGM_POST_KEY;
const DB_EMAIL = process.env.NFGM_ADDRESS;
const DB_PASS = process.env.NFGM_DB_PASS;
app.post('/add_item', function(req, res) {
  let form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    if(err) {
      res.send("ERROR");
    }
    if(fields) {
      if(POST_KEY === fields.post_key[0]) {
        firebase_auth.signIn(DB_EMAIL, DB_PASS).then(() => {
          asset_handler.pushItem(simplifyFields(fields), files.image[0], './www/')
            .then(() => {
              return firebase_auth.signOut();
            })
            .then(() => { res.send("SUCCESS"); })
            .catch((error) => {
              console.log(error);
              if(error instanceof Object) res.send(JSON.stringify(error));
              else res.send(error);
            });
        }).catch((error) => {
          console.log(error);
          res.send("Permission denied");
        })
      } else {
        console.log(fields);
        res.send("Permission denied");
      }
    }
  });
});

app.post('/add_category', function(req, res) {
  let form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    if(err) {
      res.send("ERROR");
    }
    if(fields) {
      if(POST_KEY === fields.post_key[0]) {
        firebase_auth.signIn(DB_EMAIL, DB_PASS).then(() => {
          asset_handler.pushCategory(fields.name[0])
            .then(() => {
              return firebase_auth.signOut();
            })
            .then(() => { res.send("SUCCESS"); })
            .catch((error) => {
              console.log(error);
              if(error instanceof Object) res.send(JSON.stringify(error));
              else res.send(error);
            });
        }).catch((error) => {
          console.log(error);
          res.send("Permission denied");
        })
      } else {
        console.log(fields);
        res.send("Permission denied");
      }
    }
  });
});

app.post('/delete_item', function(req, res) {
  let form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    if(err) {
      res.send("ERROR");
    }
    if(fields) {
      if(POST_KEY === fields.post_key[0]) {
        firebase_auth.signIn(DB_EMAIL, DB_PASS).then(() => {
          asset_handler.deleteItem(simplifyFields(fields), './www/')
            .then(() => {
              return firebase_auth.signOut();
            })
            .then(() => { res.send("SUCCESS"); })
            .catch((error) => {
              console.log(error);
              if(error instanceof Object) res.send(JSON.stringify(error));
              else res.send(error);
            });
        }).catch((error) => {
          console.log(error);
          res.send("Permission denied");
        })
      } else {
        console.log(fields);
        res.send("Permission denied");
      }
    }
  });
});

app.post('/add_carousel_image', function(req, res) {
  let form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    if(err) {
      res.send("ERROR");
    }
    if(fields) {
      if(POST_KEY === fields.post_key[0]) {
        firebase_auth.signIn(DB_EMAIL, DB_PASS).then(() => {
          asset_handler.pushCarouselImage(
              simplifyFields(fields), files.image[0], './www/')
            .then(() => {
              return firebase_auth.signOut();
            })
            .then(() => { res.send("SUCCESS"); })
            .catch((error) => {
              console.log(error);
              if(error instanceof Object) res.send(JSON.stringify(error));
              else res.send(error);
            });
        }).catch((error) => {
          console.log(error);
          res.send("Permission denied");
        })
      } else {
        console.log(fields);
        res.send("Permission denied");
      }
    }
  });
});

app.post('/delete_category', function(req,res) {
    let form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
      if(err) {
        res.send("ERROR");
      }
      if(fields) {
        if(POST_KEY === fields.post_key[0]) {
          firebase_auth.signIn(DB_EMAIL, DB_PASS).then(() => {
            asset_handler.deleteCategory(fields.name[0], './www/')
              .then(() => {
                  return firebase_auth.signOut();
              })
              .then(() => { res.send("SUCESS") })
              .catch((error) => {
                  console.log(error);
                  if(error instanceof Object) res.send(JSON.stringify(error));
                  else res.send(error);
              })
          }).catch((error) => {
            console.log(error);
            res.send("Permission denied");
          })
        } else {
          console.log(fields);
          res.send("Permission denied");
        }
      }
    });
});

app.post('/delete_carousel_image', function(req,res) {
    let form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
      if(err) {
        res.send("ERROR");
      }
      if(fields) {
        if(POST_KEY === fields.post_key[0]) {
          firebase_auth.signIn(DB_EMAIL, DB_PASS).then(() => {
            asset_handler.deleteCarouselImage(fields.image[0], './www/')
              .then(() => {
                  return firebase_auth.signOut();
              })
              .then(() => { res.send("SUCESS") })
              .catch((error) => {
                  console.log(error);
                  if(error instanceof Object) res.send(JSON.stringify(error));
                  else res.send(error);
              })
          }).catch((error) => {
            console.log(error);
            res.send("Permission denied");
          })
        } else {
          console.log(fields);
          res.send("Permission denied");
        }
      }
    });
});

// Handle GET requests:
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/www/index.html'))
})

if("HTTPS" === process.argv[2]) {
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
} else {
  const server = app.listen(3000, function() {
    const host = server.address().address;
    const port = server.address().port;
    console.log('NFGM listening at http://%s:%s', host, port);
  })
}
