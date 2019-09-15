var csv = require('fast-csv');
var dict = {};
var data = [];

csv.fromPath('downloads/S&P 500 Historical Data (3).csv')
  .on('data', function(data) {
  dict[data[0]] = data[1];
  console.log(dict);
  });
