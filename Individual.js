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
    getInitialState: function () {
        //console.log('initializing Character ' + this.props.id);
        //this.props.image = this.createRandomData(100, 100);
        //this.props.element = <p>{this.props.id}</p>;
        this.props.element = React.createElement("canvas", { id: "Canv." + this.props.id, key: "Canv." + this.props.id, height: "100", width: "100" });
        return null;
    },
    render: function () {
        return (React.createElement("td", null, this.props.element));
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
        for (var i = 0; i < this.props.Characters.length; i++) {
            chars += React.createElement("td", null, "this.props.Characters[i]");
        }
        return (React.createElement("div", null,
            this.props.Characters,
            React.createElement("td", null,
                React.createElement("input", { type: "checkbox", id: "box." + this.props.id, key: "box." + this.props.id }))));
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
    getInitialState: function () {
        var popAmount = this.props.popSize;
        var ppl = new Array(popAmount);
        var row;
        for (var i = 0; i < popAmount; i++) {
            var chars = new Array(this.props.charSize);
            for (var c = 0; c < this.props.charSize; c++) {
                var char = React.createElement(Character, { key: "Char." + i.toString() + "." + c.toString(), id: "Char." + i.toString() + "." + c.toString() });
                chars[c] = char;
            }
            // placing individuals two in a row, to save some space
            var gal = React.createElement(Individual, { id: i.toString(), key: i.toString(), Characters: chars });
            if (i % 2 != 0) {
                row = React.createElement("tr", null,
                    row,
                    gal);
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
        return (React.createElement("div", null,
            React.createElement("table", null,
                React.createElement("tr", null,
                    React.createElement("td", { key: "clickcell" },
                        React.createElement("button", { onClick: frontend.redraw }, "redraw")),
                    React.createElement("td", { key: "startcell" },
                        React.createElement("button", { onClick: frontend.start }, "start")),
                    React.createElement("td", { key: "stopcell" },
                        React.createElement("button", { onClick: frontend.stop }, "stop")),
                    React.createElement("td", { key: "tick" },
                        React.createElement("button", { onClick: frontend.tick }, "tick"))),
                this.props.Individuals)));
    }
});
module.exports = Generation;
//# sourceMappingURL=Individual.js.map