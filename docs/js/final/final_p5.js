/*
Final Project for ART102MM
12/09/20
Code by Tina Shi
URL: https://tshiucsb.github.io/ART102MM_personal_site/html/final/final_4.html
*/

var TUTORIAL_ITEMS = undefined;

var tool_dict = undefined;
var selected_tool = null;
var states = undefined;
var draw_position = undefined;
var mic = null;
var mic_fft = null;
var last_pitch = undefined;
var sliders = undefined;
var music_file = undefined;
var music_fft = null;
var music_amp = null;

function Tool(element, secondary=null) {
	this.element = element;
	this.selected = false;
	this.secondary = secondary;
}

function tool_click_handler(e) {
	if (this.id == "clear-tool") {
		states.clear_canvas = true;
		return;
	}
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

	if (this.id == "download-tool") {
		states.download_canvas = true;
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

function play_click_handler(e) {
	states.music_on = !(states.music_on);
	let icon = this.firstChild.nextSibling;
	if (states.music_uploaded && states.music_on) {
		userStartAudio().then(function() {
			music_file.play();
			music_fft.setInput(music_file);
			music_amp.setInput(music_file);
		});
		this.style.opacity = "1";
		icon.src = "../../assets/final/pause_icon.png";
	}
	else if (states.music_uploaded) {
		music_file.pause();
		this.style.opacity = ".6";
		icon.src = "../../assets/final/play_icon.png";
	}
	else {
		this.style.opacity = ".6";
	}
}

function upload_click_handler(e) {
	if (states.mic_on) states.mic_on = false;
	let up_container = document.getElementById("upload-container");
	up_container.style.display = "block";
}

function music_uploaded_callback(e) {
	states.music_uploaded = true;
	let up_icon = document.getElementById("upload-icon");
	up_icon.setAttribute('src', "../../assets/final/upload_icon_crimson.png");
}

function file_sub_click_handler(e) {
	let uploaded_file = document.getElementById("file-input").files[0];
	if (uploaded_file) {
		states.music_uploaded = false;
		let up_container = document.getElementById("upload-container");
		up_container.style.display = "none";
		let up_icon = document.getElementById("upload-icon");
		up_icon.setAttribute('src', "../../assets/final/upload_icon.png");
		
		music_file = new p5.SoundFile(uploaded_file, music_uploaded_callback);
		music_file.setLoop(true);
	}
}

function file_close_click_handler(e) {
	let up_container = document.getElementById("upload-container");
	up_container.style.display = "none";
}

function attach_tool_listeners() {
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

	let plays = document.getElementsByClassName("play-tool");
	for(let i = 0; i < plays.length; i++) {
		let play = plays[i];
		play.addEventListener('click', play_click_handler);
	}

	let uploads = document.getElementsByClassName("upload-tool");
	for(let i = 0; i < uploads.length; i++) {
		let up = uploads[i];
		up.addEventListener('click', upload_click_handler);
	}

	// let file_input = document.getElementById("file-input");
	// file_input.addEventListener('change', file_handler);
	let file_sub = document.getElementById("file-submit");
	file_sub.addEventListener('click', file_sub_click_handler);

	let close_input = document.getElementById("close-input");
	close_input.addEventListener('click', file_close_click_handler);
}

function start_tool() {
	attach_tool_listeners();

	let info = document.getElementById("app-info");
	info.style.display = "none";

	states.tool_started = true;

	loop();
}

function tutorial_click_handler(e) {
	let idx = -1;
	for(let i = 0; i < TUTORIAL_ITEMS.length; i++) {
		if (TUTORIAL_ITEMS[i] == this) {
			idx = i + 1;
			break;
		}
	}
	if (idx >= TUTORIAL_ITEMS.length) {
		start_tool();
	}
	else if (idx > 0) {
		TUTORIAL_ITEMS[idx - 1].style.display = "none";
		TUTORIAL_ITEMS[idx].style.display = "block";
	}
}

function skip_click_handler(e) {
	start_tool();
}

function attach_listeners() {
	TUTORIAL_ITEMS = document.getElementsByClassName("tutorial-item");
	for(let i = 0; i < TUTORIAL_ITEMS.length; i++) {
		TUTORIAL_ITEMS[i].addEventListener('click', tutorial_click_handler);
	}

	let skip_button = document.getElementById("skip");
	skip_button.addEventListener('click', skip_click_handler);
}

function setup() {
	states = {
		tool_started: false,
		clear_canvas: false,
		mic_on: false,
		music_uploaded: false,
		music_on: false,
		draw_started: false,
		download_canvas: false
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
	music_fft = new p5.FFT();
	music_amp = new p5.Amplitude();

	noLoop();
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
	if (states.clear_canvas) {
		background("#fff");
		states.clear_canvas = false;
	}
	if (states.download_canvas) {
		save("sonva.jpg");
		states.download_canvas = false;
	}
	if (states.mic_on || states.music_on) {
		let spectrum = undefined;
		let amp = undefined;
		if (states.mic_on) {
			spectrum = mic_fft.analyze();
			amp = mic.getLevel();
		}
		else if (states.music_on) {
			spectrum = music_fft.analyze();
			amp = music_amp.getLevel();
		}
		if (states.draw_started) {
			fill(0);
			let dy = find_arr_max(spectrum);
			if (last_pitch === undefined) last_pitch = dy;
			let pitch_min = parseInt(sliders.max_pencil_pitch.min);
			let pitch_max = parseInt(sliders.max_pencil_pitch.value);
			dy = constrain(dy, pitch_min, pitch_max);
			dy = map(dy, pitch_min, pitch_max, -10, 10);
			// let diff = dy - last_pitch;
			// last_pitch = dy;
			// dy = diff * pitch_max;
			// console.log(dy);


			let dx = parseInt(sliders.x_speed.value);
			let rate_min = parseInt(sliders.x_speed.min);
			let rate_max = parseInt(sliders.x_speed.max);
			let total = rate_max - rate_min;
			dx = map(dx, rate_min, rate_max, -total / 2, total / 2);
			
			let draw_size = map(amp, 0, 1, 
				parseInt(sliders.max_pencil_size.min), 
				parseInt(sliders.max_pencil_size.value));
			circle(draw_position.x, draw_position.y, draw_size);
			draw_position.x += dx;
			draw_position.y += dy;
		}
	}
}

function mousePressed() {
	if (states.mic_on || states.music_on) {
		states.draw_started = true;
		draw_position = {x: mouseX, y: mouseY};
	}
}

function mouseReleased() {
	if (states.draw_started) {
		states.draw_started = false;
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}



