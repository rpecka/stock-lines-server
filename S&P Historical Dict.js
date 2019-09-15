var csv = require('fast-csv');
var dict = {};
var data = [];

function converttoEpoch (day){
let now = new Date(day);
console.log(now);
let present = now.getTime();
return present;
}

csv.fromPath('C:/Users/Daniel/Downloads/S&P 500 Historical Data (3).csv')
  .on('data', function(data) {
  dict[converttoEpoch(data[0])] = data[1];
  console.log(dict);
  });
