class App {
  constructor() {
    this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages?order=-createdAt';
    this.init();
    console.log(window.location.search);
    var name = window.location.search.slice(10);
    var splitName = name.split('%20').join(' ');
    this.username = splitName;
  }
  
  init() {
    $(document).ready(function() {
      //submit a post
      
      $('#submit').on('click', function(event) {
        // app.clearMessages();
        app.fetch(); 
        var text = $('.msg').val();
        console.log(text);
        var message = {'username': app.username, 'text': text, 'roomname': null};
        // app.renderUserName(username);
        // app.renderUserName(app.username);
        
        app.renderMessage(app.username, message);
        app.send(message);
        // use this message later to send the message
        // and render the message
      });
      
      //clear messages
      $('#clear').on('click', function(event) {
        app.clearMessages();
      });
    
      //   var name = event.currentTarget.dataSet.value();
      //   console.log(name);
      //     // $('.{name}').css // bold
        
      // });
      
      $('#chats').on('click', '#name', function(event) {
        console.log('--------------------', this.className);
        
        
          // $(`'{username}'`)
        $(`.${this.className} ~ div`).css({
          'font-weight': '900'
        });
      });
    });
  }

  send(message) {
    $.ajax({
      url: app.server,
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function () {
        console.log(message);
        app.clearMessages();
        app.fetch();
      },
      error: function () {
        console.log('fail');
      },
      type: 'POST'
    });
  }
  
  fetch() {
    $.ajax({
      url: app.server,
      contentType: 'application/json; charset=utf-8',
      type: 'GET',
      success: function(result) {
        var messages = result.results;
        // app.clearMessages();
        console.log(messages);
        for (var i = 0; i < messages.length; i++) {
          //order it by time.
          // app.renderUserName(messages[i].username);
          app.renderMessage(messages[i].username, messages[i].text);
        }
      },
    });
  }
  


  clearMessages() {
    $('#chats').empty();
  }
  
  // renderUserName(username) {
  //   $('#chats').append(`<a href='#'><div> ${username}:  </div></a>`);
  // }
  
  renderMessage(username, message) {
    var $combined = $('<div></div> <br>');

    var $username = $('<a href="#" id="name"></a>');
    $username.text(`${username}: `);
    $username.attr({'class': username});
    // $username.addClass(username);
    $username.appendTo($combined);

    var $message = $('<div></div>');
    $message.text(`${message}`);
    $message.addClass('message');
    $message.addClass(username);
    $message.appendTo($combined);

    $('#chats').append($combined);
    // $('#chats').append(`<a href='#' id="name"> ${username}:  </a>`);
    // $('#chats').append(`<div class="message" data-value="${username}"> ${message} </div></a> <br>`);
  }

  renderRoom(room) {
    $('#roomSelect').append(`<div> ${room} </div>`);
  }
  
  handleUsernameClick(friend) {

  }

}

var app = new App();
//usernames
//when you click on someone bold them.
//when you click on someone friend them.
//clear message 
//send message (via server)
