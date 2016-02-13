window.onload = function() {

  // Normalize the various vendor prefixed versions of getUserMedia.
  navigator.getUserMedia = (navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia ||
                            navigator.msGetUserMedia);
  // Check that the browser supports getUserMedia.
  // If it doesn't show an alert, otherwise continue.
  if (navigator.getUserMedia) {
    var videoPlaying = false;
    // Request the camera.
     var vid = document.getElementById('camera-stream');
    navigator.getUserMedia(
      // Constraints
      {
        video: true
      },

      // Success Callback
      function(localMediaStream) {
        // Get a reference to the video element on the page.


        // Create an object URL for the video stream and use this
        // to set the video source.
        vid.src = window.URL.createObjectURL(localMediaStream);

        videoPlaying  = true;
      },

      // Error Callback
      function(err) {
        // Log the error to the console.
        console.log('The following error occurred when trying to use getUserMedia: ' + err);
      }
    );
    function dataURItoBlob(dataURI) {
          // convert base64/URLEncoded data component to raw binary data held in a string
          var byteString;
          if (dataURI.split(',')[0].indexOf('base64') >= 0)
              byteString = atob(dataURI.split(',')[1]);
          else
              byteString = unescape(dataURI.split(',')[1]);

          // separate out the mime component

          var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

          // write the bytes of the string to a typed array
          var ia = new Uint8Array(byteString.length);
          for (var i = 0; i < byteString.length; i++) {
              ia[i] = byteString.charCodeAt(i);
          }

          return new Blob([ia], {type:mimeString});
      }
    document.getElementById('take').addEventListener('click', function(){
      if (videoPlaying){
        var canvas = document.getElementById('canvas');
        canvas.width = vid.videoWidth;
        canvas.height = vid.videoHeight;
        canvas.getContext('2d').drawImage(vid, 0, 0);
        var data = canvas.toDataURL('image/jpg');
        var blobData = dataURItoBlob(data);
        $.ajax({
          url: 'https://api.projectoxford.ai/face/v0/detections?subscription-key=f79747ed06a7400f8e1053a00639d44a',
          type: 'POST',
          contentType: 'application/octet-stream',
          processData: false,
          data: blobData,
          success: function (data) {
            // debugger;
            var html = '';

            $.each(data, function (commentIndex, object) {
              debugger;
              html += 'faceid:' + object['faceId']+"\r\n";
            });
            alert(html);
          }
        })
        document.getElementById('photo').setAttribute('src', data);
      }
    }, false);



  } else {
    alert('Sorry, your browser does not support getUserMedia');
  }
}
