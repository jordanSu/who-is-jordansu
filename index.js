const TOKEN = process.env.access_token;
const SECRET = process.env.channel_secret;
const PORT = process.env.PORT | 8080;

var express = require('express');
var logfmt = require('logfmt');
const app = express();

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
<<<<<<< HEAD
	//res.send('Server alive!');
	res.status(200).end("Server alive!");
	console.log(req);
});

app.post('/', function(req, res) {
	console.log(req);
	res.status(200).end(req.message.text);
});

var port = Number(process.env.PORT || 8080);
app.listen(port, function() {
	console.log("Listening on ", port);
});

