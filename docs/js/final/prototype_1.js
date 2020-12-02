
var tool_dict = undefined;
var selected_tool = null;
var states = undefined;
var draw_position = undefined;
var mic = null;
var mic_fft = null;
var sliders = undefined;

function Tool(element, secondary=null) {
	this.element = element;
	this.selected = false;
	this.secondary = secondary;
}

function tool_click_handler(e) {
	for(const key in tool_dict) {
		tool = tool_dict[key];
		tool.selected = false;
		tool.element.style.opacity = ".6";
		if (tool.secondary)
			tool.secondary.style.visibility = "hidden";
	}
	clicked_tool = tool_dict[this.id];
	clicked_tool.selected = !(clicked_tool.selected);
	selected_tool = clicked_tool;
	this.style.opacity = clicked_tool.selected ? "1" : ".6";
	if (clicked_tool.secondary) {
		clicked_tool.secondary.style.visibility = 
			clicked_tool.selected ? "visible" : "hidden";
	}
}

function mic_click_handler(e) {
	states.mic_on = !(states.mic_on);
	if (states.mic_on) {
		userStartAudio().then(function() {
			mic.start();
			mic_fft.setInput(mic);
		});
		this.style.opacity = "1";
	}
	else {
		mic.stop();
		this.style.opacity = ".6";
	}
}

function attach_listeners() {
	let tools = document.getElementsByClassName("primary-tool");
	for(let i = 0; i < tools.length; i++) {
		let tool = tools[i];
		let secondary = document.getElementById(tool.id + "-secondary");
		tool_dict[tool.id] = new Tool(tool, secondary);
		tool.addEventListener('click', tool_click_handler);
	}
	let mics = document.getElementsByClassName("mic-tool");
	for(let i = 0; i < mics.length; i++) {
		let mic = mics[i];
		mic.addEventListener('click', mic_click_handler);
	}
}

function setup() {
	states = {
		mic_on: false,
		draw_started: false
	};
	tool_dict = {};
	attach_listeners();
	sliders = {
		x_speed: document.getElementById("x_speed_slider"),
		max_pencil_size: document.getElementById("max_pencil_size_slider"),
		max_pencil_pitch: document.getElementById("max_pencil_pitch_slider")
	};
	let cnv = createCanvas(windowWidth, windowHeight);
	cnv.parent("p5-container");
	background("#fff");

	mic = new p5.AudioIn();
	mic_fft = new p5.FFT();
}

function find_arr_max(arr) {
	if (arr.length == 0) return -1;
	let max = arr[0];
	let max_idx = 0;
	for(let i = 0; i < arr.length; i++) {
		if (arr[i] > max) {
			max = arr[i]
			max_idx = i;
		}
	}
	return max_idx;
}

function draw() {
	if (states.mic_on) {
		if (states.draw_started) {
			fill(0);
			let spectrum = mic_fft.analyze();
			let dy = find_arr_max(spectrum);
			let pitch_min = parseInt(sliders.max_pencil_pitch.min);
			let pitch_max = parseInt(sliders.max_pencil_pitch.value);
			dy = constrain(dy, pitch_min, pitch_max);
			dy = map(dy, pitch_min, pitch_max, -10, 10);

			let dx = parseInt(sliders.x_speed.value);
			let rate_min = parseInt(sliders.x_speed.min);
			let rate_max = parseInt(sliders.x_speed.max);
			let total = rate_max - rate_min;
			dx = map(dx, rate_min, rate_max, -total / 2, total / 2);
			
			let draw_size = map(mic.getLevel(), 0, 1, 
				parseInt(sliders.max_pencil_size.min), 
				parseInt(sliders.max_pencil_size.value));
			circle(draw_position.x, draw_position.y, draw_size);
			draw_position.x += dx;
			draw_position.y += dy;
		}
	}
}

function mousePressed() {
	if (states.mic_on) {
		states.draw_started = true;
		draw_position = {x: mouseX, y: mouseY};
	}
}

function mouseReleased() {
	if (states.draw_started) {
		states.draw_started = false;
	}
}



