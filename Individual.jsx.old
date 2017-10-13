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
    var element = this.element;
    c = element.getContext("2d");

    // read the width and height of the canvas
    width = element.width;
    height = element.height;

    // create a new pixel array
    imageData = c.createImageData(width, height);

    if(this.initialImage) {
      var img = this.initialImage;
      this.initialImage = null;
    }
    else {
      var img = this.props.image;
    }

    for(i=0; i < 40000; i+=3) {
      x = i%width | 0; // |0 to truncate to Int32
        y = (i-width)/width | 0;
        r = img[i] | 0;
        g = img[i+1] | 0;
        b = img[i+2] | 0;
        setPixel(imageData, x, y, r, g, b, 255); // 255 opaque
    }

    c.putImageData(imageData, 0, 0); // at coords 0,0*/
  },

  createRandomData: function(sizeX, sizeY) {
    var arr = new Array(sizeX*sizeY*3);
    var values = sizeX*sizeY*3;

    for(i=0; i < values; i++) {
      arr[i] = Math.random() * 256 | 0;
    }

    return arr;
  },

  getInitialState() {
    console.log('initializing Character ' + this.props.id);
    this.initialImage = this.createRandomData(100, 100);
    //this.element = <canvas id={this.props.id} height="100" width="100">test</canvas>;
    this.element = <p>{this.props.id}</p>;
    return null;
  },

  render: function() {

    //this.drawImage();

    return (
      <div>{this.element}</div>
    );

  },
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
        <Character id="2.2" image={this.props.Characters}></Character>
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