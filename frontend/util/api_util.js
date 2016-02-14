var ApiActions = require('../actions/api_actions');

var ApiUtil = {
  fetchEmotions: function(){
    $.ajax({
      method: "GET",
      url: "api/emotions",
      success: ApiActions.receiveEmotions
    });
  },

  postEmotion: function (emotion) {
    $.post("api/emotions", { emotion: emotion}, function (emotion) {
      ApiAction
    })
  }
};

module.exports = ApiUtil;
