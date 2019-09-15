var csv = require('csv-parser');
var fs = require('fs');

function convertToEpoch(day){
	let now = new Date(day);
	let present = now.getTime();
	return present;
}

function createTimeDictFromIndexData(index_path) {
	return new Promise(function(resolve, reject) {
		var dict = {};
		fs.createReadStream(index_path).pipe(csv({bom: false}))
		.on('data', (row) => {
			dict[convertToEpoch(row.date)] = row.price;
		})
		.on('end', () => {
			resolve(dict)
		})
	});
}

module.exports = createTimeDictFromIndexData;
