var React = require('react');


var Character = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    image: React.PropTypes.array
  },

  render: function() {
    return (<p>{this.props.image}</p>);
  }
});

var Individual = React.createClass({
  propTypes: {
    Characters: React.PropTypes.array
  },

  render: function() {
    console.log("i Individual: " + this.props.Characters);
    return (
      <div>
        <Character image={this.props.Characters[0]}></Character>
      </div>
    );
  }

});

module.exports = Individual;