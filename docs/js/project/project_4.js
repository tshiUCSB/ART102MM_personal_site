/*
Project 4 for ART102MM
11/02/20
Code by Tina Shi
URL: https://tshiucsb.github.io/ART102MM_personal_site/html/project/project_4.html
*/

var audio_started = false;
var font_1, font_2 = undefined;
var data = undefined;
var sin_osc, tri_osc, sqr_osc = undefined;
var env = undefined;
var curr_time, min_time, max_time = undefined;
var min_h_mag, max_h_mag = undefined;
var min_moid, max_moid = undefined;
var min_deg, max_deg = undefined;
var play_pos, play_speed, scan_pos, scan_speed = undefined;

function preload() {
	font_1 = loadFont("../../assets/fonts/BEYNO.otf");
	font_2 = loadFont("../../assets/fonts/SourceCodePro-Light.otf");
	data = loadJSON("https://data.nasa.gov/resource/2vr3-k9wn.json");
}

function assign_min_max(curr, curr_min, curr_max) {
	if (curr_min == -1 || curr < curr_min) {
		curr_min = curr;
	}
	if (curr > curr_max) {
		curr_max = curr;
	}
	return [curr_min, curr_max];
}

function analyze_data(d) {
	let min_t = -1;
	let max_t = -1;
	let min_h = -1;
	let max_h = -1;
	let min_m = -1;
	let max_m = -1;
	let min_d = -1;
	let max_d = -1;
	for(const key in d) {
		let entry = d[key];
		let h_mag = parseFloat(entry.h_mag);
		if (!h_mag) continue;
		let moid = parseFloat(entry.moid_au);
		let d_date = entry.discovery_date;
		let deg = parseFloat(entry.i_deg);
		let disc_num = parseInt(d_date.substr(0, 4)) * 365
			+ parseInt(d_date.substr(5, 2) * 30)
			+ parseInt(d_date.substr(8, 2));

		entry.h_mag = h_mag;
		entry.moid_au = moid;
		entry.disc_num = disc_num;
		entry.i_deg = deg;

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

	let offset = 10;
	[min_time, max_time, min_h_mag, max_h_mag, min_moid, max_moid, min_deg, max_deg] = analyze_data(data);
	curr_time = min_time - offset;
	for(const key in data) {
		let entry = data[key];
		if (!entry.h_mag) continue;
		let x = map(entry.disc_num, min_time - offset, max_time + offset, 0, width);
		let y = map(entry.h_mag, min_h_mag, max_h_mag, 0, height * .8);
		entry.x = x;
		entry.y = y;

		if (entry.orbit_class == "Aten")
			entry.osc = new p5.Oscillator('square');
		else if (entry.orbit_class == "Amor")
			entry.osc = new p5.Oscillator('triangle');
		else
			entry.osc = new p5.Oscillator('sine');

		let freq = map(entry.i_deg, min_deg, max_deg, 100, 1000);
		entry.freq = freq;

		if (entry.moid_au <= .05) {
			let to = color(227, 11, 11);
			let from = color(255, 158, 13);
			let amt = map(entry.moid_au, min_moid, .05, 0, 1);
			entry.color = lerpColor(from, to, amt);
		}
		else {
			let to = color(54, 66, 227);
			let from = color(227, 11, 11);
			let amt = map(entry.moid_au, .05, max_moid * .3, 0, 1);
			entry.color = lerpColor(from, to, amt);
		}

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

	textFont(font_1);
	fill("#2d2d2d");
	noStroke();
	textSize(50);
	text("NEO", width / 2, height / 2);

	stroke('#8d8d8d');
	line(0, height * .9, width, height * .9);

	stroke("#2d2d2d");
	fill("#2d2d2d");
	line(0, scan_pos, width, scan_pos);
	textSize(15);
	textFont(font_2);
	text("Hold down mouse to play NEO", width / 2, scan_pos);
	scan_pos = (scan_pos + scan_speed) % (height * .8);

	for(const key in data) {
		let entry = data[key];
		if (!entry.h_mag || entry.x > play_pos) continue;
		stroke(entry.color);
		line(entry.x, 0, entry.x, entry.y);

		fill(entry.color);
		circle(entry.x, entry.pos, 10);
		if (entry.pos > entry.y || entry.pos < 0) {
			entry.speed *= -1;
		}
		entry.pos += entry.speed;

		if (audio_started && abs(entry.pos - scan_pos) < 1) {
			play_oscillator(entry.osc, entry.freq);
		}

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

	noFill();
	stroke("#cd143c");
	let r = 5;
	circle(play_pos, height * .9, 2 * r);
	line(0, height * .9, play_pos - r, height * .9);
	play_pos = (play_pos + play_speed) % width;
}

function mousePressed() {
	userStartAudio();
	audio_started = true;
}

function mouseReleased() {
	audio_started = false;
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

