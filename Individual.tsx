"use strict";

let React = require('react');
let frontend = require('./frontend.js');

let Character = React.createClass({
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


let Individual = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
        Characters: React.PropTypes.array,
        key: React.PropTypes.string
    },

    setPrio: function(event) {
        console.log('calling setPrio on ' + event.target.id.substring(5,event.target.id.length));
        frontend.setPrio(event.target.id.substring(5,event.target.id.length), event.target.value);
    },

    render: function () {
        let chars;
        for(let i=0; i < this.props.Characters.length; i++) {
            chars += <td>this.props.Characters[i]</td>;
        }

        let id = "rank." + this.props.id;

        return (
            <div>{this.props.Characters}<td><input type="number" id={id} key={id} onChange={this.setPrio}></input></td></div>
        );
    }
});

module.exports = Individual;


let Generation = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
        Individuals: React.PropTypes.array,
        popSize: React.PropTypes.number,
        charSize: React.PropTypes.number
    },

    getInitialState() {
        let popAmount = this.props.popSize;

        // If to many viewed, the system collapses
        if(this.props.popSize > 10) {
            popAmount = 10;
        }
        
        let ppl = new Array(popAmount);
        let row: any;

        for(let i=0; i < popAmount; i++) {
            let chars = new Array(this.props.charSize);
            

            for(let c=0; c < this.props.charSize; c++) {
                let id = "Char."+ i.toString() + "." + c.toString();
                let char = <Character key={id} id={id} />;
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
        
        return (
            <div>
                <script>window.onload({frontend.redraw}())</script>
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




