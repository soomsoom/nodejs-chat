var ui=this;
$(this).on("bus", function(event, action ,msg) {
	switch(action) {
		case 'alert':
			alert(msg);
			break;
	}
});
$(function() {
	

	
	$("#connect").click(function() {
		connectToServer($('#username').val());
	});
	
	$('#send').click(function() {
		$(this).trigger('sendmsg');
	});
	
	$('#textsend').keypress(function(e){
		if (e.keyCode == 13) {
			$(this).trigger('sendmsg');
		}
	
	});
	
	$(this).bind("sendmsg", function(e){
		var currentText = $('#conversation').val();
		var textToAppend = $('#textsend').val();
		$('#conversation').val(currentText + "\n" + textToAppend);
		$('#textsend').val('');
		socket.emit('sendmsg',{msg: textToAppend});
	});
				
});
