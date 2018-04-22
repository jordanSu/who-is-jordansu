const TOKEN = process.env.access_token;
const SECRET = process.env.channel_secret;
const PORT = process.env.PORT | 8080;

var express = require('express');
const app = express();

var server = app.listen(PORT, function() {
	var port = server.address().port;
	console.log("App now running on port", port);
});


