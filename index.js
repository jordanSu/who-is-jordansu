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
	// 內容：履歷，學歷，實習經驗，比賽或其他得獎經歷
	return {
		type: "template",
		altText: "你可以做些什麼？",
		template: {
			type: "image_carousel",
			columns: [
          		{
            		"imageUrl": "https://cdn4.iconfinder.com/data/icons/staff-management-vol-1/72/34-256.png",
            		"action": {
              			"type": "uri",
              			"label": "看看履歷",
              			"uri": "https://raw.githubusercontent.com/jordanSu/who-is-jordansu/master/Resume.pdf"
            		}
          		},
          		{
            		"imageUrl": "https://cdn3.iconfinder.com/data/icons/school-icons-3/512/Graduation_Hat-256.png",
            		"action": {
              			"type": "message",
              			"label": "學歷",
              			"text": "yes"
            		}
          		},
          		{
            		"imageUrl": "https://cdn3.iconfinder.com/data/icons/mind-process/64/29_experience_gain-256.png",
            		"action": {
              			"type": "message",
              			"label": "實習經驗",
              			"text": "http://example.com/page/222"
            		}
          		},
				{
            		"imageUrl": "https://cdn2.iconfinder.com/data/icons/essentials-volume-3/128/medal-3-256.png",
            		"action": {
              			"type": "message",
              			"label": "比賽與得獎經歷",
              			"text": "http://example.com/page/222"
            		}
          		}
      		]
		}
	}
}

function parseMessage(message) {

}
