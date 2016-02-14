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
  }
};

module.exports = ApiActions;
