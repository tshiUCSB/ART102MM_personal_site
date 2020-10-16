/*
Sketch 2 for ART102MM
10/15/20
Code by Tina Shi
URL: https://tshiucsb.github.io/ART102MM_personal_site/html/sketch/sketch_2.html
*/

// variables for storing background and font color
var bg_color = null;
var font_color = null;

function setup() {
	// create canvas to fill window
	createCanvas(windowWidth, windowHeight);
	// set background color to white
	bg_color = "#fff";
	// set font color to black
	font_color = "#000";
}

function draw() {
	// fill background with background color
	background(bg_color);
	// set fill color to font color
	fill(font_color);
	// set text alignment to center
	textAlign(CENTER);
	// draw text at center of canvas
	text("This world isn't just black and white", width / 2, height / 2);
	// load all pixels on canvas
	loadPixels();
	// loop through all pixels
	for(let i = 0; i < pixels.length; i += 4) {
		// get the pixel number out of all pixels
		let pxl_idx = i / 4;
		// find x-coordinate of pixel on canvas
		let pxl_x = pxl_idx % width;
		// if pixel is to the right of current mouse position, invert the color of the pixel
		if (pxl_x > mouseX) {
			for(let j = 0; j < 3; j++) {
				pixels[i + j] = 255 - pixels[i + j];
			}
		}
	}
	// update the pixels on canvas with the color adjustments
	updatePixels();
}


