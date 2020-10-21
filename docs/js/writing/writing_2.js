/*
Writing 2 for ART102MM
10/21/20
Code by Tina Shi
URL: https://tshiucsb.github.io/ART102MM_personal_site/html/writing/writing_2.html
*/

// content for response
var content = "The instantaneity of the app contributes to the imminent collapse \
of the body, space, reality, and humanity.";
var font;

function preload() {
	// preload source code font to match the app theme
	font = loadFont("../../assets/fonts/SourceCodePro-Light.otf");
}

function setup() {
	// create canvas to fill window
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background("#000");
	// if mouseY is within range, font color is crimson
	if (mouseY > windowHeight * .25 && mouseY < windowHeight * .45) {
		fill("#d71343");
	}
	// otherwise, font color is white
	else {
		fill("#fff");
	}
	// draw and align from center
	rectMode(CENTER);
	textAlign(CENTER, CENTER);
	// change text size based on x position of mouse
	textSize(18 + mouseX * .1);
	// change row gap based on y position of mouse
	textLeading(30 - mouseY * .1);
	textFont(font);
	// draw content to center of canvas
	text(content, windowWidth / 2, windowHeight / 2, windowWidth * .4, windowHeight * .6);
}


function windowResized() {
	// resize canvas to fill window when window is resized
	resizeCanvas(windowWidth, windowHeight);
}

