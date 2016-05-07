/* * * * * * * * * * * * * * * * 
 *  Multi Room Chat Server	   *
 * ------------------------    *
 *  Developed By Doron Rainer  *
 *                             *
 * * * * * * * * * * * * * * * */

var socketio = require('socket.io'); // socket.io library is awesome!!
var channels = []; // Array for keeping all opened channels in server.
var users = []; // Array for keeping al connected users.

require('./library/functions.js')();

/*
 * Apprently exports used to exports some data\function\objects
 * to entire NodeJS's app. thats awesome!!!
 * I use here to make socket server to listen
 * and i calling to the listen function on 'server.js'
 */ 
exports.listen = function(server) {
	var socketio = socketio.listen(server); // Creating socket.io object, and make it listening for connections.
	socketio.sockets.on('connection', function(socket) { // Trigger for connection event
		users[socket.id] = { username: socket.request._query["username"], ip: socket.handshake.address, channels: [] }; // Just add the connection to the users array, with the socket id and client's ip. also save place to keeps the channels that the client is on.
		joinChannel(socket, "#Lobby"); // Join the client as i connects to the #Lobby channel.
		socket.on("disconnect", function(){ // Trigger for disconnection event
			leaveChannel(socket, "#Lobby"); // Record that client left the channel
			delete users[socket.id]; // Delete him from the users array
		});
	});
}

// Handling channel joins
function joinChannel(socket, channel) {
	if (!(channel in channels)) {
		channels[channel] = { users: [] };
	}
	if (channels[channel].users.indexOf(socket.id) == -1) {
		channels[channel].users.push(socket.id);
		channels[channel].users.push(socket.id);
	}
	if (users[socket.id].channels.indexOf(channel) == -1) {
			users[socket.id].channels.push(channel);
			socket.join(channel);
	}
}

// Handling channel leaves.
function leaveChannel(socket, channel) {
	// Deleting user from channel's users list.
	if (channels[channel].users.indexOf(socket.id) !== -1) {
		arrayRemove(channels[channel].users, socket.id, 1);
	}
	// Deleting channel from channels array
	if (channels[channel].users.length == 0) {
		delete channels[channel];
	}
	// Deletig channel from user's channels array
	if (users[socket.id].channels.indexOf(channel) !== -1) {
		arrayRemove(users[socket.id].channels, channel, 1);
	}
	socket.leave(channel);
}
