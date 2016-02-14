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
      ApiActions.receiveSingleEmotion(emotion);
    });
  },

  fetchTwitter: function(handle){
    $.ajax({
      method: "POST",
      url: "api/tweets",
      data: {query: handle},
      success: function (tweets) {
        ApiActions.receiveTweets(tweets);
      }
    });
  },

  logOut: function() {
    $.ajax({
      method: "DELETE",
      url: "api/session",
      success: function () {
        window.currentUserId = '';
      }
    });
  }
};

module.exports = ApiUtil;
