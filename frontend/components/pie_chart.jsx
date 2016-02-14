/* globals google */

var React = require('react');
var EmotionsStore = require('../stores/emotions_store');
var ApiUtil = require('../util/api_util');

var PieChart = React.createClass({

  getInitialState: function(){
    this.emotionsHash = {};
    return {emotions: EmotionsStore.allEmotions()};
  },

  _emotionsChanged: function(){
    debugger;
    this.setState({emotions: EmotionsStore.allEmotions()});
  },

  componentWillMount: function(){
    this.emotionListener = EmotionsStore.addListener(this._emotionsChanged);
  },

  componentDidMount: function(){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(this.drawChart);
    ApiUtil.fetchEmotions();
  },

  gatherInfo: function(){
    this.state.emotions.forEach(function(emotionSet){
      this.emotionsHash["anger"] = emotionSet["anger"];
    });

  },

  drawChart: function() {
    var data = google.visualization.arrayToDataTable([
      // []

      // ['Task', 'Hours per Day'],
      // ['Work',     11],
      // ['Eat',      2],
      // ['Commute',  2],
      // ['Watch TV', 2],
      // ['Sleep',    7]
    ]);

    var options = {
      title: 'My Daily Activities'
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
  },

  render: function(){
    debugger;
    return (
      <div id="piechart"></div>
    );
  }
});

module.exports = PieChart;
