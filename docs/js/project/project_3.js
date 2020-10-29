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

var has_typed = false;
var total_count = 0;
var recover_count = 0;

var particles = null;
function Particle(x, y, z, r, nx, ny, nz, vx, vy, vz, rx, ry, rz, 
	c={r: 0, g: 0, b: 0}, is_infected=true, is_infectious=false) {
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
	this.rx = rx;
	this.ry = ry;
	this.rz = rz;
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
		translate(this.x, this.y, this.z);
		rotateX(frameCount * this.rx);
		rotateY(frameCount * this.ry);
		rotateZ(frameCount * this.rz);
		ambientLight(250);
		pointLight(215, 19, 67, mouseX - width / 2, mouseY - height / 2, 50);
		specularMaterial(this.c.r, this.c.g, this.c.b);
		shininess(20);
		box(this.r);
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
	this.wither = function(rate) {
		this.r -= rate;
		if (this.r <= 0) {
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
			width / 2 * random(-1, 1), height / 2 * random(-1, 1), random() * 20 + 5, 
			random(.0001, .0003), random(.0001, .0003), random(.0001, .0003), 
			random(width), random(width), random(height), 
			random(-.01, .01), random(-.01, .01), random(-.01, .01), undefined, undefined, 
			random() > INFECTIOUS / TOTAL_CONFIMRED * 2 ? false : true);
	}
	total_count = Object.keys(particles).length;
}

function draw() {
	if (has_typed)
		background(lerpColor(color(0, 0, 0), color(255, 255, 255), recover_count / total_count));
	else clear();
	for(const key in particles) {
		let p = particles[key];
		p.draw();
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
	for(const key in particles) {
		if (!particles[key].is_infected) recover_count++;
		else if (has_typed && particles[key].wither(.00001)) rm_keys.push(key);
	}
	for(let i = 0; i < rm_keys.length; i++) {
		delete particles[rm_keys[i]];
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
	if (!has_typed) has_typed = true;
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

