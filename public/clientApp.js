(function($){
  $(function() {
    var socket = io();
    socket.on('connect', function(data) {
      var userName;
      var userConfirm;
      do {
        userName = prompt('Please enter your user name');
        userConfirm = confirm('Click "ok" to confirm your username: ' + userName);
        if (userConfirm) {
          socket.emit('join', userName);
        }
      } while (!userConfirm);
    });
    //Form submit
    $('form').submit(function() {
      socket.emit('chat', $('#message').val());
      $('#message').val('');
      return false;
    });
    //Display chats
    socket.on('chat', function(message) {
      $('#chat-body').append($('<li>').text(message));
      $('html, body').animate({
        scrollTop: $(document).height()
      });
    });
    //Display users that join
    socket.on('join', function(data) {
      $('#chat-body').append($('<li>').text(data));
      $('html, body').animate({
        scrollTop: $(document).height()
      });
    });
  });
})(jQuery);
