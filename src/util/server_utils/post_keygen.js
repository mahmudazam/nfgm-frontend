
const firebase_auth = require('./firebase_auth');
const asset_handler = require('./asset_handler');
const child_process = require('child_process');

function keygen(email, password) { 
  let key = child_process.execSync('randstr 256');
  let keyStr = key.toString().substr(0, key.length - 1); // remove trailing \n
  firebase_auth.signIn(email, password)
    .then(() => {
      return asset_handler.push('/post_key', keyStr);
    }).then(() => {
      return firebase_auth.signOut();
    }).catch((error) => {
      console.log(error);
      process.exit(1);
    });
  return keyStr;
}

if("TEST_KEYGEN" === process.argv[2]) {
  let key = keygen(process.env.NFGM_ADDRESS, process.env.NFGM_DB_PASS);
  console.log("POST key: " + key);
}

const post_keygen = {
  keygen: keygen
};

module.exports = post_keygen;

