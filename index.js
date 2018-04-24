const TOKEN = process.env.access_token;
const SECRET = process.env.channel_secret;
const PORT = process.env.PORT | 8080;
const RICHMENU_ID = process.env.richmenu_id;

const express = require('express');
const logfmt = require('logfmt');
const bodyParser = require('body-parser');
const line = require('@line/bot-sdk');
const fs = require('fs');
const crypto = require('crypto');
const func =  require('./line.js');

const personal_data = JSON.parse(fs.readFileSync('introduction.json', 'utf8'));
const keywords_list = JSON.parse(fs.readFileSync('keyword.json', 'utf8'));

const app = express();
const client = new line.Client({
  channelAccessToken: TOKEN
});

app.use(logfmt.requestLogger());
app.use(bodyParser.json());

// Make sure Server alive
app.get('/', function(req, res) {
	res.status(200).end("Server alive!");
	console.log(req.body);
});

app.post('/', function(req, res) {
	var signature = crypto.createHmac("sha256", SECRET).update(Buffer.from(JSON.stringify(req.body), 'utf8')).digest('base64');
	if (signature != req.header('X-Line-Signature')) {
		console.error("Authorization error");
		console.error("X-Line-Signature", req.header('X-Line-Signature'));
		console.error("My signature", signature);
		res.status(401).end();
	}
	else {
		var webhook_obj = req.body.events[0];
		console.log(webhook_obj);

		if (webhook_obj.type == "message") {
			var keyword = func.parseMessage(keywords_list, webhook_obj.message.text);
			var replyMessage = func.getReplyMessage(personal_data, keyword);

			//var message = {type: 'text', text: webhook_obj.message.text};
			client.replyMessage(webhook_obj.replyToken, replyMessage)
					.then(() => {
						console.log("Message: " + message.text);
					})
					.catch((err) => {
						console.log("Send reply error!");
					});
		}
		else if (webhook_obj.type == "join" || webhook_obj.type == "follow") {
			console.log(webhook_obj.source.userId, RICHMENU_ID);
			client.linkRichMenuToUser(webhook_obj.source.userId, RICHMENU_ID);
		}
	}
});

var port = Number(process.env.PORT || 8080);
app.listen(port, function() {
	console.log("Listening on", port);
});
