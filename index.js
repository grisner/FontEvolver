var express = require('express');
var browserify = require('browserify');
var React = require('react');
var jsx = require('node-jsx');
var app = express();

jsx.install();


var View = require('./view.jsx');


app.use('/', function(req, res) { 

	var view = "asdf";
	
	res.setHeader('Content-Type', 'text/html');

	res.end(React.renderToStaticMarkup(
		React.DOM.body(
			null,
			React.DOM.div({
				id: 'container',
				dangerouslySetInnerHTML: {
				  __html: React.renderToString(React.createElement(
				  	View,
				  	{
				  		view
				  	}
				  ))
				}
			}),
			React.DOM.script({
				'id': 'initial-data',
				'type': 'text/plain',
				'data-json': JSON.stringify(view)
			})
		)
	));
});

var server = app.listen(80, function() {
  var addr = server.address();
  console.log('Listening @ http://%s:%d', addr.address, addr.port);
});