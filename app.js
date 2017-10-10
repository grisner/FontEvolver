var React = require('react');
var Individual = require('./Individual.jsx');

var chars = JSON.parse(document.getElementById('initial-data').getAttribute('data-json'));
React.render(<Individual Characters={chars}/>, document.getElementById('container'));