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
			type: "carousel",
			imageSize: "contain",
			columns: [
          		{
            		"thumbnailImageUrl": "https://image.freepik.com/free-icon/resume-document_318-100353.jpg",
					"imageBackgroundColor": "#FFFFFF",
					"text": "",
					"actions": [
						{
              				"type": "uri",
              				"label": "看看履歷",
              				"uri": "https://raw.githubusercontent.com/jordanSu/who-is-jordansu/master/Resume.pdf"
						},
					]
          		},
          		{
            		"thumbnailImageUrl": "https://cdn3.iconfinder.com/data/icons/higher-education-icon-set/128/graduationcap.png",
					"imageBackgroundColor": "#FFFFFF",
					"text": "",
					"actions": [
						{
              				"type": "message",
              				"label": "學歷",
              				"text": "yes"
            			}
					]
          		},
          		{
            		"thumbnailImageUrl": "https://cdn.iconscout.com/public/images/icon/premium/png-256/sharing-experience-thought-communication-relation-348938d2d9d609f5-256x256.png",
					"imageBackgroundColor": "#FFFFFF",
					"text": "",
					"actions": [
						{
              				"type": "message",
              				"label": "實習經驗",
              				"text": "http://example.com/page/222"
            			}
					]
          		},
				{
            		"thumbnailImageUrl": "https://cdn4.iconfinder.com/data/icons/trophy-and-awards-1/64/Icon_Medal_Trophy_Awards_Blue-256.png",
					"imageBackgroundColor": "#FFFFFF",
					"text": "",
					"actions": [
						{
              				"type": "message",
              				"label": "比賽與得獎經歷",
              				"text": "http://example.com/page/222"
            			}
					]
          		}
      		]
		}
	};
}

function parseMessage(message) {

}
