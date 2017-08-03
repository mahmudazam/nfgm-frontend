
https = require('https');
querystring = require('querystring');

const host = 'localhost';
const port = '443';
const options = {
  hostname: 'localhost',
  port: 443,
  path: '/',
  method: '',
  rejectUnauthorized: false,
  requestCert: true,
  agent: false
};

function get(success, error) {
  opt = JSON.parse(JSON.stringify(options));
  opt['method'] = 'GET';
  const req = https.request(opt, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', (d) => {
      if(typeof success === 'function') success(d);
    });
  });

  req.on('error', (e) => {
    if(typeof error === 'function') error(e);
  });
  req.end();
}

function post() {

}

function post(data, success, error) {
  postData = querystring.stringify(data);

  opt = JSON.parse(JSON.stringify(options));
  opt['method'] = 'POST';
  opt['headers'] = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  };

  const req = https.request(opt, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      console.log('No more data in response.');
    });
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  // write data to request body
  console.log(postData);
  req.write(postData);
  req.end();
}

// get();
post({
  fName: "Hello",
  lName: "World",
  email: "hello.world@example.com",
  message: "Hello World"
});
