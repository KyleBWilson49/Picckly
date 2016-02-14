var React = require('react');
var History = require('react-router').History;
var ApiUtil = require('../util/api_util');


var Navbar = React.createClass({
  mixins: [History],

  getInitialState: function(){
    return {current_tab: this.props.active};
  },

  moodringTab: function(e){
    e.preventDefault();
    this.history.pushState('', '/');
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

  logoutTab: function (e) {

    e.preventDefault();
    ApiUtil.logOut();
    this.history.pushState(null, '/');
    console.log('hello');
  },

  render: function(){
    var curr = this.state.current_tab;
    var moodring = curr === "moodring" ?
                          <span className="moodring active icon-bar navbar-tab"
                                onClick={this.moodringTab}>Mood Ring</span> :
                          <span className="moodring icon-bar navbar-tab"
                                onClick={this.moodringTab}>Mood Ring</span>;
    var graphs = curr === "graphs" ?
                          <span className="graphs active icon-bar navbar-tab"
                                onClick={this.graphsTab}>Graphs</span> :
                          <span className="graphs icon-bar navbar-tab"
                                onClick={this.graphsTab}>Graphs</span>;
    var text = curr === "text" ?
                          <span className="text active icon-bar navbar-tab"
                                onClick={this.textTab}>Text Mood</span> :
                          <span className="text icon-bar navbar-tab"
                                onClick={this.textTab}>Text Mood</span>;
    var twitter = curr === "twitter" ?
                          <span className="twitter active icon-bar navbar-tab"
                                onClick={this.twitterTab}>Twitter</span> :
                          <span className="twitter icon-bar navbar-tab"
                                onClick={this.twitterTab}>Twitter</span>;
    var logout = curr === "logout" ?
                          <span className="logout active icon-bar navbar-tab last"
                                onClick={this.logoutTab}>Log Out</span> :
                          <span className="logout icon-bar navbar-tab last"
                                onClick={this.logoutTab}>Log Out</span>;

    return(
      <navbar className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid container navbar-container">
          <div className="navbar-header">
            {moodring}
            {graphs}
            {text}
            {twitter}
            {logout}
          </div>
        </div>
      </navbar>
    );
  }
});

module.exports = Navbar;
