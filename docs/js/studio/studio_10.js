/*
Studio 10 for ART102MM
11/14/20
Code by Tina Shi
URL: https://tshiucsb.github.io/ART102MM_personal_site/html/studio/studio_10.html
*/

var env1, env2, tri_osc, sin_osc = null;
var env_data, circle_data, freq_data, time_data = undefined;

function setup() {
	createCanvas(windowWidth, windowHeight);
	circle_data = {
		size: 0,
		x: 0,
		y: 0
	};
	env_data = {
		"1": {
			attk_t: .1,
			attk_lv: .7,
			dec_t: .3,
			dec_lv: .1
		},
		"2": {
			attk: .001,
			dec: .2,
			susp: .2,
			rel: .5
		}
	};
	freq_data = {
		arr: [580, 340, 580, 400, 400, 320],
		curr: 0
	};
	time_data = {
		timer: 0,
		limit: 100
	}
	let e = env_data["1"];
	env1 = new p5.Envelope(e.attk_t, e.attk_lv, e.dec_t, e.dec_lv);
	tri_osc = new p5.Oscillator('triangle');
	env2 = new p5.Envelope();
	sin_osc = new p5.Oscillator('sine');
	sin_osc.amp(env2);
	sin_osc.freq(100);
}

function draw_circle() {
	let c = circle_data;
	c.size -= 5;
	noStroke();
	fill(40, 220, 250);
	if (time_data.timer > 0)
		ellipse(c.x, c.y, c.size, c.size);
}

function show_timer() {
	let t = time_data;
	let xt = map(t.limit, 10, 100, 0, width);
	stroke(225, 0, 0);
	strokeWeight(.5);
	line(xt, 0, xt, height);

	let x_curr = map(t.timer, 0, t.limit, 0, xt);
	fill(255, 0, 0);
	noStroke();
	ellipse(x_curr, height / 2, 6, 6);
}

function draw() {
	background(220);
	let t = time_data;
	t.timer++;
	if (t.timer > t.limit) {
		t.timer = 0;

		let f = freq_data;
		let new_freq = f.arr[f.curr];
		f.curr = (f.curr + 1) % f.arr.length;
		tri_osc.freq(new_freq);
		play_sound();

		let c = circle_data;
		c.x = random(width);
		c.y = random(height);
		c.size = 350;
	}

	draw_circle();
	let e = env_data["2"];
	e.attk = map(mouseX, 0, width / 2, 0, 1.0);
	show_timer();
}

function play_sound() {
	tri_osc.start();
	env1.play(tri_osc);
}

function play_env() {
	sin_osc.start();
	let e = env_data["2"];
	env2.setADSR(e.attk, e.dec, e.susp, e.rel);
	env2.play();
}

function mousePressed() {
	play_sound();
	play_env();
	time_data.limit = map(mouseX, 0, width, 10, 100);
}
