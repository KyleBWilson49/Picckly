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

  componentWillUnmount: function(){
    this.emotionListener.remove();
    this.chart.clearChart();
  },

  gatherInfo: function(){
    this.dataPoints = [['date', this.state.emotion]];


    EmotionsStore.allEmotions().forEach(function(emotionSet){
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

    this.chart = new google.visualization.LineChart(document.getElementById('line_graph'));

    var options = {
      legend: { position: 'none' },
      chartArea: {width: '90%', height: '80%'},
      vAxis: {minValue: '0', maxValue: '1'},
      // title: 'Mood Over Time'

    };

    this.chart.draw(data, options);
  },

  changeEmotion: function(e){
    e.preventDefault();
    var emotion = e.target.getAttribute("value");
    this.setState({emotion: emotion}, this.gatherInfo);
  },

  render: function(){
    var anger = this.state.emotion === 'anger' ?
                <li className="active"
                    onMouseEnter={this.changeEmotion}
                    value='anger'>Anger</li> :
                <li onMouseEnter={this.changeEmotion}
                    value='anger'>Anger</li>;
    var contempt = this.state.emotion === 'contempt' ?
                <li className="active"
                    onMouseEnter={this.changeEmotion}
                    value='contempt'>Contempt</li> :
                <li onMouseEnter={this.changeEmotion}
                    value='contempt'>Contempt</li>;
    var disgust = this.state.emotion === 'disgust' ?
                <li className="active"
                    onMouseEnter={this.changeEmotion}
                    value='disgust'>Disgust</li> :
                <li onMouseEnter={this.changeEmotion}
                    value='disgust'>Disgust</li>;
    var fear = this.state.emotion === 'fear' ?
                <li className="active"
                    onMouseEnter={this.changeEmotion}
                    value='fear'>Fear</li> :
                <li onMouseEnter={this.changeEmotion}
                    value='fear'>Fear</li>;
    var happiness = this.state.emotion === 'happiness' ?
                <li className="active"
                    onMouseEnter={this.changeEmotion}
                    value='happiness'>Happiness</li> :
                <li onMouseEnter={this.changeEmotion}
                    value='happiness'>Happiness</li>;
    var neutral = this.state.emotion === 'neutral' ?
                <li className="active"
                    onMouseEnter={this.changeEmotion}
                    value='neutral'>Neutral</li> :
                <li onMouseEnter={this.changeEmotion}
                    value='neutral'>Neutral</li>;
    var sadness = this.state.emotion === 'sadness' ?
                <li className="active"
                    onMouseEnter={this.changeEmotion}
                    value='sadness'>Sadness</li> :
                <li onMouseEnter={this.changeEmotion}
                    value='sadness'>Sadness</li>;
    var surprise = this.state.emotion === 'surprise' ?
                <li className="active last"
                    onMouseEnter={this.changeEmotion}
                    value='surprise'>Surprise</li> :
                <li className="last"
                    onMouseEnter={this.changeEmotion}
                    value='surprise'>Surprise</li>;
    return (
      <div>
        <div id='line_graph'></div>
        <ul id="emotion-list">
          {anger}
          {contempt}
          {disgust}
          {fear}
          {happiness}
          {neutral}
          {sadness}
          {surprise}
        </ul>
      </div>
    );
  }
});

// <select onChange={this.changeEmotion}>
//   <option value='anger'>Anger</option>
//   <option value='contempt'>Contempt</option>
//   <option value='disgust'>Disgust</option>
//   <option value='fear'>Fear</option>
//   <option value='happiness'>Happiness</option>
//   <option value='neutral'>Neutral</option>
//   <option value='sadness'>Sadness</option>
//   <option value='surprise'>Surprise</option>
// </select>
module.exports = LineGraph;
