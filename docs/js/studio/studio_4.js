/*
Studio 4 for ART102MM
10/19/20
Code by Tina Shi
URL: https://tshiucsb.github.io/ART102MM_personal_site/html/studio/studio_4.html
*/

// variable for loading in stardust dragon
var stardust = null;

function preload() {
	// preload model
	stardust = loadModel("../../assets/studio/studio_4/model.obj", true);
}

function setup() {
	// create canvas to fill window and enable WebGL
	createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
	background("#000");
	// continuously rotate horizontally
	rotateY(frameCount * .01);
	// flip model it's right side up
	rotateZ(PI);
	// draw model to canvas
	normalMaterial();
	model(stardust);
}
