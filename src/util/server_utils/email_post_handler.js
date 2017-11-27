
const email = require('./email');
const multiparty = require('multiparty');
const util = require('util');
var express_rate_limit = require("express-rate-limit");

// Default Email Objects:
const storePersonnelEmail = [ 'tafique05@yahoo.com' , 'eximfoodinc@gmail.com' ];

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

const emailToString = function(emailObj) {
  return util.format(
    "First name: %s\nLast name: %s\nEmail Address: %s\nMessage: %s\n",
    emailObj.fName, emailObj.lName, emailObj.eMail, emailObj.message
  );
}

// Rate limiter:
var limiter = new express_rate_limit({
  windowMs: 30*60*1000, // block for 30 minutes after the max number of requests
  max: 5, // a maximum of 5 requests at a time
  delayAfter: 1, // begin dealy after first request
  delayMs: 5 * 1000, // delay for 5 second after each request
  message: "Too many emails being sent: please try again later"
});

function configure(app) {
  app.post('/customer_email', limiter, function(req, res) {
    let form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
      try {
        console.log(">> Email request recieved: " + emailToString(fields));
        // Respond to customer with a default email:
        // email.sendEmail([fields.eMail], defaultEmailToCustomer(fields.fName));
        // Forward email to store personnel :
        // email.sendEmail(storePersonnelEmail, emailToStorePersonnel(fields));
        // Respond to browser :
        res.send("SUCCESS");
      } catch(error) {
        console.log(">> Error processing email request");
        res.send("ERROR");
      }
    });
  });
}

const email_post_handler = {
  configure: configure
};

module.exports = email_post_handler;

