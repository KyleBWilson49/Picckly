var React = require('react');
// var EmotionsStore = require('../stores/emotions_store');
var ApiUtil = require('../util/api_util');
var ApiActions = require('../actions/api_actions')
var TweetStore = require('../stores/tweets_store')
var ScoresStore = require('../stores/scores_store')

// var PieChart = require('./pie_chart');
// var LineGraph = require('./line_graph');
// var BarGraph = require('./bar_graph');


var TwitterMood = React.createClass({
  getInitialState: function() {
    return { tweets: [], inputVal: "", scores: []};
  },
  _onTweetChange: function() {
    var that = this;
    this.setState({tweets: TweetStore.all()}, function(){
      that.populateScores();
    })

  },
  scoresChange: function() {
    this.setState({scores: ScoresStore.all()})
    // console.log(this.state.scores)
  },

  handleChange: function(e) {
    // if (e.target.value[e.target.value.length-1] === " ") {
    //   this.apiCall(e.target.value);
    // }
    this.setState({ inputVal: e.target.value })
  },
  populateScores: function() {
    var map = [];
    var that = this;
    if (typeof this.state.tweets !== 'undefined') {
      map = this.state.tweets.forEach(function(tweet){
        if (typeof tweet !== 'undefined') {
          that.apiCall(tweet.text);
          // console.log('tweet');
        }
      }.bind(this));

    }
    // debugger;
    // this.setState({scores: ScoresStore.all()})

  },


  componentDidMount: function(){
    this.tweetListener = TweetStore.addListener(this._onTweetChange);
    this.scoreListener = ScoresStore.addListener(this.scoresChange);
  },
  tweetMap: function() {
    var map = [];
    var that = this;
    if (typeof this.state.tweets !== 'undefined') {
      map = this.state.tweets.map(function(tweet){
        if (typeof tweet !== 'undefined') {
          that.apiCall(tweet.text);
          // console.log('tweet');
          return <div>{tweet.text}</div>
        }
      }.bind(this));

    }
    this.scoresChange();

    // map = map.map(function(text){
    //   text = "hi"
    // }.bind(this));

    return map;

  },
  scoreMap: function() {
    var map = [];
    var that = this;
    if (typeof this.state.scores !== 'undefined') {
      map = this.state.scores.map(function(score){
        if (typeof score !== 'undefined') {

          // console.log(score)
          return <div>{score}</div>
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
    console.log('apiCall');
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
      ApiActions.receiveScores(data);
    })
    .fail(function() {
      alert("error");
    });
  },

  render: function(){
    // console.log(this.state.scores)
    return (
      <div className="outer-twitter-div">
        <input type="text"
            onChange={this.handleChange}
            value={this.state.inputVal}/>
        <div onClick={this.getTweets}>Go</div>

        <div>{this.scoreMap()}</div>
      </div>
    );
  }
});

module.exports = TwitterMood;
