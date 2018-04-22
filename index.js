const TOKEN = process.env.access_token;
const SECRET = process.env.channel_secret;
const PORT = process.env.PORT | 8080;

const express = require('express');
const logfmt = require('logfmt');
const bodyParser = require('body-parser');
const app = express();
/*
const line = require('@line/bot-sdk');
const client = new line.Client({
  channelAccessToken: TOKEN
});
*/

app.use(logfmt.requestLogger());
app.use(bodyParser.json());

// Make sure Server alive
app.get('/', function(req, res) {
	res.status(200).end("Server alive!");
	console.log(req.body);
});

app.post('/', function(req, res) {
	console.log(req.body);
	var message = {type: 'text', text: req.body};
	client.replyMessage(req.body.replyToken, message)
			.then(() => {
				console.log("Message: " + message.text);
			})
			.catch((err) => {
				console.log("Send reply error!");
			})
});

var port = Number(process.env.PORT || 8080);
app.listen(port, function() {
	console.log("Listening on ", port);
});
