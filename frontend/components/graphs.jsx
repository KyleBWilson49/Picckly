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
    ApiUtil.fetchEmotions();
  },

  render: function(){
    return (
      <div className="graphs">
        <div className="top-graphs">
          <PieChart/>
          <BarGraph/>
        </div>
        <div className="bottom-graph">
          <LineGraph/>
        </div>
      </div>
    );
  }
});

module.exports = Graphs;
