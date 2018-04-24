const TOKEN = process.env.access_token;
const SECRET = process.env.channel_secret;
const PORT = process.env.PORT | 8080;

const express = require('express');
const logfmt = require('logfmt');
const bodyParser = require('body-parser');
const line = require('@line/bot-sdk');
const fs = require('fs');
const crypto = require('crypto')

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
		var replyMessage = [];
		var webhook_obj = req.body.events[0];
		console.log(webhook_obj);

		var keyword = parseMessage(webhook_obj.message.text);
		switch(keyword) {
			case "cv":
				replyMessage.push({type: 'text', text: personal_data.cv});
				break;
			case "education":
				replyMessage.push({type: 'text', text: personal_data.education});
				break;
			case "award":
				replyMessage.push({type: 'text', text: personal_data.award});
				break;
			case "internship":
				replyMessage.push({type: 'text', text: personal_data.internship});
				break;
			case "who":
				replyMessage.push({type: 'text', text: personal_data.who});
				replyMessage.push(getCarousell());
				break;
			default:
				replyMessage.push({type: 'text', text: "對不起，不太理解您的意思。您可以透過以下了解更多我的資訊喔？"});
				replyMessage.push(getCarousell());
				break;
		}
		//var message = {type: 'text', text: webhook_obj.message.text};
		client.replyMessage(webhook_obj.replyToken, replyMessage)
				.then(() => {
					console.log("Message: " + message.text);
				})
				.catch((err) => {
					console.log("Send reply error!");
				})
	}
});

var port = Number(process.env.PORT || 8080);
app.listen(port, function() {
	console.log("Listening on", port);
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
            		"thumbnailImageUrl": "https://cdn1.iconfinder.com/data/icons/business-seo-vol-1/512/CV_Contract_Agreement_Resume_Paper_Document-512.png",
					"imageBackgroundColor": "#009999",
					"text": "您可以查看我的履歷～",
					"actions": [
						{
              				"type": "uri",
              				"label": "看看履歷",
              				"uri": personal_data.cv
						},
					]
          		},
          		{
            		"thumbnailImageUrl": "https://cdn3.iconfinder.com/data/icons/higher-education-icon-set/128/graduationcap.png",
					"imageBackgroundColor": "#009999",
					"text": "您可以查看我的學歷～",
					"actions": [
						{
              				"type": "message",
              				"label": "看看學歷",
              				"text": personal_data.education
            			}
					]
          		},
          		{
            		"thumbnailImageUrl": "https://cdn.iconscout.com/public/images/icon/premium/png-256/sharing-experience-thought-communication-relation-348938d2d9d609f5-256x256.png",
					"imageBackgroundColor": "#009999",
					"text": "您可以了解我的實習經驗～",
					"actions": [
						{
              				"type": "message",
              				"label": "看看實習經驗",
              				"text": personal_data.internship
            			}
					]
          		},
				{
            		"thumbnailImageUrl": "https://cdn4.iconfinder.com/data/icons/trophy-and-awards-1/64/Icon_Medal_Trophy_Awards_Blue-256.png",
					"imageBackgroundColor": "#009999",
					"text": "您可以了解我的比賽與得獎經歷～",
					"actions": [
						{
              				"type": "message",
              				"label": "比賽與得獎經歷",
              				"text": personal_data.award
            			}
					]
          		}
      		]
		}
	};
}

function parseMessage(message) {
	for(var keyword in keywords_list) {
		if(keywords_list[keyword].some((word) => message.includes(word)))
			return keyword;
	}
}
