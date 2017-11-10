(function () {
  $(document).ready(function () {
    tableau.extensions.initializeAsync().then(function () {

      tableau.extensions.ui.displayDialogAsync("localhost:3333/popup.html");

    }, function (err) {
      // Something went wrong in initialization
      console.log('Error while Initializing: ' + err.toString());
    });

    var socket = io.connect('http://localhost:3333');
    socket.on('close', function (data) {
      console.log("received close signal");
      //tableau.extensions.ui.close()
    });
  });
});