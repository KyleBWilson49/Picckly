/*global google*/
var React = require('react');
var EmotionsStore = require('../stores/emotions_store');
var ApiUtil = require('../util/api_util');
var PieChart = require('./pie_chart');
var LineGraph = require('./line_graph');


var Graphs = React.createClass({

  componentDidMount: function(){
    google.charts.load('current', {'packages':['corechart']});
    ApiUtil.fetchEmotions();
  },

  render: function(){
    return (
      <div>
        <PieChart />
        <LineGraph />
      </div>
    );
  }
});

module.exports = Graphs;
