/*
Project 4 for ART102MM
11/02/20
Code by Tina Shi
URL: https://tshiucsb.github.io/ART102MM_personal_site/html/project/project_4.html
*/

var audio_started = false;
var font_1, font_2 = undefined;
var data = undefined;
// variables for storing min and max attributes of all NEOs
var curr_time, min_time, max_time = undefined;
var min_h_mag, max_h_mag = undefined;
var min_moid, max_moid = undefined;
var min_deg, max_deg = undefined;
// variables for keeping track of animation and sound
var play_pos, play_speed, scan_pos, scan_speed = undefined;

function preload() {
	// load fonts
	font_1 = loadFont("../../assets/fonts/BEYNO.otf");
	font_2 = loadFont("../../assets/fonts/SourceCodePro-Light.otf");
	// load JSON data
	data = loadJSON("https://data.nasa.gov/resource/2vr3-k9wn.json");
}

// returns updated min and max based on current value
function assign_min_max(curr, curr_min, curr_max) {
	if (curr_min == -1 || curr < curr_min) {
		curr_min = curr;
	}
	if (curr > curr_max) {
		curr_max = curr;
	}
	return [curr_min, curr_max];
}

// processes JSON data to calculate more usable values
function analyze_data(d) {
	let min_t = -1;
	let max_t = -1;
	let min_h = -1;
	let max_h = -1;
	let min_m = -1;
	let max_m = -1;
	let min_d = -1;
	let max_d = -1;
	// iterate through all NEOs in JSON
	for(const key in d) {
		let entry = d[key];
		// parse attributes
		let h_mag = parseFloat(entry.h_mag);
		if (!h_mag) continue;
		let moid = parseFloat(entry.moid_au);
		let d_date = entry.discovery_date;
		let deg = parseFloat(entry.i_deg);
		// represent discovery date by converting it into total days from 00/00/0000
		let disc_num = parseInt(d_date.substr(0, 4)) * 365
			+ parseInt(d_date.substr(5, 2) * 30)
			+ parseInt(d_date.substr(8, 2));

		// reassign parsed float values from string
		entry.h_mag = h_mag;
		entry.moid_au = moid;
		entry.i_deg = deg;
		// add new key for discovery number
		entry.disc_num = disc_num;

		// check if current entry has any min or max values for the series
		[min_h, max_h] = assign_min_max(h_mag, min_h, max_h);
		[min_t, max_t] = assign_min_max(disc_num, min_t, max_t);
		[min_m, max_m] = assign_min_max(moid, min_m, max_m);
		[min_d, max_d] = assign_min_max(deg, min_d, max_d);
	}
	return [min_t, max_t, min_h, max_h, min_m, max_m, min_d, max_d];
}

function setup() {
	let cnv = createCanvas(windowWidth, windowHeight);
	cnv.parent("p5-container");

	play_speed = .5;
	play_pos = 0;
	scan_speed = 1;
	scan_pos = 0;

	// get min and max values for different attributes of all NEOs
	let offset = 10;
	[min_time, max_time, min_h_mag, max_h_mag, min_moid, max_moid, min_deg, max_deg] = analyze_data(data);
	curr_time = min_time - offset;
	// iterate through all NEOs
	for(const key in data) {
		let entry = data[key];
		// if NEO doesn't have an absolute magnitude, ignore it
		if (!entry.h_mag) continue;
		// compute x-coordinate based on discovery date
		let x = map(entry.disc_num, min_time - offset, max_time + offset, 0, width);
		// compute length based on absolute magnitude H)
		let y = map(entry.h_mag, min_h_mag, max_h_mag, 0, height * .8);
		entry.x = x;
		entry.y = y;

		// initialize oscillator based on orbit class
		if (entry.orbit_class == "Aten")
			entry.osc = new p5.Oscillator('square');
		else if (entry.orbit_class == "Amor")
			entry.osc = new p5.Oscillator('triangle');
		else
			entry.osc = new p5.Oscillator('sine');

		// compute frequency based on in degree
		let freq = map(entry.i_deg, min_deg, max_deg, 100, 1000);
		entry.freq = freq;

		// if moid is less than .05, is PHA, lerp between mango and red
		if (entry.moid_au <= .05) {
			let to = color(227, 11, 11);
			let from = color(255, 158, 13);
			let amt = map(entry.moid_au, min_moid, .05, 0, 1);
			entry.color = lerpColor(from, to, amt);
		}
		// not PHA, lerp between red and blue
		else {
			let to = color(54, 66, 227);
			let from = color(227, 11, 11);
			let amt = map(entry.moid_au, .05, max_moid * .3, 0, 1);
			entry.color = lerpColor(from, to, amt);
		}

		// initialize orb position and set speed based on period
		entry.pos = 0;
		entry.speed = 2 * entry.y / parseFloat(entry.period_yr) / 365;
	}
	textAlign(CENTER, CENTER);
}

function play_oscillator(osc, freq) {
	osc.start();
	osc.freq(freq, .1);
	osc.amp(.05, .1);
	osc.stop(1);
}

function draw() {
	background("#000");

	// Draw title onto center of canvas
	textFont(font_1);
	fill("#2d2d2d");
	noStroke();
	textSize(50);
	text("NEO", width / 2, height / 2);

	// draw line for play progress on bottom
	stroke('#8d8d8d');
	line(0, height * .9, width, height * .9);

	// draw line for scanning orbs and instructional text
	stroke("#2d2d2d");
	fill("#2d2d2d");
	line(0, scan_pos, width, scan_pos);
	textSize(15);
	textFont(font_2);
	text("Hold down mouse to play NEO", width / 2, scan_pos);
	// update scan position
	scan_pos = (scan_pos + scan_speed) % (height * .8);

	// iterate through all NEOs
	for(const key in data) {
		let entry = data[key];
		// if NEO doesn't have an absolute magnitude
		// or has a discovery date later than the play time
		// ignore it
		if (!entry.h_mag || entry.x > play_pos) continue;
		
		// draw vertical line for NEO
		stroke(entry.color);
		line(entry.x, 0, entry.x, entry.y);

		// draw orb for NEO
		fill(entry.color);
		circle(entry.x, entry.pos, 10);
		// update orb position
		// travel back up the length of the line if reached bottom
		if (entry.pos > entry.y || entry.pos < 0) {
			entry.speed *= -1;
		}
		entry.pos += entry.speed;

		// if the orb position aligns with the scan and audio is on, play oscillator
		if (audio_started && abs(entry.pos - scan_pos) < 1) {
			play_oscillator(entry.osc, entry.freq);
		}

		// if mouse is hovered over a NEO line, display its designation and discovery date
		if (abs(mouseX - entry.x) < 1) {
			cursor(CROSS);
			stroke("#2d2d2d");
			line(entry.x, 0, entry.x, height * .9);
			fill("#fff");
			noStroke();
			textSize(12);
			textFont(font_2);
			text(entry.designation, entry.x, entry.y + 10);
			text(entry.discovery_date, entry.x, height * .9 + 10);
		}
		else {
			cursor(ARROW);
		}
	}

	// draw circle to indicate playtime
	noFill();
	stroke("#cd143c");
	let r = 5;
	circle(play_pos, height * .9, 2 * r);
	line(0, height * .9, play_pos - r, height * .9);
	// update playtime
	play_pos = (play_pos + play_speed) % width;
}

// if mouse is pressed, start audio
function mousePressed() {
	userStartAudio();
	audio_started = true;
}

// if mouse is released, stop audio
function mouseReleased() {
	audio_started = false;
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

