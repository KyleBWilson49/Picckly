var AppDispatcher = require('../dispatcher/dispatcher');

var ApiActions = {
  receiveEmotions: function(emotions) {
    AppDispatcher.dispatch({
      actionType: "EMOTIONS_RECEIVED",
      emotions: emotions
    });
  },
<<<<<<< HEAD

  receiveSingleEmotion: function (emotion) {
    AppDispatcher.dispatch({
      actionType: "SINGLE_EMOTION_RECEIVED",
      emotion: emotion
=======
  receiveTweets: function(tweets) {
    AppDispatcher.dispatch({
      actionType: "TWEETS_RECEIVED",
      tweets: tweets
>>>>>>> 83090d6e72feaae1e17f832a292652aefbf4957b
    });
  }
};

module.exports = ApiActions;
