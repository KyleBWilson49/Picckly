/*global google*/
var React = require('react');
var ScoresStore = require('../stores/scores_store.js');



var TwitterGraph = React.createClass({

  componentDidMount: function(){

    this.gatherInfo();
  },

  componentWillReceiveProps: function(){
    this.gatherInfo();
  },

  gatherInfo: function(){
    // console.log(this.props.tweets)
    this.dataPoints = [];
    // debugger;
    if (this.props.tweets[0] && this.props.tweets[0].score) {

      this.props.tweets.forEach(function(tweet){
        // debugger;
        this.dataPoints.push([tweet.created_at.slice(4,10), tweet.score]);
      }.bind(this));
      // console.log(this.dataPoints)
      // EmotionsStore.allEmotions().forEach(function(emotionSet){
      //   // var timeCreated = new Date(emotionSet['created_at']);
      //   // var timeNow = new Date();
      //   // var timeDiff = (timeNow.getTime() - timeCreated.getTime()) / 360000;
      //   // debugger;
      //   this.dataPoints.push(['', emotionSet[this.state.emotion]]);
      // }.bind(this));
      this.dataPoints.push(['date', 'Positivity']);
      this.dataPoints = this.dataPoints.reverse();
      google.charts.setOnLoadCallback(this.drawChart);

    }
  },



  drawChart: function() {
    if (this.dataPoints.length !== 21 ) {
      return;
    }
    var data = google.visualization.arrayToDataTable(this.dataPoints);

    window.twitterChart = new google.visualization.LineChart(document.getElementById('twitter_graph'));
    // if (!this.props.fetching) {
    window.twitterChart.draw(data);
    // }
  },

  tweetsMap: function() {
    var map = [];

    if (this.props.tweets[0] && this.props.tweets[0].score) {
      map = this.props.tweets.map(function(tweet){
        if (typeof tweet !== 'undefined') {
          return <div style={{background:"rgba(" + Math.floor(250*(1-tweet.score)) + "," + Math.floor(250*tweet.score) + ",0,0.8)"}} className="tweets">{tweet.text}</div>;
        }
      }.bind(this));
    }


    return map;
  },



  render: function(){
    return (
      <div>
        <div id='twitter_graph'>
        </div>
        <div>{this.tweetsMap()}</div>
      </div>
    );
  }
});

module.exports = TwitterGraph;
