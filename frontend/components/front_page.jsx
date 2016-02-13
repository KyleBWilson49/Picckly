var React = require('react');

var FrontPage = React.createClass({
  checkEmotion: function() {
    var canvas = document.getElementById('canvas');
    canvas.width = this.vid.videoWidth;
    canvas.height = this.vid.videoHeight;
    canvas.getContext('2d').drawImage(this.vid, 0, 0);
    var data = canvas.toDataURL('image/jpg');
    var blobData = this.dataURItoBlob(data);
    $.ajax({
      url: "https://api.projectoxford.ai/emotion/v1.0/recognize",
      beforeSend: function(xhrObj){
          xhrObj.setRequestHeader("Content-Type","application/octet-stream");
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","6f76ecd049fc42ffb6bf91d26e37a9aa");
      },
      type: "POST",
      processData: false,
      data: blobData,
    })
    .done(function(data) {
      console.log(data[0].scores.happiness)
    })
    .fail(function() {
        alert("error");
    });
    return data;
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
          var data = that.checkEmotion();

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
          //     // alert(html);
          //   }
          // })
          document.getElementById('photo').setAttribute('src', data);
        }
      }, false);
    } else {
      alert('Sorry, your browser does not support getUserMedia');
    }
  },

  render: function () {
    return (
      <div>
        <button id="take">Take a photo</button>
        <div id="video-container">
          <video id="camera-stream" width="500" autoPlay></video>
          <canvas id="canvas" style={{display: "none"}}></canvas>
        </div>
        <div className="img-holder">
          <img src="" id="photo"/>
        </div>
      </div>
    );
  }
});

module.exports = FrontPage;
