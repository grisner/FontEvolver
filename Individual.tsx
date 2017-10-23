"use strict";

var React = require('react');
var frontend = require('./frontend.js');

var Character = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
        image: React.PropTypes.array,
        element: React.PropTypes.object,
        drawThis: React.PropTypes.func,
        key: React.PropTypes.string
    },

    getInitialState() {
        //console.log('initializing Character ' + this.props.id);
        //this.props.image = this.createRandomData(100, 100);
        //this.props.element = <p>{this.props.id}</p>;
        this.props.element = <canvas id={"Canv." + this.props.id} key={"Canv." + this.props.id} height="100" width="100"></canvas>;
        
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
        Characters: React.PropTypes.array,
        key: React.PropTypes.string
    },

    render: function () {
        var chars;
        for(let i=0; i < this.props.Characters.length; i++) {
            chars += <td>this.props.Characters[i]</td>;
        }

        return (
            <div>{this.props.Characters}<td><input type="checkbox" id={"box." + this.props.id} key={"box." + this.props.id}></input></td></div>
        );
    }
});

module.exports = Individual;


var Generation = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
        Individuals: React.PropTypes.array,
        popSize: React.PropTypes.number,
        charSize: React.PropTypes.number
    },

    getInitialState() {
        var popAmount = this.props.popSize;
        var ppl = new Array(popAmount);
        let row: any;

        for(let i=0; i < popAmount; i++) {
            var chars = new Array(this.props.charSize);

            for(let c=0; c < this.props.charSize; c++) {
                var char = <Character key={"Char."+ i.toString() + "." + c.toString()} id={"Char."+ i.toString() + "." + c.toString()} />;
                chars[c] = char;
            }
            
            // placing individuals two in a row, to save some space
            let gal = <Individual id={i.toString()} key={i.toString()} Characters={chars} />;
            if(i%2 != 0) {
                row = <tr>{row}{gal}</tr>;
                ppl[i] = row;
            }
            else {
                row = gal;
            }

            
        }

        this.props.Individuals = ppl;
        
        return null;
    },

    render: function () {
        // <script>window.onload({frontend.drawImages}())</script>
        return (
            <div>
                <table>
                    <tr>
                        <td key="clickcell">
                            <button onClick={frontend.redraw}>redraw</button>
                        </td>
                    
                        <td key="startcell">
                            <button onClick={frontend.start}>start</button>
                        </td>
                    
                        <td key="stopcell">
                            <button onClick={frontend.stop}>stop</button>
                        </td>
                        <td key="tick">
                            <button onClick={frontend.tick}>tick</button>
                        </td>
                    </tr>
                    {this.props.Individuals}
                </table>
            </div>
        );
    }
});

module.exports = Generation;




