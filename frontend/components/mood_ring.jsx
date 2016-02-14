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
      "anger": "#cc3838",
      "contempt": "#b238c9",
      "disgust": "#66f293",
      "fear": "#850606",
      "happiness": "#dcdd50",
      "neutral": '#444444',
      "sadness": "#6784ec",
      "surprise": "#eca02c"
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
    var navbar = document.getElementsByClassName('navbar');
    if (Boolean(navbar[0])){
      // debugger;
      navbar[0].style.backgroundColor = this.moodColor();
    }
    // style={{backgroundColor: this.moodColor()}}>
    return (
      <div className="mood-ring">
        <div className="opacity-wrapper"></div>
        <Navbar active="moodring"/>
      </div>
    );
  }
});

module.exports = MoodRing;
