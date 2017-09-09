
/**
 * Imports:
 */
// Node Standard Modules:
const path = require('path'); // normalize, basename
const fs = require('fs'); // createReadStream, createWriteStream

function copyFile(source, destination) {
	let promise = new Promise((reject, resolve) => {
		// Stream to read source file:
		let srcStream = fs.createReadStream(source);
    srcStream.on("error", (error) => {
      reject(error);
    })

    // Stream to write destination file:
		let destStream = fs.createWriteStream(destination);
    destStream.on("error", (error) => {
      reject(error);
    })

    // Resolve promise on successfully reading the source file:
		destStream.on('close', () => {
			resolve({ status: 'SUCCESS', source: source, destination: destination});
		});
		srcStream.pipe(destStream);
	});

	return promise;
}

module.exports = {
  copyFile: copyFile
};
