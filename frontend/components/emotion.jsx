var React = require('react');

var emotions = ["happiness", "sadness", "neutral"];

var Emotion = React.createClass({
  getInitialState: function () {
    return{
      emotionCheck: this.randomEmotion(),
      verified: false,
      verifiedEmotions: 0
    };
  },

  componentDidMount: function () {
    this.checkEmotion();
  },

  randomEmotion: function () {
    return emotions[Math.floor(Math.random() * emotions.length)];
  },

  selectEmotion: function () {
    var selected = false;
    var selectedEmotion;
    var that = this;
    while (!selected) {
      selectedEmotion = this.randomEmotion();
      if (selectedEmotion !== that.state.emotionCheck) {
        selected = true;
      }
    }
    return selectedEmotion;
  },

  checkEmotion: function () {
    var that = this;

    var interval = setInterval(function () {
      that.props.emotionCallback(that.state.emotionCheck);
      if (that.props.emotionScore > 0.7) {
        that.setState({ verifiedEmotions: that.state.verifiedEmotions + 1 });
        if (that.state.verifiedEmotions >= 2) {
          clearInterval(interval);
          this.props.emotionsVerified();
        } else {
          that.setState({ emotionCheck: that.selectEmotion() });
        }
      }
    }, 2000);
  },

  emotionFace: function () {
    if (this.state.emotionCheck == "happiness") {
      return ":)";
    } else if (this.state.emotionCheck == "sadness") {
      return ":(";
    } else if (this.state.emotionCheck == "neutral") {
      return ":|";
    }
  },

  render: function () {
    var face = this.emotionFace();
    return (
      <div>
        <section className="emotion-text">
          Hello {this.props.username}! <br/>
          Make a {this.state.emotionCheck} face {face}<br/>
          {this.props.emotionScore}
        </section>
        <section>

        </section>
      </div>
    );
  }
});

module.exports = Emotion;
