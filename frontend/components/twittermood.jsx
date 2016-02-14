var React = require('react');
// var EmotionsStore = require('../stores/emotions_store');
var ApiUtil = require('../util/api_util');
var ApiActions = require('../actions/api_actions')
var TweetStore = require('../stores/tweets_store')
// var PieChart = require('./pie_chart');
// var LineGraph = require('./line_graph');
// var BarGraph = require('./bar_graph');


var TwitterMood = React.createClass({
  getInitialState: function() {
    return { tweets: [], inputVal: ""};
  },
  _onChange: function() {
    this.setState({tweets: TweetStore.all()})
  },

  handleChange: function(e) {
    if (e.target.value[e.target.value.length-1] === " ") {
      this.apiCall(e.target.value);
    }
    this.setState({ inputVal: e.target.value })
  },


  componentDidMount: function(){
    this.tweetListener = TweetStore.addListener(this._onChange);
  },
  tweetMap: function() {
    var map = [];
    var that = this;
    if (typeof this.state.tweets !== 'undefined') {
      map = this.state.tweets.map(function(tweet){
        if (typeof tweet !== 'undefined') {
          that.apiCall(tweet.text);
          console.log(tweet)
          return <div>{tweet.text}</div>
        }
      }.bind(this));
    }

    // map = map.map(function(text){
    //   text = "hi"
    // }.bind(this));

    return map;

  },
  getTweets: function() {
    ApiUtil.fetchTwitter(this.state.inputVal)
  },
  apiCall: function(messageText) {
    var that = this;
    var acctkey = window.btoa("AccountKey:eATIdDoYXwTq/ig6ZMB/sAz0lmiP9oL7DzDS6PExI4A");
    $.ajax({
      url: "https://api.datamarket.azure.com/data.ashx/amla/text-analytics/v1/GetSentiment?",
      beforeSend: function(xhrObj){
          xhrObj.setRequestHeader("Accept","application/json");
          xhrObj.setRequestHeader("Authorization","Basic " + acctkey);
      },
      type: "GET",
      data: {
        Text:messageText
      }
    })
    .done(function(data) {

    })
    .fail(function() {
      alert("error");
    });
  },

  render: function(){
    return (
      <div className="outer-twitter-div">
        <input type="text"
            onChange={this.handleChange}
            value={this.state.inputVal}/>

          <div onClick={this.getTweets}>Go</div>
        <div>{this.tweetMap()}</div>
      </div>
    );
  }
});

module.exports = TwitterMood;
