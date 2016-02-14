var AppDispatcher = require('../dispatcher/dispatcher');

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
  }
};

module.exports = ApiActions;
