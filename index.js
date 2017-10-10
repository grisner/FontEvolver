var express = require('express');
var browserify = require('browserify');
var React = require('react');
var jsx = require('node-jsx');
var app = express();

jsx.install();


var Individual = require('./Individual.jsx');

app.use('/createIndividuals', function(req, res) {
  res.setHeader('content-type', 'application/javascript');
  browserify('./app.js', {
    debug: true
  })
  .transform('reactify')
  .bundle()
  .pipe(res);
});

app.use('/', function(req, res) {

  var chars = new Array([1,2],[2,3],[3,4]);

  res.setHeader('Content-Type', 'text/html');
  res.end(React.renderToStaticMarkup(
    React.DOM.body(
      null,
      React.DOM.div({
        id: 'container',
        dangerouslySetInnerHTML: {
          __html: React.renderToString(React.createElement(Individual, {
            Characters: chars
          }))
        }
      }),
      React.DOM.script({
        'id': 'initial-data',
        'type': 'text/plain',
        'data-json': JSON.stringify(chars)
      }),
      React.DOM.script({
        src: '/createIndividuals'
      })
    )
  ));
});

var server = app.listen(80, function() {
  var addr = server.address();
  console.log('Listening @ http://%s:%d', addr.address, addr.port);
});