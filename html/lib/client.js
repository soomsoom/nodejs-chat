/*
 * This is using to implement the client class.
 * its not dont yet.
 */
var socket;

function connectToServer(username) {
	
	if (typeof(username) == 'undefiend' || username == "") {
		$(ui).trigger("bus", ["alert" ,"Please Insert Username"]);
	} else {
		socket = io('http://127.0.0.1:8081', { query: "username="+username });
			socket.on('connect', function() {
				$('#textsend').removeAttr('readonly');
				$('#send').removeAttr('disabled');
				$('#connect').attr('disabled', 'disabled').css('background-color', 'green').css('color','white').text('Connected!');
			});
		socket.on('failed', function() {
			alert('faild');
		});
	}

}

