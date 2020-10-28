/*
Studio 7 for ART102MM
10/28/20
Code by Tina Shi
URL: https://tshiucsb.github.io/ART102MM_personal_site/html/studio/studio_7.html
*/

var meteor_data = undefined;
var rec_class = undefined;
var mass = undefined;
var time_year = undefined;

function preload() {
	// load in data from JSON
	meteor_data = loadJSON("../../assets/studio/studio_7/meteor_count.json");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	// get necessary data from loaded JSON object
	meteor_data = meteor_data.meta.view.columns;
	// loop through objects in data to retrieve useful sets of data based on id
	for(let i = 0; i < meteor_data.length; i++) {
		// if all useful sets retrieved, stop iterating
		if (rec_class && mass && time_year) break;
		// data for names
		if (meteor_data[i].id == 213865747) {
			rec_class = meteor_data[i].cachedContents.top;
		}
		// data for masses
		else if (meteor_data[i].id == 213865748) {
			mass = meteor_data[i].cachedContents.top;
		}
		// data for year
		else if (meteor_data[i].id == 213865750) {
			time_year = meteor_data[i].cachedContents.top;
		}
	}
	if (mass != undefined) {
		// get just the mass value from mass data
		for(let i = 0; i < mass.length; i++) {
			mass[i] = parseInt(mass[i].item);
		}
	}
	if (time_year != undefined) {
		// get just the year value from year data
		for(let i = 0; i < time_year.length; i++) {
			time_year[i] = parseInt(time_year[i].item.substr(0, 4));
		}
	}
}

function draw() {
	background("#000");
	// iterate through meteor data
	for(let i = 0; i < rec_class.length; i++) {
		// get the mass and map it to proper size
		let m = map(mass[i], min(mass), max(mass), 50, 150);
		let name = rec_class[i].item;
		// get the year and map it to width
		let t = map(time_year[i], min(time_year), max(time_year), width * .2, width * .8);
		// crimson color w/ transparency
		fill(color(215, 19, 67, 150));
		noStroke();
		// draw circle along width based on year with radius of mass
		circle(t, height / 2, m);
		textAlign(CENTER);
		rectMode(CENTER);
		// draw vertical line at mouse position
		stroke(color(215, 19, 67));
		line(mouseX, 0, mouseX, height);
		noStroke();
		// draw name to canvas and position it based on if its index is odd or even
		fill("#fff");
		if (i % 2 == 1) {
			text(name, t, height * .33);
		}
		else {
			text(name, t, height * .67);
		}
	}
}



