const TOKEN = process.env.access_token;
const SECRET = process.env.channel_secret;
const PORT = process.env.PORT | 8080;

var express = require('express');
var logfmt = require('logfmt');
const app = express();

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
	res.send('Hello World');
});

var port = Number(process.env.PORT || 8080);
app.listen(port, function() {
	console.log("Listening on ", port);
});

