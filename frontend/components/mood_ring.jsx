var React = require('react');
var Navbar = require('./navbar');

var MoodRing = React.createClass({
  render: function () {
    return (
      <div>
        <Navbar active="moodring"/>
      </div>
    );
  }
});

module.exports = MoodRing;
