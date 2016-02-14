var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var FrontPage = require('./components/front_page.jsx');
var Graphs = require('./components/graphs.jsx');
var Message = require('./components/message.jsx');
<<<<<<< HEAD
var MoodRing;
var TextMood;
var TwitterMood;
=======
var MoodRing = require('./components/mood_ring.jsx');

>>>>>>> 84f17f542e412611cb2cc667202aec0792950bb2

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
    <Route path="/message" component={Message}/>
    <Route path="/moodring" component={MoodRing}/>
<<<<<<< HEAD
    <Route path="/graphs" component={Graphs}/>
    <Route path="/textmood" component={TextMood}/>
    <Route path="/twittermood" component={TwitterMood}/>
=======
>>>>>>> 84f17f542e412611cb2cc667202aec0792950bb2
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Router>{routes}</Router>, document.getElementById("content"));
});
