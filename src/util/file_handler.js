
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

// DB_Auth:
const DB_EMAIL = process.env.NFGM_ADDRESS;
const DB_PASS = process.env.NFGM_DB_PASS;

/**
 * Pushes the URL of file in Firebase storage to the Firebase database
 * @param {String} readPath - path to the file to push
 * @param {String} refPath - the Firebase storage location to store the file
 * @param {String} storage_url - the URL of the Firebase storage location
 * @param {Object} assetInfo - additional information about the asset
*/
function pushAssetInfo(keyName, refPath, assetInfo) {
	// Create path names:
	if(refPath !== "") {
		refPath = path.normalize(refPath);
	}
	let promise = null;
	// Sign in to Firebase for making changes to the database:
	fire.auth().signInWithEmailAndPassword(DB_EMAIL, DB_PASS).then(function() {
		let user = fire.auth().currentUser;

		// Create database node for file :
		dbPath = path.normalize('/assets/' + refPath + '/'
				+ assetInfo[keyName].replace('.' , '_'));
		dbRef = fire.database().ref(dbPath);

		// Push to database:
		dbRef.set(assetInfo).then(function() {
			// Sign out of Firebase database after the push completes:
			fire.auth().signOut().then(function() { return; }).catch(function(error) {
				console.log("Error Code: %s\nError: %s", error.code, error.message);
			});
		});
	}).catch(function(error) {
			console.log("Error Code: %s\nError: %s", error.code, error.message);
	});
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
 * @param {Object} assetInfo - additional information about the asset
*/
function pushAsset(readPath, refPath, keyName, assetInfo) {
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
				return;
			}
			// An index for the file is added to the database:
			infoWithURL = JSON.parse(JSON.stringify(assetInfo));
			infoWithURL.storage_urls = URL;
			pushAssetInfo(keyName, refPath , infoWithURL);
		}
	);
}

// Entry point for testing :

// fire.database().ref('/FQWGucYy9EOGUQddRzkzWDrtiPe2/assets').once('value').
// 	then(function(snapshot) {
// 		fire.auth().signInWithEmailAndPassword(DB_EMAIL, DB_PASS).then(function() {
// 			fire.database().ref('/assets').set(snapshot.val());
// 			fire.auth().signOut().then(function() { return; });
// 		});
// 	});

// Pushing images to database:
pushAsset('../../assets/img/exim-food-item-img/Beef/Beef 1.jpg', '/items',
	'Item_Name',
	{
		Item_Name: 'Beef',
		Price: 5.99,
		Unit: 'kg',
		Description: 'Fresh beef from the farms',
		Sale: ''
	});
