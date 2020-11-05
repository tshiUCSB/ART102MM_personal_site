/*
Studio 9 client for ART102MM
11/04/20
Code by Tina Shi
URL: https://tshiucsb.github.io/ART102MM_personal_site/html/studio/studio_9.html
*/

var socket = null;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	cursor(CROSS);
	// connect socket to port
	socket = io.connect('http://localhost:3000');
	// listen for packet from mouse channel
	socket.on('mouse', new_mouse_event);
}

// handles packet from mouse channel
function new_mouse_event(data) {
	// draw circle of random size based on position from packet
	noStroke();
	fill(50, 200, random(150, 255), 50);
	ellipse(data.x, data.y, random(10, 30));
}

function mouseDragged() {
	// on mouse drag, send position of mouse to server
	var data = {x: mouseX, y: mouseY};
	socket.emit('mouse', data);
	// draw circle of random size at mouse position
	noStroke();
	fill(255, 0, random(150, 255), 50);
	ellipse(mouseX, mouseY, random(10, 30));
}

