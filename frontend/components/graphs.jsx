/*global google*/
var React = require('react');
var EmotionsStore = require('../stores/emotions_store');
var ApiUtil = require('../util/api_util');
var PieChart = require('./pie_chart');
var LineGraph = require('./line_graph');
var BarGraph = require('./bar_graph');
var Navbar = require('./navbar');



var Graphs = React.createClass({

  componentDidMount: function(){
    // google.charts.load('current', {'packages':['corechart']});
    ApiUtil.fetchEmotions();
  },

  componentWillUnmount: function(){
    // document.getElementById('pie_chart').remove();
    // document.getElementById('line_graph').remove();
    // document.getElementById('bar_graph').remove();
  },

  render: function(){
    return (
      <div>
        <Navbar active="graphs"/>
        <PieChart />
        <LineGraph />
        <BarGraph/>
      </div>
    );
  }
});

module.exports = Graphs;
