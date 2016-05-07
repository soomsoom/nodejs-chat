var socketio = require('socket.io');
var channels = [];
var users = [];

require('./library/functions.js')();

exports.listen = function(server) {
	//channels["#Lobby"] = { users: [] };
	var socket = socketio.listen(server);
	socket.sockets.on('connection', function(socket) {	
		users[socket.id] = { username: socket.request._query["username"], ip: socket.handshake.address, channels: [] };
		joinChannel(socket, "#Lobby");
		socket.on("disconnect", function(){
			leaveChannel(socket, "#Lobby");
			delete users[socket.id];
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
