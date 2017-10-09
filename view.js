var React = require('react');
var View = require('./view.jsx');

var viewFromViewJSX = JSON.parse(document.getElementById('initial-data').getAttribute('data-json'));
React.render(
	<View view={viewFromViewJSX} />, document.getElementById('container')
);