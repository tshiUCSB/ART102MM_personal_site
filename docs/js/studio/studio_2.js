/*
Studio 2 for ART102MM
10/12/20
Code by Tina Shi
URL: https://tshiucsb.github.io/ART102MM_personal_site/html/studio/studio_2.html
*/

var squares = null;
// object for square w/ input x-coordinate, y-coordinate, side length, and color
var Square = function(x, y, s, c) {
	this.x = x;
	this.y = y;
	this.s = s;
	this.c = c;
};
// maximum value that side length can take
var max_s = null;


function setup() {
	// create canvas to fill window
	createCanvas(windowWidth, windowHeight);
	background("#d71343");
	// initialize empty array for squares
	squares = [];
	// set maximum side length
	max_s = 15;
}

function draw() {
	// loop through all squares in array and draw them onto canvas
	for(let i = 0; i < squares.length; i++) {
		let tmp = squares[i];
		fill(tmp.c);
		noStroke();
		rectMode(CENTER);
		rect(tmp.x, tmp.y, tmp.s);
	}
	// get pixel info from canvas
	loadPixels();
	// get the index of the pixel in the array where the mouse is at
	let idx = ((mouseY - 1) * width + mouseX) * 4;
	// if pixel is black, turn cursor invisible
	if (pixels[idx] == 0 && pixels[idx + 1] == 0 && pixels[idx + 2] == 0) {
		noCursor();
	}
	// otherwise, cursor is a cross
	else {
		cursor(CROSS)
	}
	updatePixels();
}

// resize canvas to fit window when window is resized
function windowResized() {
	// store current width and height of canvas
	let w = width;
	let h = height;
	// resize canvas to fill window
	resizeCanvas(windowWidth, windowHeight);
	// refill background
	background("#d71343");
	// update the position of all squares relative to the new dimensions
	for(let i = 0; i < squares.length; i++) {
		squares[i].x = squares[i].x / w * width;
		squares[i].y = squares[i].y / h * height;
	}
}

function mouseDragged() {
	// get the displacement in the x and the y direction of the mouse
	let dx = mouseX - pmouseX;
	let dy = mouseY - pmouseY;
	// if the left mouse button is held down and dragged, 
	// move the squares horizontally depending on the horizontal
	// direction of the drag
	if (mouseButton === LEFT) {
		for(let i = 0; i < squares.length; i++) {
			squares[i].x += dx;
		}
	}
	// if the right mouse button is held down and dragged,
	// move the squares vertically depending on the vertical
	// direction of the drag
	else if (mouseButton == RIGHT) {
		for(let i = 0; i < squares.length; i++) {
			squares[i].y += dy;
		}
	}
}

// create new square at mouse position when clicked
function mouseClicked() {
	// set the color to black
	let c = color(0, 0, 0);
	// if the right mouse button is clicked, set color to white
	if (mouseButton == RIGHT) {
		c = color(255, 255, 255);
	}
	// add square of random size to the array of squares
	let s = new Square(mouseX, mouseY, random(1, 20), c);
	squares.push(s);
}

// when the mouse is released, draw a random bezier curve from the mouse position
function mouseReleased() {
	// calculate the coordinates of 4 vertices with a random offset from the previous vertex
	// starting from the mouse position as the first vertex
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
	// draw bezier curve
	noFill();
	stroke("#000");
	strokeWeight(5);
	bezier(vertices[0].x, vertices[0].y, vertices[1].x, vertices[1].y,
		vertices[2].x, vertices[2].y, vertices[3].x, vertices[3].y);
}

// event listener for detecting when the user right clicks and brings up the
// context menu and suppresses the menu so it doesn't pop up when right clicking on canvas
document.addEventListener("contextmenu", function(e) {
	e.preventDefault();
	return false;
});


