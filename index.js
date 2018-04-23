const TOKEN = process.env.access_token;
const SECRET = process.env.channel_secret;
const PORT = process.env.PORT | 8080;

const express = require('express');
const logfmt = require('logfmt');
const bodyParser = require('body-parser');
const app = express();

const line = require('@line/bot-sdk');
const client = new line.Client({
  channelAccessToken: TOKEN
});

const line


app.use(logfmt.requestLogger());
app.use(bodyParser.json());

// Make sure Server alive
app.get('/', function(req, res) {
	res.status(200).end("Server alive!");
	console.log(req.body);
});

app.post('/', function(req, res) {
	var webhook_obj = req.body.events[0];
	console.log(webhook_obj);
	var message = {type: 'text', text: webhook_obj.message.text};
	client.replyMessage(webhook_obj.replyToken, [message, getCarousell()])
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

function getCarousell() {
	return {
		type: "template",
		template: {
			type: "image_carousel",
			columns: [
          		{
            		"imageUrl": "https://example.com/bot/images/item1.jpg",
            		"action": {
              			"type": "postback",
              			"label": "Buy",
              			"data": "action=buy&itemid=111"
            		}
          		},
          		{
            		"imageUrl": "https://example.com/bot/images/item2.jpg",
            		"action": {
              			"type": "message",
              			"label": "Yes",
              			"text": "yes"
            		}
          		},
          		{
            		"imageUrl": "https://example.com/bot/images/item3.jpg",
            		"action": {
              			"type": "uri",
              			"label": "View detail",
              			"uri": "http://example.com/page/222"
            		}
          		}
      		]
		}
	}
}

function parseMessage(message) {

}
