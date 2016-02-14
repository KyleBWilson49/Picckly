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
    this.dataPoints = [['date', 'Positivity']];
    // debugger;
    if (this.props.tweets[0] && this.props.tweets[0].score) {

      this.props.tweets.forEach(function(tweet){
        // debugger;
        this.dataPoints.push(['', tweet.score]);
      }.bind(this));
      // console.log(this.dataPoints)
      // EmotionsStore.allEmotions().forEach(function(emotionSet){
      //   // var timeCreated = new Date(emotionSet['created_at']);
      //   // var timeNow = new Date();
      //   // var timeDiff = (timeNow.getTime() - timeCreated.getTime()) / 360000;
      //   // debugger;
      //   this.dataPoints.push(['', emotionSet[this.state.emotion]]);
      // }.bind(this));
      google.charts.setOnLoadCallback(this.drawChart);

    }
  },



  drawChart: function() {
    if (this.dataPoints.length !== 21 ) {
      return;
    }
    var data = google.visualization.arrayToDataTable(this.dataPoints);

    var chart = new google.visualization.LineChart(document.getElementById('twitter_graph'));

    chart.draw(data);
    // var data = google.visualization.arrayToDataTable([
    //   ['Year', 'Sales', 'Expenses'],
    //   ['2004',  1000,      400],
    //   ['2005',  1170,      460],
    //   ['2006',  660,       1120],
    //   ['2007',  1030,      540]
    // ]);
    //
    // var options = {
    //   title: 'Company Performance',
    //   curveType: 'function',
    //   legend: { position: 'bottom' }
    // };
    //
    // var chart = new google.visualization.LineChart(document.getElementById('twitter_graph'));
    //
    // chart.draw(data, options);
  },
  tweetsMap: function() {
    var map = [];

    if (this.props.tweets[0] && this.props.tweets[0].score) {
      map = this.props.tweets.map(function(tweet){
        if (typeof tweet !== 'undefined') {
          return <div className="tweets">{tweet.text}</div>
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
