/*global google*/
var React = require('react');
var EmotionsStore = require('../stores/emotions_store');

var BarGraph = React.createClass({
  getInitialState: function(){
    return {emotionSet: EmotionsStore.mostRecent()};
  },

  componentDidMount: function(){
    this.emotionsListener = EmotionsStore.addListener(this._emotionsChanged);
    google.charts.setOnLoadCallback(this.drawChart);
  },

  componentWillUnmout: function(){
    this.emotionsListener.remove();
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
        title: "Smile you're on candid camera",
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
      };
      var chart = new google.visualization.ColumnChart(document.getElementById("bar_graph"));
      chart.draw(view, options);
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
