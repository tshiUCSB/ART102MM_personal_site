/*
Studio 3 for ART102MM
10/14/20
Code by Tina Shi
URL: https://tshiucsb.github.io/ART102MM_personal_site/html/studio/studio_3.html
*/

var cube = null;

function preload() {
	cube = {};
	cube["src"] = loadImage("../../assets/cube_icon.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background("#000");
	imageMode(CENTER);
	let cube_w = width * .1;
	let cube_h = width * .1 / 930 * 989;
	rotate(rotationZ);
	image(cube.src, width / 2, height / 2, cube_w, cube_h);
}





