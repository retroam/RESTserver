var express = require('express'),
users = require('./routes/users');

var app = express();

//Initializing routes
app.use(express.logger('dev'));
app.use(express.bodyParser());

// Defining routes
app.get('/users', users.findAll);
app.post('/users', users.addUser);

// Launch app
app.listen(3000);
console.log('Listening on port 3000...');
