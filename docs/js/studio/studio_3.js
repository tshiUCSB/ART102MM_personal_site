/*
Studio 3 for ART102MM
10/14/20
Code by Tina Shi
URL: https://tshiucsb.github.io/ART102MM_personal_site/html/studio/studio_3.html
*/

var cube = null;
var bg_color = "#000";

function preload() {
	// loads in image for cube
	cube = loadImage("../../assets/cube_icon.png");
}

function setup() {
	// create canvas to fill window
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	// fill background with specified background color
	background(bg_color);
	// draw image by specifying coordinate for center of image
	imageMode(CENTER);
	// cube width takes up 20% of canvas width
	let cube_w = width * .2;
	// cube height depends on cube width for set asepct ratio
	let cube_h = cube_w / 930 * 989;

	// save and stash current settings
	push()
	// translate canvas origin to center
	translate(width / 2, height / 2);
	// rotate canvas around origin by amount of phone rotation in Z
	rotate(rotationZ);
	// draw cube to canvas at origin
	image(cube, 0, 0, cube_w, cube_h);
	// resume saved settings
	pop()
}

function touchStarted() {
	// if phone screen is touched, change background color to white
	bg_color = "#fff";
}

function touchEnded() {
	// if phone screen is no longer touched, change background color back to black
	bg_color = "#000";
}

function windowResized() {
	// if window resized, resize canvas to fill window
	resizeCanvas(windowWidth, windowHeight);
}




