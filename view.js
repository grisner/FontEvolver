var React = require('react');
var Individual = require('./individ.jsx');
console.log("view.js");

var viewFromIndexJS = JSON.parse(document.getElementById('initial-data').getAttribute('data-json'));
//var chars = [[1,2],[2,3],[3,4]];
React.render(
	<Individual chars={viewFromIndexJS}/>, document.getElementById('container')
);