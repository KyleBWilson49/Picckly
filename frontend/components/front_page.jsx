var React = require('react');
var Emotion = require('./emotion');
var MoodRing = require('./mood_ring.jsx');
var ApiUtil = require('../util/api_util');
var ScoresStore = require('../stores/scores_store.js');

var FrontPage = React.createClass({
  getInitialState: function () {
      return {
        logIn: "Already have an account? Sign In!",
        userName: "",
        personId: "",
        blobData: "",
        emotionTest: false,
        emotionScore: 0,
        currentUser: window.currentUserId
      };
  },

  logOutUser: function () {
    this.setState({ currentUser: window.currentUserId });
  },

  checkEmotion: function(emotion) {
    var blobData = this.getImage();
    var that = this;
    var emotionExist;
    if (!emotion) {
      emotionExist = false;
    }
    $.ajax({
      url: "https://api.projectoxford.ai/emotion/v1.0/recognize",
      beforeSend: function(xhrObj){
          xhrObj.setRequestHeader("Content-Type","application/octet-stream");
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","6f76ecd049fc42ffb6bf91d26e37a9aa");
      },
      type: "POST",
      processData: false,
      data: blobData,
      emotion: emotionExist,
      success: function (data) {
        if (!emotion) {
          ApiUtil.postEmotion(data[0].scores);
        } else {
          that.setState({ emotionScore: data[0].scores[emotion] });
        }
      }
    });
  },


  dataURItoBlob: function(dataURI) {
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
  },

  componentDidMount: function () {
    this.currentUserListener = ScoresStore.addListener(this._onChange);
    navigator.getUserMedia = (navigator.getUserMedia ||
                              navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia ||
                              navigator.msGetUserMedia);
    if (navigator.getUserMedia) {
      var videoPlaying = false;
      var that = this;
      this.vid = document.getElementById('camera-stream');
      navigator.getUserMedia(
        {
          video: true
        },
        function(localMediaStream) {
          that.vid.src = window.URL.createObjectURL(localMediaStream);
          videoPlaying  = true;
        },
        function(err) {
          console.log('The following error occurred when trying to use getUserMedia: ' + err);
        }
      );
      document.getElementById('take').addEventListener('click', function(){
        if (videoPlaying){
          var userName = "Wilson";
          // var data = that.createPerson(userName);
          var data = this.detectPerson();
          // DETECTION BELOW
          // $.ajax({
          //   url: 'https://api.projectoxford.ai/face/v0/detections?subscription-key=f79747ed06a7400f8e1053a00639d44a',
          //   type: 'POST',
          //   contentType: 'application/octet-stream',
          //   processData: false,
          //   data: blobData,
          //   success: function (data) {
          //     // debugger;
          //     var html = '';
          //
          //     $.each(data, function (commentIndex, object) {
          //       var facebox = document.createElement( "div" );
          //       $(facebox).css({
          //         'position': 'absolute',
          //         'top': object.faceRectangle.top,
          //         'left': object.faceRectangle.left,
          //         'width': object.faceRectangle.width,
          //         'height': object.faceRectangle.height,
          //         'border': '3px solid white'
          //       });
          //       // debugger;
          //       var imgHolder = document.getElementsByClassName('img-holder')[0]
          //       imgHolder.appendChild(facebox)
          //       // html += 'faceid:' + object['faceId']+"\r\n";
          //     });
          //     // console.log(html);
          //   }
          // })
          document.getElementById('photo').setAttribute('src', data);
        }
      }.bind(this), false);
    } else {
      console.log('Sorry, your browser does not support getUserMedia');
    }
  },

  _onChange: function () {
    if (!window.currentUser) {
      this.setState({ currentUser: window.currentUser});
      this.setState({ emotionTest: false });
    }
  },

  detectPerson: function (callback, userName) {
    var that = this;
    // grab picture
    var blobData = that.getImage();

    $.ajax({
      url: 'https://api.projectoxford.ai/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false',
      beforeSend: function(xhrObj){
          xhrObj.setRequestHeader("Content-Type","application/octet-stream");
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","f79747ed06a7400f8e1053a00639d44a");
      },
      type: 'POST',
      processData: false,
      data: blobData,
      success: function (data) {

        callback(data[0].faceId, blobData, userName || '');
        // console.log(data[0].faceId);
        // debugger;
        // var html = '';
        //
        // $.each(data, function (commentIndex, object) {
        //   var facebox = document.createElement( "div" );
        //   $(facebox).css({
        //     'position': 'absolute',
        //     'top': object.faceRectangle.top,
        //     'left': object.faceRectangle.left,
        //     'width': object.faceRectangle.width,
        //     'height': object.faceRectangle.height,
        //     'border': '3px solid white'
        //   });
          // debugger;
          // var imgHolder = document.getElementsByClassName('img-holder')[0];
          // imgHolder.appendChild(facebox);
          // html += 'faceid:' + object['faceId']+"\r\n";
        // });
        // console.log(html);
      }
    });
  },

  createPerson: function (faceId, blobData, userName) {
    var data = JSON.stringify( {
      name: userName
    });

    var that = this;
    // create person
    $.ajax({
      url: "https://api.projectoxford.ai/face/v1.0/persongroups/piccklydevweek/persons",
      beforeSend: function(xhrObj){
          xhrObj.setRequestHeader("Content-Type","application/json");
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","f79747ed06a7400f8e1053a00639d44a");
      },
      type: "POST",
      data: data
    })
    .done(function(data) {
      console.log(data);
      that.createUser(userName);
      that.addPersonFace(data.personId, blobData);
    })
    .fail(function() {
        console.log("error in create Person");
    });
  },

  getImage: function () {
    var canvas = document.getElementById('canvas');
    canvas.width = this.vid.videoWidth;
    canvas.height = this.vid.videoHeight;
    canvas.getContext('2d').drawImage(this.vid, 0, 0);
    var data = canvas.toDataURL('image/jpg');
    var blobData = this.dataURItoBlob(data);
    return blobData;
  },

  addPersonFace: function (personId, blobData) {
    var that = this;
    $.ajax({
      url: "https://api.projectoxford.ai/face/v1.0/persongroups/piccklydevweek/persons/" + personId + "/persistedFaces",
      beforeSend: function(xhrObj){
          xhrObj.setRequestHeader("Content-Type","application/octet-stream");
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","f79747ed06a7400f8e1053a00639d44a");
      },
      type: "POST",
      processData: false,
      data: blobData
    })
    .done(function(data) {
      console.log(data);
      that.trainPersonGroup();
    })
    .fail(function() {
        console.log("error in add person face");
    });
  },

  trainPersonGroup: function () {
    $.ajax({
      url: "https://api.projectoxford.ai/face/v1.0/persongroups/piccklydevweek/train",
      beforeSend: function(xhrObj){
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","f79747ed06a7400f8e1053a00639d44a");
      },
      type: "POST"
    })
    .done(function(data) {
      console.log("training");
    })
    .fail(function() {
        console.log("error in train person group");
    });
  },

  identifyPerson: function (faceId, blobData) {
    var that = this;
    var dataObj = {
        "personGroupId":"piccklydevweek",
        "faceIds":[faceId],
        "maxNumOfCandidatesReturned":1
      };

    $.ajax({
      url: "https://api.projectoxford.ai/face/v1.0/identify",
      beforeSend: function(xhrObj){
          xhrObj.setRequestHeader("Content-Type","application/json");
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","f79747ed06a7400f8e1053a00639d44a");
      },
      type: "POST",
      data: JSON.stringify(dataObj)
    })
    .done(function(data) {
      var personId = data[0].candidates[0].personId;
      that.setState({ emotionTest: true, personId: personId });
      that.getUserName(personId);
      that.blobData = blobData;
    })
    .fail(function() {
        console.log("error in identify person");
        alert("Can not find user. Please sign up.");
    });
  },

  getUserName: function (personId) {
    var that = this;
    var userName = '';
    $.ajax({
      url: "https://api.projectoxford.ai/face/v1.0/persongroups/piccklydevweek/persons/" + personId,
      beforeSend: function(xhrObj){
          xhrObj.setRequestHeader("Content-Type","application/json");
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","f79747ed06a7400f8e1053a00639d44a");
      },
      type: "GET",
    })
    .done(function(data) {
      that.setState({ userName: data.name });
    })
    .fail(function() {
        console.log("error get user name");
    });
  } ,

  emotionsVerified: function () {
    this.addPersonFace(this.state.personId, this.blobData);
    this.giveUserSessionToken();
  },

  giveUserSessionToken: function () {
    var that = this;
    $.ajax({
      url: "/api/session",
      data: { username: this.state.userName },
      type: "POST"
    })
    .done(function (data) {
      if (data.errors) {
        console.log("user validation failed");
        return;
      } else {
        that.setState({ currentUser: that.state.userName });
      }
    })
    .fail(function (error) {
      console.log("error in give user session token");
    });
  },

  createUser: function (userName) {
    var that = this;
    $.ajax({
      url: "/api/users",
      data: { user: { username: userName } },
      type: "POST"
    })
    .done(function(data) {
      that.setState({ currentUser: userName });
    })
    .fail(function() {
      console.log('failed to create user');
    });
  },

  changePageState: function () {
    if (this.state.logIn === "Already have an account? Sign In!") {
      this.setState({ logIn: "Need to make an account? Sign Up!" });
    } else {
      this.setState({ logIn: "Already have an account? Sign In!"});
    }
  },

  signUpUser: function () {
    var userName = this.state.userName;
    this.detectPerson(this.createPerson, userName);
  },

  signInUser: function () {
    this.detectPerson(this.identifyPerson);
  },

  inputChange: function (e) {
    this.setState({ userName: e.target.value });
  },

  render: function () {
    var switchLoginState = <div className="switch-login-state" onClick={this.changePageState}>{this.state.logIn}</div>;
    var pageCommands;
    if (this.state.logIn === "Already have an account? Sign In!") {
      pageCommands = <div className="page-commands">
                      <input className="userName"
                              onChange={this.inputChange}
                              value={this.state.userName}
                              placeholder="user name"></input>

                      <div id="take" onClick={this.signUpUser}>Take a photo to Sign Up</div>
                    </div>;
    } else {
      pageCommands = <div className="page-commands">
                      <div id="take" onClick={this.signInUser}>Take a photo to Sign In</div>
                    </div>;
    }
    var emotionTest;
    if (this.state.emotionTest) {
      emotionTest = (
        <Emotion username={this.state.userName}
          emotionCallback={this.checkEmotion}
          detectCallback={this.detectPerson}
          emotionScore={this.state.emotionScore}
          emotionsVerified={this.emotionsVerified}/>
      );
    } else {
      emotionTest = "";
    }

    var view;
    if (this.state.currentUser) {
      view = (
        <MoodRing checkEmotion={this.checkEmotion}/>
      );
    } else {
      view = (
        <div className="auth-page-info">
          {emotionTest}
          {pageCommands}
          {switchLoginState}
        </div>
      );
    }

    var top;

    if (this.props.path === '/') {
      top = "100";
    } else {
      top = "-1000px";
    }

    return (
      <div className="auth-page">
        <img id="logo" src="assets/moodly-logo.png"/>
        <div id="video-container" style={{ top: top }}>
          <video id="camera-stream" width="500" autoPlay></video>
          <canvas id="canvas" style={{display: "none"}}></canvas>
        </div>
        <div className="img-holder">
          <img src="" id="photo"/>
        </div>
        {view}
      </div>
    );
  }
});
module.exports = FrontPage;
