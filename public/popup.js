$(document).ready(function () {
  $('#submit').click(() => {
  	console.log("submitted!");
    var socket = io.connect('http://localhost:3333');
    var val = $('#interval').val();
    socket.emit('close', { interval: val });
  });
});