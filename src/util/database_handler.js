
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
const keyFilename = process.argv[3] + '/exim-food-firebase-adminsdk-nsw0f-94a93e62ab.json';
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
 * @param {Object} assetInfo - additional information about the asset
 * @param {boolean} key_redundant - whether or not to keep the key as a field
*/
function pushAssetInfo(keyName, refPath, assetInfo, key_redundant,
		success, failure) {
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
				+ assetInfo[keyName].replace('.' , '_')).replace(' ' , '_');
		dbRef = fire.database().ref(dbPath);

		// Push to database:
		if(key_redundant) assetInfo[keyName] = null;
		dbRef.set(assetInfo).then(function() {
			// Sign out of Firebase database after the push completes:
			fire.auth().signOut().then(success).catch(function(error) {
				console.log("Error Code: %s\nError: %s", error.code, error.message);
			});
		}).catch(failure);
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
 * @param {String} file - file information
 * @param {String} refPath - the Firebase storage location to store the file
 * @param {Object} assetInfo - additional information about the asset
 */
function pushAsset(file, refPath, keyName, assetInfo, success, failure) {
	// Upload to the bucket:
	bucket.upload(
		file['path'],
		{
			destination: refPath + '/' + path.basename(assetInfo[keyName]),
			public: true
		},
		function(err, file) { // On completion:
			// Print error if any:
			if(err) {
				failure(err, file);
			} else {
				// Get the URL to the file just uploaded:
				URL = createPublicFileURL(refPath + '/'
					+ path.basename(assetInfo[keyName]));
				// If an undefined URL is obtained:
				if(!URL) {
					// We leave it blank:
					URL = '';
					return;
				}
				// An index for the file is added to the database:
				infoWithURL = JSON.parse(JSON.stringify(assetInfo));
				infoWithURL.storage_urls = URL;
				pushAssetInfo(keyName, refPath , infoWithURL, true, success, failure);
			}
		}
	);
}

function push(ref_path, obj, success, failure) {
	fire.auth().signInWithEmailAndPassword(DB_EMAIL, DB_PASS).then(function() {
		fire.database().ref(ref_path).set(obj).then(function() {
			fire.auth().signOut().then(success).catch(failure);
		}).catch(failure);
	})
}

/**
 * Push a new category to the database
 * @param {String} categoryName The name of the category to push
 * @return {Promise}
 */
function pushCategory(categoryName) {
	return new Promise(function(resolve, reject) {
		let categoryRef =
			fire.database().ref('/assets/categories/' + categoryName);
		// Sign in and access category:
		fire.auth().signInWithEmailAndPassword(DB_EMAIL, DB_PASS)
			.then(function() {
				return categoryRef.once('value');
			})
			// Check if the category exists:
			.then(function(snapshot) {
				if(null === snapshot.val()) {
					return categoryRef.child('items').set("NO_ITEMS_ADDED_YET");
				} else {
					fire.auth().signOut().then(function() {
						reject("Category exists");
					});
				}
			})
			// Category does not exist:
			.then(function() {
				fire.auth().signOut().then(function() {
					resolve("New category " + categoryName + " successfully uploaded");
				});
			})
			// Sign in failed:
			.catch(function(error) {
				reject(error.Error);
			})
	});
}

function pushItemToCategory(itemName, categoryNames, success, failure) {
	return new Promise(function(resolve, reject) {
		categoryNames.map((categoryName) => {
			fire.auth().signInWithEmailAndPassword(DB_EMAIL, DB_PASS).then(function() {
				let categoryRef = fire.database().ref(
					'/assets/categories/' + categoryName + '/items');
				categoryRef.once('value').then(function(snapshot) {
					categoryRef.child(itemName).set("");
				}).catch(failure);
			}).catch(failure);
		});
	});
}

function pushItem(itemInfo, itemImage, success, failure) {
	let newItem = {
		item_name: itemInfo['item_name'][0],
		description: itemInfo['description'][0],
		price: itemInfo['price'][0],
		unit: itemInfo['unit'][0],
		sale_information: itemInfo['sale_information'][0],
		categories: itemInfo['categories'].reduce(function(result, category) {
			result[category] = "";
			return result;
		}, {})
	};
	pushAsset(itemImage, '/items', 'item_name', newItem,
		function() {
			pushItemToCategory(itemInfo['item_name'][0], itemInfo['categories']);
			success();
		},
		failure
	);
}

function deleteAsset(refPath, success, file_failure, db_failure) {
	bucket.file(refPath).delete().then(function() {
		push(
			path.normalize('/assets/' + refPath.replace('.' , '_').replace(' ', '_')),
			null,
			success,
			db_failure
		);
	}).catch(file_failure);
}

