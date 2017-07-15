
/**
 * Imports:
*/
// File Operations:
var fs = require('fs');
// Firebase database control:
var fire = require('./fire').default;
// Path string handler :
var path = require('path');

// Google Cloud Storage Setup :
const keyFilename = './exim-food-firebase-adminsdk-nsw0f-94a93e62ab.json';
const projectId = 'exim-food';
const bucketName = 'exim-food.appspot.com';

const gcs = require('@google-cloud/storage')({
		projectId,
		keyFilename});

const bucket = gcs.bucket(bucketName);

/**
 * Pushes the URL of file in Firebase storage to the Firebase database
 * @param {String} readPath - path to the file to push
 * @param {String} refPath - the Firebase storage location to store the file
 * @param {String} storage_url - the URL of the Firebase storage location
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
	dbRef.child('Name').set(filename);
	dbRef.child('URL').set(storage_url);
	dbRef.child('Upload Time').set(new Date().toString());
		
}

/**
 * A convenience function for creating a URL to access the storage
 * location specified:
 * @param {String} storageName - the storage location in Firebase storage
*/
function createPublicFileURL(storageName) {
	return ('https://storage.googleapis.com/')
		+ path.normalize(bucketName + '/' + storageName);
}

/**
 * Pushes a file to Firebase storage with a corresponding database index:
 * @param {String} readPath - path to the file to push
 * @param {String} refPath - the Firebase storage location to store the file
*/
function pushAsset(readPath , refPath) {
	// Upload to the bucket:
	bucket.upload(readPath,
		{ destination: refPath + '/' + path.basename(readPath),
			public: true  },
		function(err, file) { // On completion:
			// Print error if any:
			if(err) {
				console.log(err);
				return;
			}
			// Get the URL to the file just uploaded:
			URL = createPublicFileURL(refPath + '/'
				+ path.basename(readPath));
			// If an undefined URL is obtained:
			if(!URL) {
				// We leave it blank:
				URL = '';
			}
			// An index for the file is added to the database:
			pushAssetIndex(readPath , refPath , URL);
		}
	);
}

// Entry point for testing :

// Pushing data:
pushAsset("./test.txt", "/txt");

// Pushing images to database:
pushAsset("../assets/img/img1.jpg", "/img");
pushAsset("../assets/img/img2.jpg", "/img");
pushAsset("../assets/img/img3.jpg", "/img");
pushAsset("../assets/img/img4.jpg", "/img");





