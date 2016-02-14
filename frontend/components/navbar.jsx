var React = require('react');
var History = require('react-router').History;


var Navbar = React.createClass({
  mixins: [History],

  getInitialState: function(){
    return {current_tab: this.props.active};
  },

  moodringTab: function(e){
    e.preventDefault();
    this.history.pushState('', '/moodring');
  },

  graphsTab: function(e){
    e.preventDefault();
    this.history.pushState('', '/graphs');
  },

  textTab: function(e){
    e.preventDefault();
    this.history.pushState('', '/textmood');
  },

  twitterTab: function(e){
    e.preventDefault();
    this.history.pushState('', '/twitter');
  },

  render: function(){
    var curr = this.state.current_tab;
    var moodring = curr === "moodring" ?
                          <span className="navbar-tab moodring active"
                                onClick={this.moodringTab}>Mood Ring</span> :
                          <span className="navbar-tab moodring"
                                onClick={this.moodringTab}>Mood Ring</span>;
    var graphs = curr === "graphs" ?
                          <span className="navbar-tab graphs active"
                                onClick={this.graphsTab}>Graphs</span> :
                          <span className="navbar-tab graphs"
                                onClick={this.graphsTab}>Graphs</span>;
    var text = curr === "message" ?
                          <span className="navbar-tab message active"
                                onClick={this.textTab}>Text Mood</span> :
                          <span className="navbar-tab message"
                                onClick={this.textTab}>Text Mood</span>;
    var twitter = curr === "twitter" ?
                          <span className="navbar-tab twitter active"
                                onClick={this.twitterTab}>Twitter</span> :
                          <span className="navbar-tab twitter"
                                onClick={this.twitterTab}>Twitter</span>;

    return(
      <navbar className="navbar">
        <div className="navbar-container">
          {moodring}
          {graphs}
          {text}
          {twitter}
        </div>
      </navbar>
    );
  }
});

module.exports = Navbar;
