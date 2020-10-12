
/*
Studio 1 for ART102MM
10/07/20
Code by Tina Shi
URL: https://tshiucsb.github.io/ART102MM_personal_site/html/studio/studio_1.html
*/

// Variables to store previous mouse click position
var prevX = null;
var prevY = null;
// Object to store color pallete
var colors = {
	highlight: "#d71343",
	accent: '#13bed7',
	midtone: '#3d3d3d',
	dark: '#000000'
}
// Variables to keep track of color-lerping amount and change of color-lerping amount
var lerp_amt = 0;
var lerp_diff = .1;

function setup() {
	// Sets up canvas to fill window
	createCanvas(window.innerWidth, window.innerHeight);
	// Initialize previous mouse positions
	prevX = mouseX;
	prevY = mouseY;
	// Fill background
	background(colors.dark);
	// Draw circle in center
	fill(colors.highlight);
	ellipse(width / 2, height / 2, 300, 300);
}

function draw() {
	// Draw circle at thhe current mouse position
	strokeWeight(2);
	// Get color for stroke by using the current lerp amount
	stroke(lerpColor(color(colors.midtone), color(colors.highlight), lerp_amt));
	noFill()
	ellipse(mouseX, mouseY, Math.random() * 100);
}

function mouseClicked() {
	// Get color for stroke by using the current lerp amount
	stroke(lerpColor(color(colors.accent), color(colors.highlight), lerp_amt));
	strokeWeight(4);
	// Draw line from previous click position to current click position
	line(prevX, prevY, mouseX, mouseY);
	// Replace previous click position with current click position
	prevX = mouseX;
	prevY = mouseY;
	// Increase lerp amount so the next click will have a different stroke color
	lerp_amt = (lerp_amt + lerp_diff) % 1;
}


