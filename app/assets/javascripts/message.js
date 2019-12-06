$(function() {

  function buildMessage(message){
    if (message.image) {
      var image = message.image.file.match(/\/uploads.+/)
      var html = `<div class="message">
                    <div class="message__upper-info">
                      <div class="message__upper-info__talker">
                        ${message.name}
                      </div>
                      <div class="message__upper-info__date">
                        ${message.date}
                      </div>
                    </div>
                    <div class="message__text">
                      <p class="lower-messge__content">
                        ${message.body}
                      </p>
                      <img src="${image}">
                    </div>
                  </div>`
    } else {
      var html = `<div class="message">
                    <div class="message__upper-info">
                      <div class="message__upper-info__talker">
                        ${message.name}
                      </div>
                      <div class="message__upper-info__date">
                        ${message.date}
                      </div>
                    </div>
                    <div class="message__text">
                      <p class="lower-messge__content">
                        ${message.body}
                      </p>
                    </div>
                  </div>`
    }
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました")
    })
    .always(() => {
      $('.submit-btn').removeAttr("disabled")
    })
  })
});