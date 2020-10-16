/*
Sketch 2 for ART102MM
10/15/20
Code by Tina Shi
URL: https://tshiucsb.github.io/ART102MM_personal_site/html/sketch/sketch_2.html
*/

var bg_color = null;
var font_color = null;

function setup() {
	createCanvas(windowWidth, windowHeight);
	bg_color = "#fff";
	font_color = "#000";
}

function draw() {
	background(bg_color);
	fill(font_color);
	textAlign(CENTER);
	text("This world isn't just black and white", width / 2, height / 2);
	loadPixels();
	for(let i = 0; i < pixels.length; i += 4) {
		let pxl_idx = i / 4;
		let pxl_x = pxl_idx % width;
		if (pxl_x > mouseX) {
			for(let j = 0; j < 3; j++) {
				pixels[i + j] = 255 - pixels[i + j];
			}
		}
	}
	updatePixels();
}


