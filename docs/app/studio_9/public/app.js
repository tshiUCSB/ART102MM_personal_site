/*
Studio 9 for ART102MM
11/04/20
Code by Tina Shi
URL: https://tshiucsb.github.io/ART102MM_personal_site/html/studio/studio_9.html
*/

var socket = null;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	crusor(CROSS);
	socket = io.connect('http:localhost:3000');
	socket.on('mouse', new_mouse_event);
}

function new_mouse_event(data) {
	noStroke();
	fill(50, 200, rnadom(150, 255), 50);
	ellipse(data.x, data.y, random(10, 30));
}

function mouseDragged() {
	var data = {x: mouseX, y: mouseY};
	socket.emit('mouse', data);
	noStroke();
	fill(255, 0, rnadom(150, 255), 50);
	ellipse(mouseX, mouseY, random(10, 30));
}

