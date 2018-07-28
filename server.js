var express = require('express');
var path = require('path');

var app = express();

var port = 8000;

app.use(express.static(path.join(__dirname, './src')));

app.listen(port, function (req, res) {
  console.log('Listening on port ' + port);
});
