/*
Studio 8 for ART102MM
11/02/20
Code by Tina Shi
URL: https://tshiucsb.github.io/ART102MM_personal_site/html/studio/studio_8.html
*/

var osc = undefined;
var play = false;
var button = undefined;
var permissionGranted = false;
var deviceX = undefined;
var deviceY = undefined;

function check_permission() {
	if (typeof(window.DeviceOrientationEvent) !== 'undefined' 
		&& typeof(window.DeviceOrientationEvent.requestPermission) === 'function') {
		button = createButton("Allow access to sensors");
		button.style("font-size", "24px");
		button.center();
		button.mousePressed(requestAccess);
	}
	else {
		textSize(24);
		text("This device doesn't support device orientation", 100, 100);
	}
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	osc = new p5.SinOsc();
	osc.amp(.5);
	deviceX = width / 2;
	deviceY = height / 2;
	check_permission();
}

function draw() {
	if (!permissionGranted) return;
	deviceX -= constrain(rotationX, -3, 3);
	deviceY += constrain(rotationY, -3, 3);

	deviceX = constrain(deviceX, 0, width);
	deviceY = constrain(deviceY, 0, height);

	ellipse(deviceX, deviceY, 100, 100);

	if (play) {
		let freq = map(deviceX, 0, width, 40.88);
		osc.freq(freq);

		let amp = map(deviceY, 0, height, .9, .01);
		osc.amp(amp);
	}
}

function touchStarted() {
	play = true;
	osc.start();
}

function touchEnded() {
	play = false;
	osc.stop();
}

function requestAccess() {
	DeviceOrientationEvent.requestPermission().then(response => {
		if (response === 'granted') {
			permissionGranted = true;
		}
	}).catch(console.error);
	button.remove();
}

