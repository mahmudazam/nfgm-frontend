
/**
 * Imports:
 */
// Node Standard Modules:
const path = require('path'); // normalize, basename
// Firebase database control:
const fire = require('./fire').default; // database, auth
const fileIO = require('./fileIO'); // copyFile, deleteFile

/**
 * Pushes the URL of file in Firebase storage to the Firebase database
 * @param {String} refPath the Firebase storage location to store the file
 * @param {Object} assetInfo additional information about the asset
 * @param {String} keyName the field which will be used as the node's key
 * @param {boolean} keyRedundant whether or not to keep the key as a field
 * @return {Promise}
 */
function pushAssetInfo(refPath, assetInfo, keyName, keyRedundant) {
	// Create path names:
	if(refPath !== "") {
		refPath = path.normalize(refPath);
	}

	// Refer to database node for asset:
	let dbPath = path.normalize('/assets/' + refPath + '/'
			+ assetInfo[keyName].replace('.' , '_')).replace(' ' , '_');
	if(keyRedundant) {
		assetInfo[keyName] = null;
	}
	let dbRef = fire.database().ref(dbPath);

	// Push to database:
	return dbRef.set(assetInfo);

}

/**
 * A raw push to a database node
 * @param {String} refPath the path to the database node
 * @param {Object} obj the object to push to the database node
 * @return {Promise}
 */
function push(refPath, obj) {
	return fire.database().ref(refPath).set(obj);
}

/**
 * Push a new category to the database
 * @param {String} categoryName The name of the category to push
 * @return {Promise}
 */
function pushCategory(categoryName) {
	let categoryRef = fire.database().ref('/assets/categories/' + categoryName);
	let promise = new Promise((resolve, reject) => {
		categoryRef.once('value').then((snapshot) => {
			// Check if the category exists:
			if(null === snapshot.val()) {
				return categoryRef.child('items').set("NO_ITEMS_ADDED_YET");
			} else {
				reject("Category exists");
			}
		}).then(() => {
			// Category successfully pushed:
			resolve("Category " + categoryName
				+ " successfully pushed to database");
		});
	});
	return promise;
}

/**
 * Pushes an item's name to all categories in a list
 * @param {String} itemName the name of the item to push
 * @param {Array} categoryNames the names of categories to push itemName to
 * @return {Promise}
 */
function pushItemToCategories(itemName, categoryNames) {
	// Push itemName to all categories specified by categoryNames:
	let allPushes = categoryNames.map((categoryName) => {
		let categoryRef =
			fire.database().ref('/assets/categories/' + categoryName + '/items');
		return categoryRef.child(itemName).set("");
	});
	// Return a promise that resolves when itemNames has been pushed to all
	// categories in categoryNames:
	return Promise.all(allPushes);
}

/**
 * Pushes a file to www/assets/ with a corresponding database index:
 * @param {String} file file information
 * @param {String} destination the location of the file within www/assets/
 * @param {String} refPath the Firebase storage location to store the file
 * @param {String} keyName the name of the key field of assetInfo
 * @param {Object} assetInfo additional information about the asset
 */
function pushAsset(file, destination, refPath, keyName, assetInfo) {
	// Copy file to www/assets:
	let srcPath = file.path;
	let filename =  assetInfo[keyName] + path.extname(srcPath)
	let destPath = path.normalize(
		destination + '/assets/' + refPath + '/' + filename
	);

	let promise = fileIO.copyFile(srcPath, destPath).then((message) => {
		// An index for the file is added to the database:
		infoWithURL = JSON.parse(JSON.stringify(assetInfo));
		infoWithURL.asset_url = './'
			+ path.normalize('assets/' + refPath + '/' + filename);
		return pushAssetInfo(refPath , infoWithURL, keyName, true);
	});

	return promise;
}

/**
 * Pushes an item object for display in the Products view
 * @param {Object} itemInfo the information associated with the item to push
 * @param {Object} itemImage the information about the item's image file
 * @param {String} rootDirPath the path to the root public directory
 * @return {Promise}
 */
function pushItem(itemInfo, itemImage, rootDirPath) {
	// Create the promise: First push the item itself as an asset:
	let promise = pushAsset(
		itemImage,
		rootDirPath,
		'/items',
		'item_name',
		itemInfo
	).then(() => {
		// Next include the item in the specified categories:
		pushItemToCategories(itemInfo['item_name'], itemInfo['categories']);
	});

	return promise;
}

function deleteAsset(refPath, success, file_failure, db_failure) {
	bucket.file(refPath).delete().then(() => {
		push(
			path.normalize('/assets/' + refPath.replace('.' , '_').replace(' ', '_')),
			null,
			success,
			db_failure
		);
	}).catch(file_failure);
}

