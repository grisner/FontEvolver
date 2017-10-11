var express = require('express');
var browserify = require('browserify');
var React = require('react');
var jsx = require('node-jsx');
var app = express();

jsx.install();


var Generation = require('./Individual.jsx');

app.use('/createGeneration', function(req, res) {
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
          __html: React.renderToString(React.createElement(Generation, {
            genNum: "1"
          }))
        }
      }),
      React.DOM.script({
        'id': 'initial-data',
        'type': 'text/plain',
        'data-json': JSON.stringify("1")
      }),
      React.DOM.script({
        src: '/createGeneration'
      })
    )
  ));
});

var server = app.listen(80, function() {
  var addr = server.address();
  console.log('Listening @ http://%s:%d', addr.address, addr.port);
});

// TO RUN DOCKER 
// docker run -v $(pwd):/FontEvolver -p 80:80 -it node /bin/bash