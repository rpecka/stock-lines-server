const express = require('express');
const bodyParser = require('body-parser');
const predict = require('./predict');

const createTimeDictFromIndexData = require('./parseindex');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/ticker', (req, res) => {
	ticker = req.body.ticker;
	console.log('User requested ticker: ' + ticker);
	makeTickerResponse().then((response) => {
		res.send(response);
	});
});

app.post('/api/predict', (req, res) => {
	console.log("Request " + JSON.stringify(req.body));
	text = req.body.text;
	console.log("Text: " + text);
	predict(text).then((category) => {
		makeTickerResponse().then((response) => {
			// Write some random data for now
			response.dates.push('1568535042000');
			response.values.push(2570);
			res.send(JSON.stringify(response));
		});
	})
})

function makeTickerResponse() {
	return new Promise(function(resolve, reject) {
		createTimeDictFromIndexData('./S&P 500 Historical Data (3).csv').then((data) => {
			var keys = Object.keys(data);
			keys.sort();
			var values = keys.map(function(key){
				return parseFloat(data[key].replace(/,/g, ''));
			});
			resolve({dates: keys, values: values, ticker:'S&P 500'});
		});
	});
}

app.listen(port, () => console.log(`Listening on port ${port}`));
