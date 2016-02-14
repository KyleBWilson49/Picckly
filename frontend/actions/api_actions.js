var AppDispatcher = require('../dispatcher/dispatcher');

var ApiActions = {
  receiveEmotions: function(emotions) {
    AppDispatcher.dispatch({
      actionType: "EMOTIONS_RECEIVED",
      emotions: emotions
    });
  }
};

module.exports = ApiActions;
