var React = require('react');
var frontend = require('./frontend.js');

var Character = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
        image: React.PropTypes.array,
        element: React.PropTypes.object
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
        //this.props.element = <p>{this.props.id}</p>;
        this.props.element = <canvas id={"Canv." + this.props.id} height="100" width="100"></canvas>;
        
        return null;
    },

    render: function () {
        return (
            <td>{this.props.element}</td>
        );
    }
});


var Individual = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
        Characters: React.PropTypes.array
    },

    render: function () {
        // console.log(this.props.Characters[0].props.image);

        var chars;
        for(i=0; i < this.props.Characters.length; i++) {
            chars += <td>this.props.Characters[i]</td>;
        }

        return (
            <tr>{this.props.Characters}</tr>
        );
    }
});

module.exports = Individual;


var Generation = React.createClass({
    propTypes: {
        genNum: React.PropTypes.string,
        Individuals: React.PropTypes.array
    },

    getInitialState() {
        var popAmount = 2;
        var ppl = new Array(popAmount);

        for(i=0; i < popAmount; i++) {
            var images = [[i+1,i+2,i+3],[i+2,i+3, i+4],[i+3,i+4,i+5]];

            //var ACanvas = <canvas id={"Canv." + i +".A"} height="100" width="100"></canvas>;
            var A = <Character id={"Char."+ i + ".A"} image={images[0]} />;

            //var BCanvas = <canvas id={"Canv." + i +".B"} height="100" width="100"></canvas>;
            var B = <Character id={"Char."+ i + ".B"} image={images[1]} />;

            //var CCanvas = <canvas id={"Canv." + i +".C"} height="100" width="100"></canvas>;
            var C = <Character id={"Char."+ i +".C"} image={images[2]} />;

            var gal = <Individual id={i} Characters={[A,B,C]} />

            ppl[i] = gal;
        }

        this.props.Individuals = ppl;
        
        return null;
    },

    setPixel: function(imageData, x, y, r, g, b, a) {
        index = (x + y * imageData.width) * 4;
        imageData.data[index + 0] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        imageData.data[index + 3] = a;
    },

    

    getCharacterImage: function(characterID) {
    // app.get('/getCharacterImage&:characterID', Generation.getCharacterImage);
    // http://127.0.0.1/getCharacterImage&Char.Canv.0.A

    var ID = characterID;
    console.log('getCharacterImage');
/*
    res.send({
        ActivePerson:req.params.Buyer, 
        Pass:req.params.Secret, 
        Symbol:req.params.Symbol, 
        Amount:req.params.Amount
    });*/
    },

    newGeneration: function() {
        console.log('new generation')
    },

    render: function () {
        
        return (
            <div>
                <table>{this.props.Individuals}</table>
                <button onClick={frontend.drawImages}>click</button>
            </div>
        );
    }
});

module.exports = Generation;







/*
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
*/
