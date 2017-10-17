var express = require('express');
var browserify = require('browserify');
var React = require('react');
var jsx = require('node-jsx');
var app = express();
jsx.install();

import { program } from "./evolution";
import { timer } from "./timer";


let p = new program();


let Generation = require('./Individual.js');
var gen = React.createElement(Generation, {
    id: "gen1",
    genNum: "1"
});

app.use('/runEvolution', function(req, res) {
    p.start();
});

app.use('/stopEvolution', function(req, res) {
    p.stop();
});

app.get('/test', function(res, req){
    console.log('program');
    console.log();

});

app.get('/getCharacterImage&:individualID&:characterID&:el', function (req, res) {
    
    let image = p.gen.population[0].characters[0].image;

    var result = {
        'image': image,
        'el': req.params.el,
        'individualID': req.params.individualID,
        'characterID': req.params.characterID
        
    };
    res.send(result);
});

// Frontend

app.use('/createGeneration', function (req, res) {
    res.setHeader('content-type', 'application/javascript');
    browserify('./app.js', {
        debug: true
    })
        .transform('reactify')
        .bundle()
        .pipe(res);
});

app.use('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.end(React.renderToStaticMarkup(React.DOM.body(null, React.DOM.div({
        id: 'container',
        dangerouslySetInnerHTML: {
            __html: React.renderToString(gen)
        }
    }), React.DOM.script({
        'id': 'initial-data',
        'type': 'text/plain',
        'data-json': JSON.stringify("1")
    }), React.DOM.script({
        src: '/createGeneration'
    }))));
});

var server = app.listen(80, function () {
    var addr = server.address();
    console.log('Listening @ http://%s:%d', addr.address, addr.port);
});

// TO RUN DOCKER 
// docker run -v $(pwd):/FontEvolver -p 80:80 -it node:version2 /bin/bash 

// Enter running container
// docker exec -it 9b7b039fef39 /bin/bash

// committing image
// docker commit 9b7b039fef39 node:version2

// running specific version of image
// docker run -v $(pwd):/FontEvolver -p 80:80 -td node:version2 /bin/bash 



