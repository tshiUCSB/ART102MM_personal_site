// Studio 9 server
// requires Node js to host

// initialize express
var express = require('express');
var app = express();

// create server to listen on port 3000
var server = app.listen(3000);

// serve for public directory
app.use(express.static('public'));

// initialize socket
var socket = require('socket.io');
var io = socket(server);

console.log("server");
// listen for connection packets
io.on('connection', new_connection);

function new_connection(socket) {
	console.log("new connection: " + socket.id);
	// listen for mouse packets once connected
	socket.on('mouse', mouse_msg);

	// handle mouse packet
	function mouse_msg(data) {
		// broadcast client mouse packet to all clients
		socket.broadcast.emit('mouse', data);
		console.log(data);
	}
}

