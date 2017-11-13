$(document).ready(function () {
  var extensionDialog;
  tableau.extensions.initializeAsync().then(function () {
    console.log("initialized");

    tableau.extensions.ui.displayDialogAsync("http://localhost:3333/popup.html").then((dialog) => {
        var socket = io.connect('http://localhost:3333');
        socket.on('close', function (data) {
          console.log("received close signal: " + data.interval);
          dialog.close();

          var intervalInMs = data.interval * 1000;
          setInterval(() => {
            tableau.extensions.dashboardContent.dashboard.worksheets[0].getDataSourcesAsync().then((dataSources) => {
              dataSources[0].refreshAsync();
            });
          }, intervalInMs);
        });
    });

  }, function (err) {
    // Something went wrong in initialization
    console.log('Error while Initializing: ' + err.toString());
  });

  // var socket = io.connect('http://localhost:3333');
  // socket.on('close', function (data) {
  //   console.log("received close signal: " + data.interval);
  //   tableau.extensions.ui.close()

  //   var intervalInMs = data.interval * 1000;
  //   setInterval(() => {
  //     tableau.extensions.dashboardContent.dashboard.worksheets[0].getDataSourcesAsync().then((dataSources) => {
  //       dataSources[0].refreshAsync();
  //     });
  //   }, intervalInMs);
  // });
});