function deleteItemFromCategories(itemName, categories) {
	categories.map(function(category) {
		let refPath = path.normalize(
			'/assets/categories/' + category + '/items/' + itemName
		);
		push(
			refPath,
			null,
			function() { ; },
			function(error) {
				console.log(
					"deleteItem:\nError Code: %s\nError: %s", error.code, error.message
				);
			}
		);
	});
}

function deleteItem(itemInfo, success, failure) {
	deleteItemFromCategories(itemInfo['item_name'][0], itemInfo['categories']);
	deleteAsset(
		path.normalize('items/' + itemInfo['item_name'][0]),
		success,
		failure
	);
}

// Entry point for testing :

// Pushing images to database:
if('TEST' === process.argv[2]) {
	push('/assets/hours/',
	[
		{ name: 'Monday' , hours: '09:00AM - 09:00PM' },
		{ name: 'Tuesday' , hours: '09:00AM - 09:00PM' },
		{ name: 'Wednesday' , hours: '09:00AM - 09:00PM' },
		{ name: 'Thursday' , hours: '09:00AM - 09:00PM' },
		{ name: 'Friday' , hours: '09:00AM - 01:00PM, 02:00PM - 09:00PM' },
		{ name: 'Saturday' , hours: '09:00AM - 09:00PM' },
		{ name: 'Sunday' , hours: '09:00AM - 09:00PM' }
	],
	function() { console.log('hours: Success') },
	function() { console.log('hours: Failure') });

	pushCategory("Spices").then(function(successMessage) {
		console.log(successMessage);
		return pushCategory("Spices");
	})
	.catch(function(error) {
		console.log(error);
	})

	pushItem(
		{
			item_name: ['Beef'],
			price: [5.99],
			unit: ['kg'],
			description: ['Fresh beef from the farms'],
			sale_information: [''],
			categories: ['Meat']
		},
		{ path: '../../assets/img/exim-food-item-img/Beef/Beef 1.jpg' },
		function() { console.log("pushItem: success") },
		function(error) { console.log(error.message); }
	);

  pushItem(
		{
			item_name: ['Chicken'],
			price: [4.99],
			unit: ['kg'],
			description: ['Fresh chicken from the farms'],
			sale_information: [''],
			categories: ['Meat']
		},
		{ path: '../../assets/img/exim-food-item-img/Chicken/whole Chicken.jpg' },
		function() { console.log("pushItem: success") },
		function(error) { console.log(error.message); }
	);

	pushItem(
		{
			item_name: ['Carrots'],
			price: [2.50],
			unit: ['kg'],
			description: ['Fresh colourful carrots'],
			sale_information: [''],
			categories: ['Vegetables']
		},
		{ path: '../../assets/img/exim-food-item-img/Beef/Beef 1.jpg' },
		function() { console.log("pushItem: success") },
		function(error) { console.log(error.message); }
	);

	pushItem(
		{
			item_name: ['Cauliflower'],
			price: [5.00],
			unit: ['kg'],
			description: ['Fresh clean Cauliflower'],
			sale_information: [''],
			categories: ['Vegetables']
		},
		{ path: '../../assets/img/exim-food-item-img/Beef/Beef 1.jpg' },
		function() { console.log("pushItem: success") },
		function(error) { console.log(error.message); }
	);

	pushItem(
		{
			item_name: ['Duck'],
			price: [5.99],
			unit: ['kg'],
			description: ['Fresh duck'],
			sale_information: [''],
			categories: ['Meat']
		},
		{ path: '../../assets/img/exim-food-item-img/Chicken/Duck.jpg' },
		function() {
			console.log("pushItem: success");
		},
		function(error) { console.log(error.message); }
	);

}

if("TEST_DELETE" === process.argv[2]) {
	deleteItem(
		{
			item_name: ['Duck'],
			price: [5.99],
			unit: ['kg'],
			description: ['Fresh duck'],
			sale_information: [''],
			categories: ['Meat']
		},
		function() { console.log("deleteItem: success") },
		function(error) { console.log(error.message); }
	);
}

const database_handler = {
	deleteAsset: deleteAsset,
	deleteItemFromCategories: deleteItemFromCategories,
	deleteItem: deleteItem,
	push: push,
	pushAsset: pushAsset,
	pushAssetInfo: pushAssetInfo,
	pushCategory: pushCategory,
	pushItem: pushItem,
	pushItemToCategory: pushItemToCategory
};

module.exports = database_handler;
