
var express = require('express');
var app = express();

var server = app.listen(3000);

app.use(express.static('public'));

var socket = require('socket.io');
var io = socket(server);
// console.log(socket);
// console.log(io);

io.on('connection', new_connection);

function new_connection(socket) {
	console.log("new connection: " + socket.id);
	socket.on('mouse', mouse_msg);

	function mouse_msg(data) {
		socket.broadcast.emit('mouse', data);
		console.log(data);
	}
}

