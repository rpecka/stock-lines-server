const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const predict = require('./predict');

const createTimeDictFromIndexData = require('./parseindex');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/ticker', (req, res) => {
	ticker = req.body.ticker;
	console.log('User requested ticker: ' + ticker);
	makeTickerResponse(null).then((response) => {
		res.send(response);
	});
});

app.post('/api/predict', (req, res) => {
	console.log("Request " + JSON.stringify(req.body));
	text = req.body.text;
	console.log("Text: " + text);
	predict(text).then((category) => {
		makeTickerResponse(category).then((response) => {
			let factor = factorForCategory(category);
			console.log("Using factor: " + factor + " for category: " + category);
			let last = response.values[response.values.length - 1];
			let newPrice = last + last * factor;
			response.dates.push((new Date).getTime());
			response.values.push(newPrice);
			res.send(JSON.stringify(response));
		});
	})
})

function makeTickerResponse(category) {
	return new Promise(function(resolve, reject) {
		createTimeDictFromIndexData('./S&P 500 Historical Data (3).csv').then((data) => {
			var keys = Object.keys(data);
			keys.sort();
			var values = keys.map(function(key){
				return parseFloat(data[key].replace(/,/g, ''));
			});
			resolve({dates: keys, values: values, ticker:'S&P 500', category: category});
		});
	});
}

function factorForCategory(category) {
	if (category === "drastic decrease") {
		return -1 * ((Math.random() * 0.01) + 0.015);
	} else if (category === "decrease") {
		return -1 * ((Math.random() * 0.01) + 0.005);
	} else if (category == "no_change") {
		return (Math.random() * 0.01) - 0.005;
	} else if (category == "increase") {
		return (Math.random() * 0.01) + 0.005;
	} else {
		return (Math.random() * 0.01) + 0.015;
	}
}

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
