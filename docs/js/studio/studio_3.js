/*
Studio 3 for ART102MM
10/14/20
Code by Tina Shi
URL: https://tshiucsb.github.io/ART102MM_personal_site/html/studio/studio_3.html
*/

var cube = null;
var bg_color = "#000";

function preload() {
	cube = {};
	cube["src"] = loadImage("../../assets/cube_icon.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background(bg_color);
	imageMode(CENTER);
	let cube_w = width * .2;
	let cube_h = cube.w / 930 * 989;

	push()
	translate(width / 2, height / 2);
	rotate(rotationZ);
	image(cube.src, 0, 0, cube_w, cube_h);
	pop()
}

function touchStarted() {
	bg_color = "#fff";
}

function touchEnded() {
	bg_color = "#000";
}






