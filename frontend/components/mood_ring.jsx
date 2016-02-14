var React = require('react');
var EmotionsStore = require('../stores/emotions_store');
var Navbar = require('./navbar');

var MoodRing = React.createClass({
  getInitialState: function () {
    return {
      currentEmotion: EmotionsStore.mostRecent()
    };
  },

  componentDidMount: function () {
    this.EmotionsListener = EmotionsStore.addListener(this._onChange);
    var that = this;
    setInterval(function () {
      that.props.checkEmotion();
    }, 4000);
  },

  componentWillUnmout: function () {
    this.EmotionsListener.remove();
  },

  _onChange: function () {
    this.setState({ currentEmotion: EmotionsStore.mostRecent() });
  },

  moodColor: function () {
    var colors = {
      "anger": "red",
      "contempt": "purple",
      "disgust": "green",
      "fear": "darkred",
      "happiness": "yellow",
      "neutral": "white",
      "sadness": "blue",
      "surprise": "orange"
    };

    var emotionObj = this.state.currentEmotion;
    var maxEmotion;
    var maxEmotionValue = 0;
    for (var emotion in colors) {
      if(!emotionObj.hasOwnProperty(emotion)) continue;
      if (emotion !== "id") {
        if (emotionObj[emotion] > maxEmotionValue) {
          maxEmotion = emotion;
          maxEmotionValue = emotionObj[emotion];
        }
      }
    }
    return colors[maxEmotion];
  },

  render: function () {
    return (
      <div className="mood-ring"
        style={{backgroundColor: this.moodColor()}}>
        <div className="opacity-wrapper"></div>
        <Navbar active="moodring"/>
      </div>
    );
  }
});

module.exports = MoodRing;