function deleteItemFromCategories(itemName, categories) {
	categories.map((category) => {
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

// Tests :
if('DB_TEST1' === process.argv[2]) {
	// Authentication for database edits:
	let DB_EMAIL = process.env.NFGM_ADDRESS;
	let DB_PASS = process.env.NFGM_DB_PASS;
	// 1. Test leaf functions:
	fire.auth().signInWithEmailAndPassword(DB_EMAIL, DB_PASS).then(() => {
		return push(
			'/assets/hours/',
			[
				{ name: 'Monday' , hours: '09:00AM - 09:00PM' },
				{ name: 'Tuesday' , hours: '09:00AM - 09:00PM' },
				{ name: 'Wednesday' , hours: '09:00AM - 09:00PM' },
				{ name: 'Thursday' , hours: '09:00AM - 09:00PM' },
				{ name: 'Friday' , hours: '09:00AM - 01:00PM, 02:00PM - 09:00PM' },
				{ name: 'Saturday' , hours: '09:00AM - 09:00PM' },
				{ name: 'Sunday' , hours: '09:00AM - 09:00PM' }
			]
		);
	}).then(() => {
		console.log('push hours: Success');
		return pushCategory("Spices")
	}).then((successMessage) => {
		console.log('pushCategory: ' + successMessage);
		return pushItemToCategories('Mint', ['Spices', 'Condiments'])
	}).then(() => {
		console.log('pushItemToCategories: Success');
		return pushAssetInfo(
			'/test',
			{
				test_name: 'pushAssetInfoTest',
				test_data: 'data'
			},
			'test_name',
			true
		);
	}).then(() => {
		console.log('pushAssetInfo: Success');
		console.log('Testing category overwrite:');
		return pushCategory("Spices");
	}).catch((error) => {
		console.log(error);
		return Promise.all([
			push('/assets/test', null),
			push('/assets/categories/Spices', null),
			push('/assets/categories/Condiments', null)
		]);
		// 2. Test functions that directly call leaf functions:
	}).then(() => {
		console.log('crude deletion: Success');
		return pushAsset(
			{
				path: '../../assets/img//img1.jpg'
			},
			'../../www/',
			'/carousel/',
			'name',
			{ name: 'first_image', description: 'A test image' }
		);
	}).then(() => {
		return fire.database().ref('/assets/carousel/first_image/')
			.once('value');
	}).then((snapshot) => {
		console.assert('first_image' === snapshot.key);
		console.assert('A test image' === snapshot.val().description);
		console.log('pushAsset: Success');
		// Test functions that do not call leaf functions:
		return Promise.all([
			pushItem(
				{
					item_name: 'Chicken',
					price: 4.99,
					unit: 'kg',
					description: 'Fresh chicken from the farms',
					sale_information: '',
					categories: ['Meat']
				},
				{ path: '../../assets/img//exim-food-item-img/Chicken/whole Chicken.jpg' },
				'../../www'
			),
			pushItem(
				{
					item_name: 'Carrots',
					price: 2.50,
					unit: 'kg',
					description: 'Fresh colourful carrots',
					sale_information: '',
					categories: ['Vegetables']
				},
				{ path: '../../assets/img//exim-food-item-img/Beef/Beef 1.jpg' },
				'../../www'
			),
			pushItem(
				{
					item_name: 'Cauliflower',
					price: 5.00,
					unit: 'kg',
					description: 'Fresh clean Cauliflower',
					sale_information: '',
					categories: ['Vegetables']
				},
				{ path: '../../assets/img//exim-food-item-img/Beef/Beef 1.jpg' },
				'../../www'
			),
			pushItem(
				{
					item_name: 'Duck',
					price: 5.99,
					unit: 'kg',
					description: 'Fresh duck',
					sale_information: '',
					categories: ['Meat']
				},
				{ path: '../../assets/img//exim-food-item-img/Chicken/Duck.jpg' },
				'../../www'
			),
			pushItem(
				{
					item_name: 'Beef',
					price: 5.99,
					unit: 'kg',
					description: 'Fresh beef from the farms',
					sale_information: '',
					categories: ['Meat']
				},
				{ path: '../../assets/img//exim-food-item-img/Beef/Beef 1.jpg' },
				'../../www'
			)
		]);
	}).then(() => {
		console.log('pushItem: Success');
	}).then(() => {
		return Promise.all(
			[
				push('/assets/carousel/', ""),
				fileIO.deleteFile('../../www/assets/carousel/first_image.jpg'),			]
		);
	}).then(() => {
		console.log("crude deletion: Success");
		return fire.auth().signOut();
	}).then(() => {
		console.log("sign out: Success");
		process.exit(0);
	}).catch((error) => {
		console.log(error);
		process.exit(1);
	});
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
	pushItemToCategories: pushItemToCategories
};

module.exports = database_handler;
