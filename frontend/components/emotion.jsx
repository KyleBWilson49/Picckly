var React = require('react');

var emotions = ["happiness", "sadness", "anger", "surprise"];

var Emotion = React.createClass({
  getInitialState: function () {
    return{
      emotionCheck: this.selectEmotion(),
      verified: false
    };
  },

  componentDidMount: function () {
    this.checkEmotion();
  },

  selectEmotion: function () {
    var selected = false;
    var selectedEmotion;
    while (selected === false) {
      selectedEmotion = emotions[Math.floor(Math.random() * myArray.length)];
      if (selectedEmotion !== this.state.emotionCheck) {
        selected = true;
      }
    }
    return selectedEmotion;
  },

  checkEmotion: function () {
    var that = this;

    var interval = setInterval(function () {
      if (that.props.emotionScore < 0.9) {
        that.props.emotionCallback(that.state.emotionCheck);
      } else {
        clearInterval(interval);
        console.log("You DID IT!!");
      }
    }, 1500);
  },

  emotionFace: function () {
    if (this.state.emotionCheck == "happiness") {
      return ":)";
    } else {
      return ">:(";
    }
  },

  render: function () {
    var face = this.emotionFace();
    console.log(this.props.emotionScore);
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
