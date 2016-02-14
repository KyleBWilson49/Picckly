var ApiActions = require('../actions/api_actions');

var ApiUtil = {
  fetchEmotions: function(){
    $.ajax({
      method: "GET",
      url: "api/emotions",
      success: ApiActions.receiveEmotions
    });
  },
<<<<<<< HEAD

  postEmotion: function (emotion) {
    $.post("api/emotions", { emotion: emotion}, function (emotion) {
      ApiAction
    })
=======
  fetchTwitter: function(handle){
    $.ajax({
      method: "POST",
      url: "api/tweets",
      data: {query: handle},
      success: function (tweets) {
        ApiActions.receiveTweets(tweets);
      }
    });
>>>>>>> 83090d6e72feaae1e17f832a292652aefbf4957b
  }
};

module.exports = ApiUtil;
