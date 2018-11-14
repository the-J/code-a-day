$(document).ready(function(){

  $('.upload-btn').on('click', function(){
    // Triggering hidden input button
    $('#upload-input').click();
    // Upload bar
    $('.progress-bar').text('0%');
    $('.progress-bar').width('0%');
  });


  $('#upload-input').on('change', function(){
    var uploadInput = $('#upload-input');

    if(uploadInput.val() != ''){
      // formData available in ajax
      var formData = new FormData();

      // sending this values to th server
      formData.append('upload', uploadInput[0].files[0]);

      $.ajax({
        // need to create just a post route for url
        url: '/upload',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data){
          uploadInput.val('');
        },

        xhr: function(){
          var xhr = new XMLHttpRequest();

          xhr.upload.addEventListener('progress', function(e){
            if(e.lengthComputable){
              var uploadPercent = e.loaded / e.total;
              uploadPercent = (uploadPercent * 100);

              $('.progress-bar').text(uploadPercent+'%');
              $('.progress-bar').width(uploadPercent+'%');

              if(uploadPercent === 100){
                $('.progress-bar').text('Done');
                $('#completed').text('File Uploaded');
              }
            }
          }, false);

          return xhr;
        }
      })
    }
  })
})
