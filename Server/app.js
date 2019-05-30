const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const index = require('./api/routes/index');
const config = require('./config/config');

const PORT = 6001;
// publicDir = '../Client/dist',
// fs = require('fs');
// view engine setup
// app.set('views', publicDir);
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

// // uncomment after placing your favicon in /public
// app.use(favicon(publicDir + '/images/favicon.ico'));
// app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(express.static(publicDir));

mongoose.connect(config.mongoDbUrl);

// app.use(passport.initialize());

// mongoose.connect(config.mongoDbUrl);

// require('./config/passport')(passport);

app.use('/', index);


app.use(function(request,response) {
  var data = '<h3>404 - Not Found</h3>';
  response.writeHead(404,{'Content-Type' : 'text/html'});
  response.end(data);
});

var server = app.listen(PORT, function() {
  console.log('Server started on port : ' + server.address().port);
});

module.exports = app;
