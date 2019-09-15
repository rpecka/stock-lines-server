const express = require('express');
const bodyParser = require('body-parser');

const createTimeDictFromIndexData = require('./parseindex');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/ticker', (req, res) => {
	ticker = req.body.ticker;
	createTimeDictFromIndexData('./S&P 500 Historical Data (3).csv').then((data) => {
		var keys = Object.keys(data);
		keys.sort();
		var values = keys.map(function(key){
			return parseFloat(data[key].replace(/,/g, ''));
		});
		res.send({dates: keys, values: values, ticker:'S&P 500'});
	});
});

app.listen(port, () => console.log(`Listening on port ${port}`));
