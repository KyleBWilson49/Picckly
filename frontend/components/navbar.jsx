var React = require('react');

var Navbar = React.createClass({
  render: function(){
    return(
      <navbar>
        <span>Mood Ring</span>
        <span>Graphs</span>
        <span>Text Mood</span>
        <span>Twitter</span>
      </navbar>
    );
  }
});

module.exports = Navbar;
