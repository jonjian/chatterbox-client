class App {
  constructor() {
    this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages?order=-createdAt';
    this.init();
    console.log(window.location.search);
    var name = window.location.search.slice(10);
    var splitName = name.split('%20').join(' ');
    this.username = splitName;  
    this.lobbies = {};
    this.lobby = 'lobby';
    this.friends = {};
  }
  
  init() {
    $(document).ready(function() {
      //submit a post
      $('#submit').on('click', function(event) {
        // app.clearMessages();
        app.fetch(); 
        var text = $('.msg').val();
        console.log(text);
        var message = {'username': app.username, 'text': text, 'roomname': app.lobby};
        // app.renderUserName(username);
        // app.renderUserName(app.username);
        
        app.renderMessage(app.username, message);
        app.send(message);
        // use this message later to send the message
        // and render the message
      });
      
     
// Close the dropdown menu if the user clicks outside of it
      window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {

          var dropdowns = document.getElementsByClassName('dropdown-content');
          var i;
          for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
            }
          }
        }
      };
      
      //clear messages
      $('#clear').on('click', function(event) {
        app.clearMessages();
      });
    
      //   var name = event.currentTarget.dataSet.value();
      //   console.log(name);
      //     // $('.{name}').css // bold
        
      // });
      
      $('#chats').on('click', '#name', function(event) {
          // $(`'{username}'`)
        event.preventDefault();
        $(`.${this.className} ~ div`).css({
          'font-weight': '900'
        });
        if (!app.friends.hasOwnProperty(this.className)) {
          app.friends[this.className] = this.className;
        }
        $(`.${this.className}`).addClass('friend');
        
        
        // $(`.${this.className} ~ div`).removeClass('friend');
        // $(`.${this.className}`).css({
          // 'background-color': ''
        
        // });
      });

      $('#roomSelect').on('click', '#room', function(event) {
        
        app.lobby = this.className;
        app.fetch();
      });

      $('#friendsList').on('click', function(event) {
        // $('.friend').addClass('hello');
        // console.log(this.className);
        for (var key in app.friends) {
          console.log(key);
        }
        $('.friend').each(function(element) {
        
          // console.log(this.className);
        });
      });
      
      app.fetch();
    });
  }

  send(message) {
    $.ajax({
      url: app.server,
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function () {
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
        app.renderRoom(messages);
        app.clearMessages();
        for (var i = 0; i < messages.length; i++) {
          // var name = messages[i].username.replace('%20', ' ');
          if (messages[i].roomname === app.lobby) {
            // var name = escapeHtml(messages[i].username)
            app.renderMessage(messages[i].username, messages[i].text);
          }
          
        }
      },
    });
  }
  


  clearMessages() {
    $('#chats').empty();
  }
  
  
  renderMessage(username, message) {
    var $combined = $('<div></div> <br>');

    var $username = $('<a href="#" id="name"></a>');
    $username.text(`${username}: `);
    $username.attr({'class': username});
    $username.appendTo($combined);

    var $message = $('<div></div>');
    $message.text(`${message}`);
    $message.addClass('message');
    $message.addClass(username);
    $message.appendTo($combined);

    
  
    $('#chats').append($combined);
    // $('#chats').append(`<a href='#' id="name"> ${username}:  </a>`);
    // $('#chats').append(`<div class="message" class="${username}"> ${message} </div></a> <br>`);
  }

  renderRoom(messages) {
    for (var i = 0; i < messages.length; i++) {
      if (!app.lobbies.hasOwnProperty(messages[i].roomname)) {
        app.lobbies[messages[i].roomname] = messages[i].roomname;
        app.renderList(messages[i].roomname);
      }
    }
  }  
  
  renderList(room) {
    var $room = $('<a href="#" id="room" class=${room}></a>');
    $room.text(`${room}`);
    $('#roomSelect').append($room);
    // $('#roomSelect').append(`<a href="#" id="room" class=${room}> ${room} </a>`);
  }

  
  
  handleUsernameClick(friend) {

  }
    
  myFunction() {
    document.getElementById('roomSelect').classList.toggle('show');
  }


}

var app = new App();
// var xssEscape = require('xss-escape');
//usernames
//when you click on someone bold them.
//when you click on someone friend them.
//clear message 
//send message (via server)
