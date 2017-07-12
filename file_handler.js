
/**
	Imports:
*/
// File Operations:
var fs = require('fs');
// Firebase database control:
var fire = require('./fire').default;
// Path string handler :
var path = require('path');

// Google Cloud Storage Setup :
const keyFilename = './exim-food-firebase-adminsdk-nsw0f-b78e25c82b.json';
const projectId = 'exim-food';
const bucketName = 'exim-food.appspot.com';

const gcs = require('@google-cloud/storage')({
		projectId,
		keyFilename});

const bucket = gcs.bucket(bucketName);

/**
	* Pushes the URL of file in Firebase storage to the Firebase database
	* readPath ::= string specifying path to the file to push
	* refPath ::= string specifying the storage directory to write to
*/
function pushAssetIndex(readPath , refPath, storage_url) {
	// Create path names:
	readPath = path.normalize(readPath);
	filename = path.basename(readPath);
	if(refPath !== "") {
		refPath = path.normalize(refPath);
	}
	
	// Create database node for file :
	dbPath = path.normalize('assets/' + refPath + '/' 
			+ filename.replace('.' , '_'));
	dbRef = fire.database().ref(dbPath);
	dbRef.child('name').set(filename);
	dbRef.child('URL').set(storage_url);
		
}

function pushAsset(readPath , refPath) {
	// Get a stream to a the specified file :
	readStream = fs.createReadStream(readPath);
	
	// Get a reference to a bucket node:
	bucketRef = bucket.file(refPath + '/' + path.basename(readPath));
	
	// Write the file to the bucket:
	writeStream = bucketRef.createWriteStream();
	readStream.pipe(writeStream)
		.on('error', function (err) { console.log(err); })
		.on('finish' , function () {
			pushAssetIndex(readPath , refPath , "");
		})
}

// Entry point for testing :
pushAsset("./fire.js", "/text_files");
