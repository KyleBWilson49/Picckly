/*global google*/
var React = require('react');
var EmotionsStore = require('../stores/emotions_store.js');



var LineGraph = React.createClass({
  getInitialState: function(){
    return {emotion: 'happiness'};
  },

  componentDidMount: function(){
    this.emotionListener = EmotionsStore.addListener(this._emotionsChanged);
    this.gatherInfo();
  },

  componentWillUnmout: function(){
    this.emotionListener.remove();
  },

  gatherInfo: function(){
    this.dataPoints = [['date', this.state.emotion]];


    EmotionsStore.allEmotions().forEach(function(emotionSet){
      // var timeCreated = new Date(emotionSet['created_at']);
      // var timeNow = new Date();
      // var timeDiff = (timeNow.getTime() - timeCreated.getTime()) / 360000;
      // debugger;
      this.dataPoints.push(['', emotionSet[this.state.emotion]]);
    }.bind(this));
    google.charts.setOnLoadCallback(this.drawChart);
  },

  _emotionsChanged: function(){
    this.gatherInfo();
  },

  drawChart: function() {
    if (this.dataPoints.length == 0) {
      return;
    }
    var data = google.visualization.arrayToDataTable(this.dataPoints);


    var chart = new google.visualization.LineChart(document.getElementById('line_graph'));

    chart.draw(data);
  },

  changeEmotion: function(e){
    e.preventDefault();
    this.setState({emotion: e.target.value}, this.gatherInfo);
    // this.gatherInfo();
  },

  render: function(){
    return (
      <div>
        <div id='line_graph'>
        </div>
        <select onChange={this.changeEmotion}>
          <option value='anger'>Anger</option>
          <option value='contempt'>Contempt</option>
          <option value='disgust'>Disgust</option>
          <option value='fear'>Fear</option>
          <option value='happiness'>Happiness</option>
          <option value='neutral'>Neutral</option>
          <option value='sadness'>Sadness</option>
          <option value='surprise'>Surprise</option>
        </select>
      </div>
    );
  }
});

module.exports = LineGraph;
