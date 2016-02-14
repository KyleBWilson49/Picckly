var AppDispatcher = require('../dispatcher/dispatcher');

var ApiActions = {
  receiveEmotions: function(emotions) {
    AppDispatcher.dispatch({
      actionType: "EMOTIONS_RECEIVED",
      emotions: emotions
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
  }
};

module.exports = ApiActions;
