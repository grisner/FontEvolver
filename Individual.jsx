var React = require('react');


class Char extends React.Component {
    componentDidMount() {
        this.updateCanvas();
    }
    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.fillRect(0,0, 100, 100);
    }
    render() {
        return (
            <canvas ref="canvas" width={300} height={300}/>
        );
    }
}

var Character = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
        image: React.PropTypes.array
    },

    setPixel: function (imageData, x, y, r, g, b, a) {
        index = (x + y * imageData.width) * 4;
        imageData.data[index + 0] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        imageData.data[index + 3] = a;
    },

    drawImage: function () {
        /*var Canvas = require('canvas'),
      Image = Canvas.Image,
      canvas = new Canvas(100, 100),
      ctx = canvas.getContext('2d');

      ctx.font = '30px Impact';
      ctx.rotate(0.1);
      ctx.fillText('Awesome!', 50, 80);

      return canvas;*/

        //var element = <canvas height="100" width="100"></canvas>
 
    },

    createRandomData: function (sizeX, sizeY) {
        var arr = new Array(sizeX * sizeY * 3);
        var values = sizeX * sizeY * 3;
        for (i = 0; i < values; i++) {
            arr[i] = Math.random() * 256 | 0;
        }
        return arr;
    },

    getInitialState() {
        //console.log('initializing Character ' + this.props.id);
        this.initialImage = this.createRandomData(100, 100);
        this.element = <canvas id={this.props.id} height="100" width="100"></canvas>;

        
        return null;
    },

    render: function () {
        return (
            <div>{this.element}</div>
        );
    }
});


var Individual = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
        Characters: React.PropTypes.array
    },

    render: function () {
        console.log(this.props.Characters[0]);
        return (<div>
        <Character></Character>
      </div>);
    }
});

module.exports = Individual;




var Generation = React.createClass({
    propTypes: {
        genNum: React.PropTypes.string,
        Individuals: React.PropTypes.array
    },

    getInitialState() {
        var ppl = new Array(10);

        for(i=0; i < 10; i++) {
            var chars = [[i+1,i+2,i+3],[i+2,i+3, i+4],[i+3,i+4,i+5]];    
            ppl[i] = chars;
        }
        var A = <Character id="1.A" image={chars[0]} />
        

        var gal = <Individual id="1" Characters={[A]} />
        
        this.props.Individuals = ppl;
        console.log(this.props.Individuals);
        
        return null;
    },

    drawImages: function(event) {
        console.log('test');



    },

    render: function () {
        var chars = [[[1, 2], [2, 3], [3, 4]], [[4, 5], [5, 6], [6, 7]]];

        

        return (
            <div>
                <Individual id="2" Characters={chars[0]}/>
                <button onClick={this.drawImages}>click</button>
            </div>
        );
    }
});

module.exports = Generation;
