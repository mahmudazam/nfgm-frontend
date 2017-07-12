
var fs = require('fs');
var fire = require('./fire').default;
var path = require('path');

/**
	* Pushes the URL of file in Firebase storage to the Firebase database
	* readPath ::= string specifying path to the file to push
	* refPath ::= string specifying the storage directory to write to
*/
function pushAssetIndex(readPath , refPath, storage_url) {
	fs.readFile(readPath , 'binary' , (err, data) => {
		// Create path names:
		readPath = path.normalize(readPath);
		filename = path.basename(readPath);
		if(refPath !== "") {
			refPath = path.normalize(refPath);
		}
		
		// Create database node for file :
		dbPath = 'assets/' + refPath + '/' + filename.replace('.' , '_');
		console.log(dbPath);
		dbRef = fire.database().ref(dbPath);
		dbRef.child('name').set(filename);
		dbRef.child('URL').set(storage_url);
		
	});
}

/**
	* Pushes a specified file to a specified Firebase storage location:
*/

// Entry point for testing :
pushAssetIndex('test.txt', 'text_files', '');