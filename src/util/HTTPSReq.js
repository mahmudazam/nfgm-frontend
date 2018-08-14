import https from 'https';

  export const options = {
      hostname: 'localhost',
      port: 443,
      path: '/',
      method: '',
      rejectUnauthorized: false,
      requestCert: true,
      agent: false
  };

  const MAX_MESSAGE = 3145728;

  export function get(success, error) {
    let opt = JSON.parse(JSON.stringify(this.options));
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

  export function post(data, url, success, error) {
    let postData = data;

    let opt = JSON.parse(JSON.stringify(this.options));
    opt['method'] = 'POST';
    opt['headers'] = {
      'Content-Type': 'multipart/form-data',
      'Content-Length': Buffer.byteLength(postData)
    };
    opt['path'] = url;
    if(opt.headers['Content-Length'] > MAX_MESSAGE) {
      error("Message length exceeded");
    }
    let req = https.request(opt, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
      res.on('end', () => {
        console.log('No more data in response.');
        success();
      });
    });

    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
      error();
    });

    // write data to request body
    console.log(postData);
    req.write(postData);
    req.end();
  }

  export function postFormData(data, url, success, error) {
    let formData = new FormData();
    Object.keys(data).map(function(dataKey) {
      return formData.append(dataKey, data[dataKey]);
    });
    let xhr = new XMLHttpRequest();
    xhr.open('post', url, true);
    xhr.onload = function() {
      if("SUCCESS" === this.responseText) {
        console.log(this.responseText);
        success(this);
      } else {
        error(this);
      }
    }
    xhr.send(formData);
  }
