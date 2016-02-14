var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var EmotionsStore = new Store(AppDispatcher);

var _emotions = [];


EmotionsStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case "EMOTIONS_RECEIVED":
      _emotions = payload.emotions;
      break;
    case "SINGLE_EMOTION_RECEIVED":
      _emotions.push(payload.emotion);
      break;
  }
  EmotionsStore.__emitChange();
};

EmotionsStore.allEmotions = function(){
  return _emotions.slice(0);
};

EmotionsStore.mostRecent = function(){
  if (_emotions.length === 0) {
    return {
      anger: 0,
      contempt: 0,
      disgust: 0,
      fear: 0,
      happiness: 0,
      neutral: 0,
      sadness: 0,
      surprise: 0
    };
  } else {
    return _emotions[_emotions.length - 1];
  }
};

module.exports = EmotionsStore;
