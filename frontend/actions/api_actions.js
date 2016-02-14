var AppDispatcher = require('../dispatcher/dispatcher');
var FrontPage = require('../components/front_page');

var ApiActions = {
  receiveEmotions: function(emotions) {
    AppDispatcher.dispatch({
      actionType: "EMOTIONS_RECEIVED",
      emotions: emotions
    });
  },

  receiveSingleEmotion: function (emotion) {
    AppDispatcher.dispatch({
      actionType: "SINGLE_EMOTION_RECEIVED",
      emotion: emotion
    });
  },

  receiveTweets: function(tweets) {
    AppDispatcher.dispatch({
      actionType: "TWEETS_RECEIVED",
      tweets: tweets
    });
  },
  receiveScores: function(scores) {
    AppDispatcher.dispatch({
      actionType: "SCORES_RECEIVED",
      scores: scores
    });
  },

  logOutUser: function () {
    AppDispatcher.dispatch({
      actionType: "LOGOUTUSER",
    });
  }
};

module.exports = ApiActions;
