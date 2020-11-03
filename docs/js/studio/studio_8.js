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

// check permission for device orientation event
function check_permission() {
	if (typeof(window.DeviceOrientationEvent) !== 'undefined' 
		&& typeof(window.DeviceOrientationEvent.requestPermission) === 'function') {
		// if support device orientation, create button for user to grant permission
		button = createButton("Allow access to sensors");
		button.style("font-size", "24px");
		button.center();
		button.mousePressed(requestAccess);
	}
	else {
		// if no support, draw text to canvas
		textSize(24);
		text("This device doesn't support device orientation", 100, 100);
	}
}

function setup() {
	// create canvas to fill window
	createCanvas(windowWidth, windowHeight);
	// create sine wave oscillator
	osc = new p5.SinOsc();
	osc.amp(.5);
	// initialize initial position
	deviceX = width / 2;
	deviceY = height / 2;
	// check for device orientation permission
	check_permission();
}

function draw() {
	if (!permissionGranted) return;
	// update position based rotation
	deviceX -= constrain(rotationX, -3, 3);
	deviceY += constrain(rotationY, -3, 3);

	// constrain position within canvas
	deviceX = constrain(deviceX, 0, width);
	deviceY = constrain(deviceY, 0, height);

	// draw ellipse at position
	ellipse(deviceX, deviceY, 100, 100);

	if (play) {
		// play sound through sine wave oscillator
		let freq = map(deviceX, 0, width, 40.88);
		osc.freq(freq);

		let amp = map(deviceY, 0, height, .9, .01);
		osc.amp(amp);
	}
}

function touchStarted() {
	// allow play sound on touch
	play = true;
	osc.start();
}

function touchEnded() {
	// stop playing sound when touch disengaged
	play = false;
	osc.stop();
}

function requestAccess() {
	// set permission state based on user selection
	DeviceOrientationEvent.requestPermission().then(response => {
		if (response === 'granted') {
			permissionGranted = true;
		}
	}).catch(console.error);
	// remove button
	button.remove();
}

