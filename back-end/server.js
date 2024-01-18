var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json())

//init routes 
require('../routes/login')(app);
require('../routes/user')(app);
require('../routes/movieapi')(app);

//start server
app.listen(8080, function () {
  console.log('Server is started')
});