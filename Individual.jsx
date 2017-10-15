var React = require('react');
var frontend = require('./frontend.js');

var Character = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
        image: React.PropTypes.array,
        element: React.PropTypes.object,
        drawThis: React.PropTypes.func
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
        this.props.image = this.createRandomData(100, 100);
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
        id: React.PropTypes.string,
        genNum: React.PropTypes.string,
        Individuals: React.PropTypes.array,
        runEvolution: React.PropTypes.func,
        stopEvolution: React.PropTypes.func
    },

    getInitialState() {
        var popAmount = 2;
        var ppl = new Array(popAmount);

        this.props.runEvolution = this.runEvolution();
        this.props.stopEvolution = this.stopEvolution();

        for(i=0; i < popAmount; i++) {
            
            var images = [
                [i+1,i+2,i+3,1,2,3,1,2,3,1,2,3,1,2,3,i+1,i+2,i+3,1,2,3,1,2,3,1,2,3,1,2,3],
                [i+2,i+3, i+4,1,2,3,1,2,3,1,2,3,1,2,3],
                [i+2,i+3, i+4]];

            //var ACanvas = <canvas id={"Canv." + i +".A"} height="100" width="100"></canvas>;
            var A = <Character id={"Char."+ i + ".0"} />;
            //var A = <Character id={"Char."+ i + ".0"} />;

            //var BCanvas = <canvas id={"Canv." + i +".B"} height="100" width="100"></canvas>;
            var B = <Character id={"Char."+ i + ".1"} />;

            //var CCanvas = <canvas id={"Canv." + i +".C"} height="100" width="100"></canvas>;
            var C = <Character id={"Char."+ i + ".2"} />;

            var gal = <Individual id={i} Characters={[A,B,C]} />

            ppl[i] = gal;
        }

        this.props.Individuals = ppl;
        
        return null;
    },

    runEvolution: function() {
        console.log('generation runEvolution')
    },

    stopEvolution: function() {
        console.log('generation stopEvolution')
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




