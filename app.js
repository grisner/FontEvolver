"use strict";

var React = require('react');
var Generation = require('./Individual.js');

var initData = JSON.parse(document.getElementById('initial-data').getAttribute('data-json'));
//React.render(<Individual Characters={chars}/>, document.getElementById('container'));
React.render(<Generation id="gen" popSize={initData.popSize} charSize={initData.charSize}/>, document.getElementById('container'));