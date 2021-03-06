$(function() {

  function buildMessage(message){
    if (message.image) {
      let html = `<div class="message" data-message-id=${message.id}>
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
                      <img src="${message.image}">
                    </div>
                  </div>`
        return html;
    } else {
      let html = `<div class="message" data-message-id=${message.id}>
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
      return html;
    }
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      let html = buildMessage(message);
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

  let reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      last_message_id = $('.message').last().data('message-id');
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildMessage(message)
        });
        $('.messages').append(insertHTML);
        if (messages.length != 0)
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 7000);
});