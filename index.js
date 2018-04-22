const TOKEN = process.env.access_token;
const SECRET = process.env.channel_secret;
const PORT = process.env.PORT | 8080;

var express = require('express');
var logfmt = require('logfmt');
var bodyParser = require('body-parser');
const app = express();

app.use(logfmt.requestLogger());
app.use(bodyParser.json());

app.get('/', function(req, res) {
	//res.send('Server alive!');
	res.status(200).end("Server alive!");
	console.log(req.body);
});

app.post('/', function(req, res) {
	console.log(req.body);
	res.status(200).end("你好");
});

var port = Number(process.env.PORT || 8080);
app.listen(port, function() {
	console.log("Listening on ", port);
});

