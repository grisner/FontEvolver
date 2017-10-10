var React = require('react');


var Character = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    image: React.PropTypes.array
  },

  setPixel: function(imageData, x, y, r, g, b, a) {
      index = (x + y * imageData.width) * 4;
      imageData.data[index+0] = r;
      imageData.data[index+1] = g;
      imageData.data[index+2] = b;
      imageData.data[index+3] = a;
  },

  drawImage: function() {
    element = document.getElementById(id);
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
    return (<p>{this.props.image}</p>);
  }
});

var Individual = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    Characters: React.PropTypes.array.isRequired
  },

  render: function() {
    console.log(this.props.Characters[0])
    return (
      <div>
        <Character image={this.props.Characters}></Character>
      </div>
    );
  }

});

module.exports = Individual;

var Generation = React.createClass({
  propTypes: {
    genNum: React.PropTypes.string
  },

  render: function() {

    var chars = [[[1,2],[2,3],[3,4]],[[4,5],[5,6],[6,7]]];
    console.log(chars[0]);
    return (
      <div>
        <Individual id="2" Characters={chars[0]} />

        <button>click</button>
      </div>
    );
  }
});

module.exports = Generation;