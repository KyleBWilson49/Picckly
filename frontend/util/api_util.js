var ApiActions = require('../actions/api_actions');

var ApiUtil = {
  fetchEmotions: function(){
    $.ajax({
      method: "GET",
      url: "api/emotions",
      success: ApiActions.receiveEmotions
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
  }
};

module.exports = ApiUtil;
