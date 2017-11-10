(function () {
  $(document).ready(function () {
    $('#submit').click(() => {
      var socket = io.connect('http://localhost:3333');
      socket.emit('close', {});
    });
  });
});