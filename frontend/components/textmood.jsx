var React = require('react');
var Navbar = require('./navbar');
// var EmotionsStore = require('../stores/emotions_store');
// var ApiUtil = require('../util/api_util');
// var PieChart = require('./pie_chart');
// var LineGraph = require('./line_graph');
// var BarGraph = require('./bar_graph');


var TextMood = React.createClass({
  getInitialState: function() {
    return { inputVal: "", moodVal: 0.5 };
  },
  handleChange: function(e) {
    if (e.target.value[e.target.value.length-1] === " ") {
      this.apiCall(e.target.value);
    }
    this.setState({ inputVal: e.target.value });
    // this.moodValueToText();
  },
  apiCall: function(messageText) {
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
        Text:messageText
      }
    })
    .done(function(data) {
        that.setState({ moodVal: data.Score}, function(){
          this.moodValueToText();
        });
    })
    .error(function(request, status, error) {
      console.log(error + " " + status + ": no text in text box");
    });
  },

  // componentDidUpdate: function(){
  //   this.moodValueToText();
  // },
  moodValueToText: function(){
    if (this.state.moodVal > .80) {
      this.mood = "Very Positive";
    } else if (this.state.moodVal > .60){
      this.mood = "Positive";
    } else if (this.state.moodVal > .40) {
      this.mood = "Neutral";
    } else if (this.state.moodVal > .20) {
      this.mood = "Negative";
    } else {
      this.mood = "Very Negative";
    }
  },

  // componentDidMount: function(){
  //   google.charts.load('current', {'packages':['corechart']});
  //   ApiUtil.fetchEmotions();
  // },

  render: function(){
    var left = 780*this.state.moodVal + "px";
    var style = {transform:"translateX(" + left + ")"};
    return (
      <div className="outer-message-div">
        <Navbar active="text"/>
        <div className="form-and-slider">
          <textarea
             rows="20"
             cols="100"
             className="text-form"
             onChange={this.handleChange}
             value={this.state.inputVal}/>
           <div className="slider-box">
             <div className="slider-bar"></div>
             <div className="pointer" style={style}></div>
             <div className='mood-sentence'>Current message mood: {this.mood}</div>
           </div>
          </div>
      </div>
    );
  }
});

module.exports = TextMood;
