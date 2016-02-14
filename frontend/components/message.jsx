var React = require('react');
// var EmotionsStore = require('../stores/emotions_store');
// var ApiUtil = require('../util/api_util');
// var PieChart = require('./pie_chart');
// var LineGraph = require('./line_graph');
// var BarGraph = require('./bar_graph');


var Message = React.createClass({
  getInitialState: function() {
    return { inputVal: "", moodVal: 0.5 };
  },
  handleChange: function(e) {
    if (e.target.value[e.target.value.length-1] === " ") {
      
    }
    this.setState({ inputVal: e.target.value })
  },

  // componentDidMount: function(){
  //   google.charts.load('current', {'packages':['corechart']});
  //   ApiUtil.fetchEmotions();
  // },

  render: function(){
    return (
      <div>
        <textarea
           rows="4"
           cols="50"
           className="form-control"
           onChange={this.handleChange}
           value={this.state.inputVal}/>
         <div>{this.state.moodVal}</div>
      </div>
    );
  }
});

module.exports = Message;
