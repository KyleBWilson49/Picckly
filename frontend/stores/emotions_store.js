var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var EmotionsStore = new Store(AppDispatcher);

var _emotions = [];


EmotionsStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case "EMOTIONS_RECEIVED":
      _emotions = payload.emotions;
      break;
  }
  EmotionsStore.__emitChange();
};

EmotionsStore.allEmotions = function(){
  console.log("here");
  return _emotions.slice(0);
};


module.exports = EmotionsStore;
