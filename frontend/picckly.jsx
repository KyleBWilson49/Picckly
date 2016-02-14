var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var FrontPage = require('./components/front_page.jsx');
var Graphs = require('./components/graphs.jsx');
<<<<<<< HEAD
var Message = require('./components/message.jsx');
=======
var MoodRing;
var TextMood;
var TwitterMood;
>>>>>>> 31660a811f904de8698361219265db6e5303c757

var App = React.createClass({
  render: function () {
    return (
      <div>{this.props.children}</div>
    );
  },
});

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={FrontPage}/>
    <Route path="/graphs" component={Graphs}/>
<<<<<<< HEAD
    <Route path="/message" component={Message}/>
=======
    <Route path="/moodring" component={MoodRing}/>
    <Route path="/textmood" component={TextMood}/>
    <Route path="/twittermood" component={TwitterMood}/>
>>>>>>> 31660a811f904de8698361219265db6e5303c757
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Router>{routes}</Router>, document.getElementById("content"));
});
