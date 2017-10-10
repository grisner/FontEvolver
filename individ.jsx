var React = require('react');

var Character = React.createClass({
	/*propTypes: {
		id: React.proptypes.string,
		image: React.PropTypes.array
	},*/

/*
	setPixel: function(imageData, x, y, r, g, b, a) {
	    index = (x + y * imageData.width) * 4;
	    imageData.data[index+0] = r;
	    imageData.data[index+1] = g;
	    imageData.data[index+2] = b;
	    imageData.data[index+3] = a;
	},*/

	drawImage: function() {
		/*element = document.getElementById(id);
		c = element.getContext("2d");

		// read the width and height of the canvas
		width = element.width;
		height = element.height;


		// create a new pixel array
		imageData = c.createImageData(width, height);

		for(i=0; i < 10000; i++) {
			x = Math.random() * width | 0; // |0 to truncate to Int32
		    y = Math.random() * height | 0;
		    r = Math.random() * 256 | 0;
		    g = Math.random() * 256 | 0;
		    b = Math.random() * 256 | 0;
		    setPixel(imageData, x, y, r, g, b, 255); // 255 opaque
		}

		c.putImageData(imageData, 0, 0); // at coords 0,0*/
		
	},

	render: function() {
		/*return (
			var f = <td><canvas id={id}></canvas></td>
			drawImage();
		);*/
	}
});

var Individual = React.createClass({
	/*propTypes: {
		id: React.proptypes.string
		chars: React.PropTypes.array
	},*/

	render: function() {
		/*var id1 = {this.props.id} + '.' + 0;
		var id2 = {this.props.id} + '.' + 1;
		var id3 = {this.props.id} + '.' + 2;

		return (
			<tr>
				<Character image={this.props.chars[0]} id={id1}></Character>
				<Character image={this.props.chars[1]} id={id2}></Character>
				<Character image={this.props.chars[2]} id={id3}></Character>
			</tr>
		);*/
	}
});


module.exports = Individual;

// ERROR createClass not a function
// https://stackoverflow.com/questions/26627665/error-with-basic-react-example-uncaught-typeerror-undefined-is-not-a-function