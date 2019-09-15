const automl = require('@google-cloud/automl');

const client = new automl.PredictionServiceClient();

const projectId = 'stock-lines';
const computeRegion = 'us-central1';
const modelId = 'TCN8030616067907362128';

const modelFullId = client.modelPath(projectId, computeRegion, modelId);


function predict(text) {
	return new Promise(function(resolve, reject) {
		client.predict({name: modelFullId, payload: {
			textSnippet: {
				content: text,
				mime_type: "text/plain"
			}
		}, params: {}}).then((response) => {
			resolve(getHighestCategory(response));
		}).catch((error) => {
			console.log(error);
			reject(null);
		});
	});
}

function getHighestCategory(response) {
	var payload = response[0].payload;
	var highestScore = 0;
	var highestCat = null;
	for (var i = 0; i < payload.length; i++) {
		if (payload[i].classification.score > highestScore) {
			highestScore = payload[i].classification.score;
			highestCat = payload[i].displayName;
		}
	}
	return highestCat;
}

module.exports = predict;
