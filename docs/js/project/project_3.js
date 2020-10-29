/*
Project 3 for ART102MM
10/26/20
Code by Tina Shi
URL: https://tshiucsb.github.io/ART102MM_personal_site/html/project/project_3.html
*/

// constants taken from public health SBC data
var TOTAL_CONFIMRED = 9820;
var RECOVERED = 9580;
var DEATHS = 122;
var INFECTIOUS = 118;

// variables for storing DOM elements
var MSG_INPUT = null;
var DESCRIPTION = null;
var msg_content = "";

var has_typed = false;
var total_count = 0;
var recover_count = 0;

var particles = null;
// Particle object
function Particle(x, y, z, r, nx, ny, nz, vx, vy, vz, rx, ry, rz, 
	c={r: 0, g: 0, b: 0}, is_infected=true, is_infectious=false) {
	// x, y, z position
	this.x = x;
	this.y = y;
	this.z = z;
	// radius or side length
	this.r = r;
	// noise coordinate x, y, z
	this.nx = nx;
	this.ny = ny;
	this.nz = nz;
	// variation x, y, z
	this.vx = vx;
	this.vy = vy;
	this.vz = vz;
	// rotation multiplier x, y, z
	this.rx = rx;
	this.ry = ry;
	this.rz = rz;
	// color {r, g, b}
	this.c = c;
	// booleans for if the particle is infected and if it is infectious
	this.is_infected = is_infected;
	this.is_infectious = is_infectious;
	// calculate new position based on noise and variation
	this.calculate_pos = function() {
		this.vx += this.nx;
		this.vy += this.ny;
		this.vz += this.nz;
		this.x = map(noise(this.vx), 0, 1, width / -2, width / 2);
		this.y = map(noise(this.vy), 0, 1, width / -2, width / 2);
		this.z = map(noise(this.vz), 0, 1, height / -2, height / 2);
	}
	this.draw = function() {
		// draw cube at particle position and rotate consistently with frame count
		push();
		translate(this.x, this.y, this.z);
		rotateX(frameCount * this.rx);
		rotateY(frameCount * this.ry);
		rotateZ(frameCount * this.rz);
		ambientLight(250);
		// point light of crimson color at mouse position
		pointLight(215, 19, 67, mouseX - width / 2, mouseY - height / 2, 50);
		specularMaterial(this.c.r, this.c.g, this.c.b);
		shininess(20);
		box(this.r);
		pop();
		// recalculate position
		this.calculate_pos();
	}
	this.connect = function(p, threshold) {
		// if distance between this particle to target particle is less than threshold
		if (p != this && dist(this.x, this.y, this.z, p.x, p.y, p.z) < threshold) {
			// draw line to connect 2 particles
			line(this.x, this.y, this.z, p.x, p.y, p.z);
			return true;
		}
		return false;
	}
	this.wither = function(rate) {
		// decrease size of particle at given rate
		this.r -= rate;
		if (this.r <= 0) {
			return true;
		}
		return false;
	}
}

function setup() {
	// create canvas to fill window and position it
	let cnv = createCanvas(windowWidth, windowHeight, WEBGL);
	cnv.parent("p5-canvas");
	// initializes all particles with total number based on total confirmed cases
	particles = {};
	for(let i = 0; i < floor(TOTAL_CONFIMRED / 100); i++) {
		particles[i.toString()] = new Particle(width / 2 * random(-1, 1), 
			width / 2 * random(-1, 1), height / 2 * random(-1, 1), random() * 20 + 5, 
			random(.0001, .0003), random(.0001, .0003), random(.0001, .0003), 
			random(width), random(width), random(height), 
			random(-.01, .01), random(-.01, .01), random(-.01, .01), undefined, undefined, 
			random() > INFECTIOUS / TOTAL_CONFIMRED * 2 ? false : true);
		// determine is_infectious based on hitting ratio from data
	}
	// set total count
	total_count = Object.keys(particles).length;
}

function draw() {
	if (has_typed)
		// color background based on number of recovered particles
		// more recovered, lighter background
		background(lerpColor(color(0, 0, 0), color(255, 255, 255), recover_count / total_count));
	else clear();
	// loop through particles and draw each
	for(const key in particles) {
		let p = particles[key];
		p.draw();
		// if particle is infectious, loop through particles to infect others
		if (p.is_infectious) {
			for(const i in particles) {
				let connected = p.connect(particles[i], 6 * 12);
				if (connected && has_typed) {
					particles[i].is_infected = true;
					particles[i].is_infectious = true;
					particles[i].c = {r: 0, g: 0, b: 0};
				}
			}
		}
	}
	let rm_keys = [];
	recover_count = 0;
	// loop through particles and record down keys of withered-away particles
	for(const key in particles) {
		if (!particles[key].is_infected) recover_count++;
		else if (has_typed && particles[key].wither(.00001)) rm_keys.push(key);
	}
	// remove withered particles
	for(let i = 0; i < rm_keys.length; i++) {
		delete particles[rm_keys[i]];
	}
	// update total particle count
	total_count = Object.keys(particles).length;
}

function parse_str_into_color(str) {
	// takes in string and returns array with colors generated
	// based on ASCII codes
	let colors = [];
	for(let i = 0; i < str.length; i += 3) {
		let c = {};
		c['r'] = str.charCodeAt(i) % 255;
		if (i + 1 < str.length) {
			c['g'] = str.charCodeAt(i + 1) % 255;
		}
		else {
			c['g'] = 0;
		}
		if (i + 2 < str.length) {
			c['b'] = str.charCodeAt(i + 2) % 255;
		}
		else {
			c['b'] = 0;
		}
		colors.push(c);
	}
	return colors;
}

function handle_new_input(e) {
	// handles input change
	let msg_change = e.target.value;
	// update state on first change
	if (!has_typed) has_typed = true;
	// if last character typed is whitespace, parse input data
	if (msg_change.endsWith(' ') || msg_change.endsWith('\n')) {
		msg_content += msg_change;
		// update description content
		DESCRIPTION.innerHTML = msg_content;
		e.target.value = "";
		// get colors from string
		let colors = parse_str_into_color(msg_change);
		let rec_count = 0;
		// recover particles with new colors
		for(const key in particles) {
			let p = particles[key];
			if (rec_count >= colors.length) break;
			else if (p.is_infected) {
				p.c = colors[rec_count];
				p.is_infected = false;
				p.is_infectious = false;
				rec_count++;
			}
		}
	}
}

window.addEventListener('load', function() {
	// select DOM elements once window loads
	DESCRIPTION = document.getElementById("description");
	MSG_INPUT = document.getElementById("msg-input");
	MSG_INPUT.addEventListener('input', handle_new_input);
});

