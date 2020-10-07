
/*
Studio 1 for ART102MM
10/07/20
Code by Tina Shi
URL: https://tshiucsb.github.io/ART102MM_personal_site/html/studio_1.html
*/

var prevX = null;
var prevY = null;
var colors = {
	highlight: "#d71343",
	accent: '#13bed7',
	midtone: '#3d3d3d',
	dark: '#000000'
}
var lerp_amt = 0;
var lerp_diff = .1;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	prevX = mouseX;
	prevY = mouseY;
	background(colors.dark);
	fill(colors.highlight);
	ellipse(width / 2, height / 2, 300, 300);
}

function draw() {
	strokeWeight(2);
	stroke(lerpColor(color(colors.midtone), color(colors.highlight), lerp_amt));
	noFill()
	ellipse(mouseX, mouseY, Math.random() * 100);
}

function mouseClicked() {
	console.log("click");
	stroke(lerpColor(color(colors.accent), color(colors.highlight), lerp_amt));
	strokeWeight(4);
	line(prevX, prevY, mouseX, mouseY);
	prevX = mouseX;
	prevY = mouseY;
	lerp_amt = (lerp_amt + lerp_diff) % 1;
}


