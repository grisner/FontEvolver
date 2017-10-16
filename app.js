var React = require('react');
var Generation = require('./Individual.js');

var chars = JSON.parse(document.getElementById('initial-data').getAttribute('data-json'));
//React.render(<Individual Characters={chars}/>, document.getElementById('container'));
React.render(<Generation id="gen" genNum="1"/>, document.getElementById('container'));