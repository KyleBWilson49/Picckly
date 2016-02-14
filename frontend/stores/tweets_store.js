var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var TweetsStore = new Store(AppDispatcher);

var _tweets = {};

// var resetPrimaries = function (primaries) {
//   _primaries = {};
//   primaries.forEach(function (primary) {
//     _primaries[primary.id] = primary;
//   });
// };
var createTweets = function (tweets) {
  _tweets = tweets;
};
// var removePrimary = function(primary) {
//   delete _primaries[primary.id];
// };
TweetsStore.all = function () {
  var tweets = [];
  for (var id in _tweets) {
    tweets.push(_tweets[id]);
  }
  return tweets;
};
TweetsStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "TWEETS_RECEIVED":
      createTweets(payload.tweets);
      TweetsStore.__emitChange();
      break;
    // case PrimaryConstants.PRIMARY_CREATED:
    //   addPrimary(payload.primary);
    //   PrimaryStore.__emitChange();
    //   break;
    // case PrimaryConstants.PRIMARY_REMOVED:
    //   removePrimary(payload.primary);
    //   PrimaryStore.__emitChange();
    //   break;
  }
};

module.exports = TweetsStore;
