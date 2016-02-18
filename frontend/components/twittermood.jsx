var React = require('react');
// var EmotionsStore = require('../stores/emotions_store');
var ApiUtil = require('../util/api_util');
var ApiActions = require('../actions/api_actions');
var TweetStore = require('../stores/tweets_store');
var ScoresStore = require('../stores/scores_store');
var TwitterGraph = require('./twitter_graph');

// var PieChart = require('./pie_chart');
// var LineGraph = require('./line_graph');
// var BarGraph = require('./bar_graph');


var TwitterMood = React.createClass({
  getInitialState: function() {
    return { tweets: [], inputVal: "", scores: [], fetching: false };
  },
  _onTweetChange: function() {
    var that = this;
    this.setState({tweets: TweetStore.all()}, function(){
      that.populateScores();
    });

  },
  scoresChange: function() {
    var that = this;
    this.setState({scores: ScoresStore.all()}, function(){
      that.forceUpdate();
    });

    // console.log(this.state.scores)
  },

  handleChange: function(e) {
    // if (e.target.value[e.target.value.length-1] === " ") {
    //   this.apiCall(e.target.value);
    // }
    this.setState({ inputVal: e.target.value });
  },
  populateScores: function() {
    var map = [];
    var that = this;
    var lastIdx;
    if (typeof this.state.tweets !== 'undefined') {
      map = this.state.tweets.forEach(function(tweet, idx, tweets){
        if (typeof tweet !== 'undefined') {
          that.apiCall(tweet, idx, tweets);
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
    this.counter = 0;
  },
  tweetMap: function() {
    var map = [];
    var that = this;
    if (typeof this.state.tweets !== 'undefined') {
      map = this.state.tweets.map(function(tweet){
        if (typeof tweet !== 'undefined') {
          that.apiCall(tweet.text);
          console.log(tweet.text);
          return <div>{tweet.text}</div>;
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
          return <div>{score}</div>;
        }
      }.bind(this));
    }

    // map = map.map(function(text){
    //   text = "hi"
    // }.bind(this));

    return map;

  },

  getTweets: function(e) {
    e.preventDefault();
    this.counter = 0;
    ApiUtil.fetchTwitter(this.state.inputVal);
    this.setState({ fetching: true });
  },
  apiCall: function(tweet, idx, tweets) {
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
        Text: tweet.text
      }
    })
    .done(function(data) {
      tweet.score = data.Score;
      that.counter += 1;
      if (that.counter === (tweets.length)) {
        that.setState({ fetching: false });
        that.forceUpdate();
      }
      // ApiActions.receiveScores(data);
    })
    .fail(function() {
      console.log("twitter api");
    });
  },

  finishFetch: function () {
    this.setState({ fetching: false });
  },

  render: function(){
    // console.log(this.state.scores)
    var graph = document.getElementById('twitter_graph');
    var fetchImg;
    if (this.state.fetching) {
      graph.style.visibility='hidden';
      fetchImg = <img style={{ margin: "auto", width: "100px", display: "block", position: "relative", top: "200px" }} src="assets/fetching.gif"/>;
    } else {
      if (graph){
        graph.style.visibility='visible';
      }
      fetchImg = "";
    }
    return (
      <div className="outer-twitter-div">
        <div className="outer-handle">
          <form onSubmit={this.getTweets}>
            <input type="text"
              className="twitter-handle"
              onChange={this.handleChange}
              value={this.state.inputVal}
              placeholder="Enter Twitter Handle"/>
            <input type="button" className="go-button" onClick={this.getTweets} value='Go'/>
          </form>
        </div>
        {fetchImg}
        <TwitterGraph tweets={this.state.tweets} fetching={this.state.fetching}/>
      </div>
    );
  }
});

module.exports = TwitterMood;
