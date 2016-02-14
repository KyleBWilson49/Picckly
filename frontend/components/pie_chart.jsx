/* globals google */

var React = require('react');
var EmotionsStore = require('../stores/emotions_store');
var ApiUtil = require('../util/api_util');

var PieChart = React.createClass({

  getInitialState: function(){
    this.emotionsHash = {};
    this.emotionsHash["Anger"] = 0;
    this.emotionsHash["Contempt"] = 0;
    this.emotionsHash["Disgust"] = 0;
    this.emotionsHash["Fear"] = 0;
    this.emotionsHash["Happiness"] = 0;
    this.emotionsHash["Neutral"] = 0;
    this.emotionsHash["Sadness"] = 0;
    this.emotionsHash["Surprise"] = 0;
    return {emotions: EmotionsStore.allEmotions()};
  },

  _emotionsChanged: function(){
    this.setState({emotions: EmotionsStore.allEmotions()});
    this.gatherInfo();
  },

  componentWillUnmount: function(){
    this.emotionListener.remove();
    this.chart.clearChart();
  },

  componentWillMount: function(){
    this.emotionListener = EmotionsStore.addListener(this._emotionsChanged);
  },

  componentDidMount: function(){
    this.gatherInfo();
  },

  gatherInfo: function(){
    this.state.emotions.forEach(function(emotionSet){
      this.emotionsHash["Anger"] += emotionSet["anger"];
      this.emotionsHash["Contempt"] += emotionSet["contempt"];
      this.emotionsHash["Disgust"] += emotionSet["disgust"];
      this.emotionsHash["Fear"] += emotionSet["fear"];
      this.emotionsHash["Happiness"] += emotionSet["happiness"];
      this.emotionsHash["Neutral"] += emotionSet["neutral"];
      this.emotionsHash["Sadness"] += emotionSet["sadness"];
      this.emotionsHash["Surprise"] += emotionSet["surprise"];
    }.bind(this));
    google.charts.setOnLoadCallback(this.drawChart);
  },

  drawChart: function() {
    var emotionsArray = [["Emotion", "Level"]];

    Object.keys(this.emotionsHash).forEach(function(key){
      emotionsArray.push([key, this.emotionsHash[key]]);
    }.bind(this));

    var data = google.visualization.arrayToDataTable(emotionsArray);

    var options = {
      title: 'Emotion Totals',
      chartArea: {height: '80%', width: '90%'},
      legend: { position: 'none' },
      background: {color: 'transparent'}
    };

    this.chart = new google.visualization.PieChart(document.getElementById('pie_chart'));

    this.chart.draw(data, options);
  },

  render: function(){
    return (
      <div id="pie_chart"></div>
    );
  }
});

module.exports = PieChart;
