var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var ScoresStore = new Store(AppDispatcher);

var _scores = [];

// var resetPrimaries = function (primaries) {
//   _primaries = {};
//   primaries.forEach(function (primary) {
//     _primaries[primary.id] = primary;
//   });
// };
var createScores = function (scores) {
  // debugger;
  _scores.push(scores.Score);
  if (_scores.length === 20) {
    ScoresStore.__emitChange();
  }
};
// var removePrimary = function(primary) {
//   delete _primaries[primary.id];
// };
ScoresStore.all = function () {
  // var scores = [];
  // for (var id in _scores) {
  //   scores.push(_scores[id]);
  // }
  return _scores;

};
ScoresStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "SCORES_RECEIVED":
      createScores(payload.scores);
      // ScoresStore.__emitChange();
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

module.exports = ScoresStore;
