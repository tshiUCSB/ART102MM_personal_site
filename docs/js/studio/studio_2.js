/*
Studio 2 for ART102MM
10/12/20
Code by Tina Shi
URL: https://tshiucsb.github.io/ART102MM_personal_site/html/studio/studio_2.html
*/

var squares = null;
var Square = function(x, y, s, c) {
	this.x = x;
	this.y = y;
	this.s = s;
	this.c = c;
};
var max_s = null;


function setup() {
	createCanvas(windowWidth, windowHeight);
	background("#d71343");
	squares = [];
	max_s = 15;
}

function draw() {
	for(let i = 0; i < squares.length; i++) {
		let tmp = squares[i];
		fill(tmp.c);
		noStroke();
		rectMode(CENTER);
		rect(tmp.x, tmp.y, tmp.s);
	}
	loadPixels();
	let idx = ((mouseY - 1) * width + mouseX) * 4;
	if (pixels[idx] == 0 && pixels[idx + 1] == 0 && pixels[idx + 2] == 0) {
		noCursor();
	}
	else {
		cursor(CROSS)
	}
	updatePixels();
}

function windowResized() {
	let w = width;
	let h = height;
	resizeCanvas(windowWidth, windowHeight);
	background("#d71343");
	for(let i = 0; i < squares.length; i++) {
		squares[i].x = squares[i].x / w * width;
		squares[i].y = squares[i].y / h * height;
	}
}

function mouseDragged() {
	let dx = mouseX - pmouseX;
		let dy = mouseY - pmouseY;
	if (mouseButton === LEFT) {
		for(let i = 0; i < squares.length; i++) {
			squares[i].x += dx;
		}
	}
	else if (mouseButton == RIGHT) {
		for(let i = 0; i < squares.length; i++) {
			squares[i].y += dy;
		}
	}
}

function mouseClicked() {
	let c = color(0, 0, 0);
	if (mouseButton == RIGHT) {
		c = color(255, 255, 255);
	}
	let s = new Square(mouseX, mouseY, random(1, 20), c);
	squares.push(s);
}

function mouseReleased() {
	let vertices = [{x: mouseX, y: mouseY}];
	for(let i = 1; i < 4; i++) {
		let offset_x = random(width * .25, width * .75);
		let offset_y = random(height * .25, height * .75);
		let sign_x = random([-1, 1]);
		let sign_y = random([-1, 1]);
		vertices.push({
			x: vertices[i - 1].x + sign_x * offset_x,
			y: vertices[i - 1].y + sign_y * offset_y
		});
	}
	noFill();
	stroke("#000");
	strokeWeight(5);
	bezier(vertices[0].x, vertices[0].y, vertices[1].x, vertices[1].y,
		vertices[2].x, vertices[2].y, vertices[3].x, vertices[3].y);
}

document.addEventListener("contextmenu", function(e) {
	e.preventDefault();
	return false;
});


