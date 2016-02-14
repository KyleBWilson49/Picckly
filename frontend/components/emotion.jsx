var React = require('react');

var emotions = ["happiness", "sadness", "neutral"];

var Emotion = React.createClass({
  getInitialState: function () {
    return{
      emotionCheck: this.randomEmotion(),
      verified: false,
      verifiedEmotions: 0,
      pause: false
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
      if (!that.state.pause && that.props.emotionScore[1] > 0.7) {
        that.setState({ verifiedEmotions: that.state.verifiedEmotions + 1, pause: true });
        clearInterval(interval);
        if (that.state.verifiedEmotions < 2) that.setState({ emotionCheck: that.selectEmotion() });
        that.checkFinishEmotion();
      }
    }, 2500);
  },

  componentWillReceiveProps: function (prop) {
    if (this.state.pause && (prop.emotionScore[0] === this.state.emotionCheck)) {
      this.setState({
        pause: false
      })
    }
  },

  checkFinishEmotion: function () {
    var that = this;
    if (this.state.verifiedEmotions >= 2) {
      this.props.emotionsVerified();
    } else {
      setTimeout(function () {
        that.checkEmotion()
      }, 1000)
    }
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
    var score = 0;
    if (!this.state.pause) {
      score = this.props.emotionScore[1];
    }

    var left = 480*score + "px";
    var style = {transform:"translateX(" + left + ")"};


    return (
      <div>
        <section className="emotion-text">
          Hello {this.props.username}! <br/>
          Make a {this.state.emotionCheck} face {face}<br/>
        </section>
        <div className="slider-box2">
          <div className="slider-bar2"></div>
          <div className="pointer2" style={style}></div>
        </div>
      </div>
    );
  }
});

module.exports = Emotion;
