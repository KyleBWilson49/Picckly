var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var FrontPage = require('./components/front_page.jsx');
var Graphs = require('./components/graphs.jsx');
var Message = require('./components/message.jsx');
var TextMood = require('./components/textmood.jsx');
var MoodRing;
var TwitterMood = require('./components/twittermood.jsx');
var MoodRing = require('./components/mood_ring.jsx');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <FrontPage/>
        {this.props.children}
      </div>
    );
  },
});

var routes = (
  <Route path="/" component={App}>
    <Route path="/graphs" component={Graphs}/>
    <Route path="/textmood" component={TextMood}/>
    <Route path="/twittermood" component={TwitterMood}/>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Router>{routes}</Router>, document.getElementById("content"));
});
