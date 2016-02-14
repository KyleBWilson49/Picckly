var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var FrontPage = require('./components/front_page.jsx');
var Graphs = require('./components/graphs.jsx');
var Message = require('./components/message.jsx');
<<<<<<< HEAD
=======
var TextMood = require('./components/textmood.jsx');
>>>>>>> 9d5b15626af69affbf57af2fe9a8d13e9ce02f53
var MoodRing;
var TwitterMood;
var MoodRing = require('./components/mood_ring.jsx');

<<<<<<< HEAD
=======

>>>>>>> 9d5b15626af69affbf57af2fe9a8d13e9ce02f53
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
<<<<<<< HEAD
    <Route path="/graphs" component={Graphs}/>
    <Route path="/message" component={Message}/>
=======
    <IndexRoute component={FrontPage}/>
    <Route path="/moodring" component={MoodRing}/>
    <Route path="/graphs" component={Graphs}/>
    <Route path="/message" component={Message}/>
    <Route path="/moodring" component={MoodRing}/>
>>>>>>> 9d5b15626af69affbf57af2fe9a8d13e9ce02f53
    <Route path="/graphs" component={Graphs}/>
    <Route path="/textmood" component={TextMood}/>
    <Route path="/twittermood" component={TwitterMood}/>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Router>{routes}</Router>, document.getElementById("content"));
});
