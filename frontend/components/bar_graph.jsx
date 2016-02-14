/*global google*/
var React = require('react');
var EmotionsStore = require('../stores/emotions_store');

var BarGraph = React.createClass({
  getInitialState: function(){
    return {emotionSet: EmotionsStore.mostRecent()};
  },

  componentDidMount: function(){
    this.gatherInfo();
  },

  componentWillMount: function(){
    this.emotionsListener = EmotionsStore.addListener(this._emotionsChanged);
  },

  componentWillUnmount: function(){
    this.emotionsListener.remove();
    this.chart.clearChart();
  },

  _emotionsChanged: function(){
    this.setState({emotionSet: EmotionsStore.mostRecent()});
    this.gatherInfo();
  },

  gatherInfo: function(){
    this.dataPoints = [['Emotion', 'Level', {role: 'style'}]];
    this.dataPoints.push(['Anger', this.state.emotionSet['anger'], 'red']);
    this.dataPoints.push(['Contempt', this.state.emotionSet['contempt'], 'orange']);
    this.dataPoints.push(['Disgust', this.state.emotionSet['disgust'], 'pink']);
    this.dataPoints.push(['Fear', this.state.emotionSet['fear'], 'green']);
    this.dataPoints.push(['Happiness', this.state.emotionSet['happiness'], 'yellow']);
    this.dataPoints.push(['Neutral', this.state.emotionSet['neutral'], 'purple']);
    this.dataPoints.push(['Sadness', this.state.emotionSet['sadness'], 'blue']);
    this.dataPoints.push(['Surprise', this.state.emotionSet['surprise'], 'black']);
    google.charts.setOnLoadCallback(this.drawChart);
  },

  drawChart: function(){
    var data = google.visualization.arrayToDataTable(this.dataPoints);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" }, 2]);

      var options = {
        title: "Current Mood",
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
        chartArea: {height: '80%', width: '90%'},
        animation: {duration: 3500, easing: 'inAndOut', startup: true},
        annotations: {textStyle: {opacity: 0}, stem: {length: 0}},
        vAxis: {minValue: '0', maxValue: '1'}
      };
      this.chart = new google.visualization.ColumnChart(document.getElementById("bar_graph"));
      this.chart.draw(view, options);
  },


  render: function(){
    return (
      <div>
        <div id="bar_graph"></div>
      </div>
    );
  }
});

module.exports = BarGraph;
