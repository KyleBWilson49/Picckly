var ApiActions = require('../actions/api_actions');

var ApiUtil = {
  fetchEmotions: function(){
    $.ajax({
      method: "GET",
      url: "api/emotions",
      success: ApiActions.receiveEmotions
    });
  },
};

module.exports = ApiUtil;
