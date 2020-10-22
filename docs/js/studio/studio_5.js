/*
Studio 5 for ART102MM
10/32/20
Code by Tina Shi
URL: https://tshiucsb.github.io/ART102MM_personal_site/html/studio/studio_5.html
*/

var cam_capture = null;
var posenet = null;
var cube = null;
var is_loop = true;
var eye_pos = null;

// call back for loading ml model
function model_loaded() {
	console.log("loaded");
}

function get_pose(pose) {
	// if left eye detected, get left eye position
	if (pose.length > 0 && "leftEye" in pose[0].pose) {
		eye_pos.x = pose[0].pose.leftEye.x;
		eye_pos.y = pose[0].pose.leftEye.y;
	}
}

function preload() {
	// preload cube model
	cube = loadModel("../../assets/studio/studio_5/hollow_cube.obj", true);
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	// initialize eye position
	eye_pos = {x: 0, y: 0};
	// create new capture from web cam
	cam_capture = createCapture(VIDEO);
	cam_capture.hide();
	// load posenet model
	posenet = ml5.poseNet(cam_capture, model_loaded);
	posenet.on("pose", get_pose);
}

function draw() {
	background("#000");
	// draw web cam capture to canvas
	imageMode(CENTER);
	image(cam_capture, 0, 0, width, width / 672 * 420);
	push()
	// create grey tone ambient light
	ambientLight(60, 60, 60);
	// create white point light based on eye position
	pointLight(255, 255, 255, eye_pos.x, eye_pos.y, 50);
	specularMaterial(250);
	shininess(1);
	// move cube to position of eye with offset
	translate(eye_pos.x - width / 4, eye_pos.y - height / 4);
	// continuously rotate cube
	rotateZ(frameCount * .01);
	// draw cube for canvas
	model(cube);
	pop();
}

// for debugging purposes so ml doesn't lag out my whole computer
function mouseClicked() {
	if (is_loop) {
		is_loop = false;
		noLoop();
	}
	else {
		is_loop = true;
		loop();
	}
}

