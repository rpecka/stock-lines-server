const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/ticker', (req, res) => {
	ticker = req.body.ticker;
	res.status(400);
	res.send('We do not support the ticker: ' + ticker);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
