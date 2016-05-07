/* * * * * * * * * * * * * * * * 
 *  Multi Room Chat Server	   *
 * ------------------------    *
 *  Developed By Doron Rainer  *
 *                             *
 * * * * * * * * * * * * * * * */

require('./library/functions.js')
var express = require('express');
var app = express();

app.use(express.static('html'));
app.get('/', express.static('html'));

var server = app.listen(8081, function() {
	console.log('Server started on port: 8081');
});

var chatServer = require('./chat.js');
chatServer.listen(server);
