var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post("/", function(req, res) {
	console.log('test');
	console.log(req.body);


	res.send(req.body.test);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});