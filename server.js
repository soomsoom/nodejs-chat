/* * * * * * * * * * * * * * * * 
 *  Multi Room Chat Server	   *
 * ------------------------    *
 *  Developed By Doron Rainer  *
 *                             *
 * * * * * * * * * * * * * * * */

require('./library/functions.js')

/*
 *  Who need http? that you express :)
 */
var express = require('express');
var app = express();

/*
 * Espically you can use <html> code for display an HTML webpage
 * and use it as HTML5 APP
 */ 
app.use(express.static('html'));
app.get('/', express.static('html'));


/*
 * Apperntly the listen function of the Express library is using http library
 * and I can use it with socket.io
 */ 
var server = app.listen(8081, function() {
	console.log('Server started on port: 8081');
});

var chatServer = require('./chat.js');
chatServer.listen(server);
