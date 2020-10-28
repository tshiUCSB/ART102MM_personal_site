/*
Project 3 for ART102MM
10/26/20
Code by Tina Shi
URL: https://tshiucsb.github.io/ART102MM_personal_site/html/project/project_3.html
*/

var TOTAL_CONFIMRED = 9820;
var RECOVERED = 9580;
var DEATHS = 122;
var INFECTIOUS = 118;

var MSG_INPUT = null;
var DESCRIPTION = null;
var msg_content = "";

var particles = null;
function Particle(x, y, z, r, nx, ny, nz, vx, vy, vz, c={r: 0, g: 0, b: 0}, is_infected=true, is_infectious=false) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.r = r;
	this.nx = nx;
	this.ny = ny;
	this.nz = nz;
	this.vx = vx;
	this.vy = vy;
	this.vz = vz;
	this.c = c;
	this.is_infected = is_infected;
	this.is_infectious = is_infectious;
	this.calculate_pos = function() {
		this.vx += this.nx;
		this.vy += this.ny;
		this.vz += this.nz;
		this.x = map(noise(this.vx), 0, 1, width / -2, width / 2);
		this.y = map(noise(this.vy), 0, 1, width / -2, width / 2);
		this.z = map(noise(this.vz), 0, 1, height / -2, height / 2);
	}
	this.draw = function() {
		push();
		ambientLight(100);
		emissiveMaterial(color(this.c.r, this.c.g, this.c.b));
		// normalMaterial();
		translate(this.x, this.y, this.z);
		sphere(this.r);
		pop();
		this.calculate_pos();
	}
	this.connect = function(p, threshold) {
		if (p != this && dist(this.x, this.y, this.z, p.x, p.y, p.z) < threshold) {
			line(this.x, this.y, this.z, p.x, p.y, p.z);
			return true;
		}
		return false;
	}
}

function setup() {
	let cnv = createCanvas(windowWidth, windowHeight, WEBGL);
	cnv.parent("p5-canvas");
	particles = {};
	for(let i = 0; i < floor(TOTAL_CONFIMRED / 100); i++) {
		particles[i.toString()] = new Particle(width / 2 * random(-1, 1), 
			width / 2 * random(-1, 1), height / 2 * random(-1, 1), random() * 10 + 2, 
			random(.0001, .0003), random(.0001, .0003), random(.0001, .0003), 
			random(width), random(width), random(height), undefined, undefined, 
			random() > INFECTIOUS / TOTAL_CONFIMRED ? false : true);
	}
}

function draw() {
	background("#fff");
	for(const key in particles) {
		let p = particles[key];
		p.draw();
		if (p.is_infectious) {
			for(const i in particles) {
				let connected = p.connect(particles[i], 6 * 12);
				if (connected) particles[i].is_infected = true;
			}
		}
	}
}

function parse_str_into_color(str) {
	let colors = [];
	console.log(str.length);
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
	let msg_change = e.target.value
	if (msg_change.endsWith(' ') || msg_change.endsWith('\n')) {
		msg_content += msg_change;
		DESCRIPTION.innerHTML = msg_content;
		e.target.value = "";
		let colors = parse_str_into_color(msg_change);
		let rec_count = 0;
		for(const key in particles) {
			let p = particles[key];
			if (rec_count >= colors.length) break;
			else if (p.is_infected) {
				console.log(colors[rec_count]);
				p.c = colors[rec_count];
				p.is_infected = false;
				p.is_infectious = false;
				rec_count++;
			}
		}
	}
}

window.addEventListener('load', function() {
	DESCRIPTION = document.getElementById("description");
	MSG_INPUT = document.getElementById("msg-input");
	MSG_INPUT.addEventListener('input', handle_new_input);
});

