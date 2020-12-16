/*
Final Project for ART102MM
12/09/20
Code by Tina Shi
URL: https://tshiucsb.github.io/ART102MM_personal_site/html/final/final_4.html
*/

var TUTORIAL_ITEMS = undefined;

// map for mapping DOM ID to Tool object
var tool_dict = undefined;
var selected_tool = null;
// object for storing the current states
var states = undefined;
var draw_position = undefined;
// variables for p5 audio input object
var mic = null;
var mic_fft = null;
var last_pitch = undefined;
// map to different slider DOM objects
var sliders = undefined;
// variables for p5 sound file object
var music_file = undefined;
var music_fft = null;
var music_amp = null;

// constructor for Tool object
function Tool(element, secondary=null) {
	// tool icon button DOM element
	this.element = element;
	this.selected = false;
	// container for secondary interface
	this.secondary = secondary;
}

// handler for when a primary tool is clicked
function tool_click_handler(e) {
	// set state for clear canvas tool
	if (this.id == "clear-tool") {
		states.clear_canvas = true;
		return;
	}
	// iterate through all primary tools and unselect all
	for(const key in tool_dict) {
		tool = tool_dict[key];
		tool.selected = false;
		tool.element.style.opacity = ".6";
		if (tool.secondary)
			tool.secondary.style.visibility = "hidden";
	}
	// select the selected tool if it isn't selected
	clicked_tool = tool_dict[this.id];
	clicked_tool.selected = !(clicked_tool.selected);
	selected_tool = clicked_tool;
	this.style.opacity = clicked_tool.selected ? "1" : ".6";
	// display the primary tool's corresponding secondary interface
	// if there is one
	if (clicked_tool.secondary) {
		clicked_tool.secondary.style.visibility = 
			clicked_tool.selected ? "visible" : "hidden";
	}

	// set state for download tool if it is selected
	if (this.id == "download-tool") {
		states.download_canvas = true;
	}
}

// sets up input and fft for mic if mic tool is selected
// or stop the mic if mic tool is deselected
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

// plays the uploaded music file if it's not playing
// or pauses the music if it is playing when the play tool is selected
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

// displays the file upload interface
function upload_click_handler(e) {
	if (states.mic_on) states.mic_on = false;
	let up_container = document.getElementById("upload-container");
	up_container.style.display = "block";
}

// changes the upload icon to indicate uploaded file is ready to play
function music_uploaded_callback(e) {
	states.music_uploaded = true;
	let up_icon = document.getElementById("upload-icon");
	up_icon.setAttribute('src', "../../assets/final/upload_icon_crimson.png");
}

// load the uploaded music file when the submit button is clicked
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

// closes the upload interface
function file_close_click_handler(e) {
	let up_container = document.getElementById("upload-container");
	up_container.style.display = "none";
}

// attaches listeners to all tools in toolbar
function attach_tool_listeners() {
	// primary tools
	let tools = document.getElementsByClassName("primary-tool");
	for(let i = 0; i < tools.length; i++) {
		let tool = tools[i];
		let secondary = document.getElementById(tool.id + "-secondary");
		tool_dict[tool.id] = new Tool(tool, secondary);
		tool.addEventListener('click', tool_click_handler);
	}

	// mic tool
	let mics = document.getElementsByClassName("mic-tool");
	for(let i = 0; i < mics.length; i++) {
		let mic = mics[i];
		mic.addEventListener('click', mic_click_handler);
	}

	// play tool
	let plays = document.getElementsByClassName("play-tool");
	for(let i = 0; i < plays.length; i++) {
		let play = plays[i];
		play.addEventListener('click', play_click_handler);
	}

	// upload tool
	let uploads = document.getElementsByClassName("upload-tool");
	for(let i = 0; i < uploads.length; i++) {
		let up = uploads[i];
		up.addEventListener('click', upload_click_handler);
	}

	// submit button for uploaded file
	let file_sub = document.getElementById("file-submit");
	file_sub.addEventListener('click', file_sub_click_handler);

	// close button for upload interface
	let close_input = document.getElementById("close-input");
	close_input.addEventListener('click', file_close_click_handler);
}

// activate tools to be functional
function start_tool() {
	attach_tool_listeners();

	let info = document.getElementById("app-info");
	info.style.display = "none";

	states.tool_started = true;

	loop();
}

// displays next tutorial item when a tutorial item is clicked on
function tutorial_click_handler(e) {
	let idx = -1;
	// find the current tutorial item that is clicked on
	for(let i = 0; i < TUTORIAL_ITEMS.length; i++) {
		if (TUTORIAL_ITEMS[i] == this) {
			idx = i + 1;
			break;
		}
	}
	// activate tools if no more tutorial available
	if (idx >= TUTORIAL_ITEMS.length) {
		start_tool();
	}
	// otherwise retrieve next tutorial item
	else if (idx > 0) {
		TUTORIAL_ITEMS[idx - 1].style.display = "none";
		TUTORIAL_ITEMS[idx].style.display = "block";
	}
}

// activate tools if user skips tutorial
function skip_click_handler(e) {
	start_tool();
}

// attach listeners for tutorial and skip
function attach_listeners() {
	TUTORIAL_ITEMS = document.getElementsByClassName("tutorial-item");
	for(let i = 0; i < TUTORIAL_ITEMS.length; i++) {
		TUTORIAL_ITEMS[i].addEventListener('click', tutorial_click_handler);
	}

	let skip_button = document.getElementById("skip");
	skip_button.addEventListener('click', skip_click_handler);
}

function setup() {
	// initialize all states to false
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
	// initalize all sliders to map
	sliders = {
		x_speed: document.getElementById("x_speed_slider"),
		max_pencil_size: document.getElementById("max_pencil_size_slider"),
		max_pencil_pitch: document.getElementById("max_pencil_pitch_slider")
	};

	// set up canvas
	let cnv = createCanvas(windowWidth, windowHeight);
	cnv.parent("p5-container");
	background("#fff");

	// set up mic, FFT, and sound objects
	mic = new p5.AudioIn();
	mic_fft = new p5.FFT();
	music_fft = new p5.FFT();
	music_amp = new p5.Amplitude();

	noLoop();
}

// helper for find the index of the max element in an array
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
	// clears canvas by refilling background
	if (states.clear_canvas) {
		background("#fff");
		states.clear_canvas = false;
	}
	// enables download
	if (states.download_canvas) {
		save("sonva.jpg");
		states.download_canvas = false;
	}
	// if there is a sound source playing
	if (states.mic_on || states.music_on) {
		// get frequency spectrum and amplitude depending on the sound source
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
		// if currently drawing
		if (states.draw_started) {
			fill(0);
			// get the bin for the most pominent frequency and map it based on its slider values
			let dy = find_arr_max(spectrum);
			if (last_pitch === undefined) last_pitch = dy;
			let pitch_min = parseInt(sliders.max_pencil_pitch.min);
			let pitch_max = parseInt(sliders.max_pencil_pitch.value);
			dy = constrain(dy, pitch_min, pitch_max);
			// set change in y based on frequency value
			dy = map(dy, pitch_min, pitch_max, -10, 10);

			// set change in x based on the slider values
			let dx = parseInt(sliders.x_speed.value);
			let rate_min = parseInt(sliders.x_speed.min);
			let rate_max = parseInt(sliders.x_speed.max);
			let total = rate_max - rate_min;
			dx = map(dx, rate_min, rate_max, -total / 2, total / 2);
			
			// set the brush size based on the amplitude mapping to the slider values
			let draw_size = map(amp, 0, 1, 
				parseInt(sliders.max_pencil_size.min), 
				parseInt(sliders.max_pencil_size.value));

			// draw onto canvas
			circle(draw_position.x, draw_position.y, draw_size);
			
			// update the brush position
			draw_position.x += dx;
			draw_position.y += dy;
		}
	}
}

function mousePressed() {
	// start drawing if there is a sound source playing and the mouse is pressed
	if (states.mic_on || states.music_on) {
		states.draw_started = true;
		// start at the current mouse position
		draw_position = {x: mouseX, y: mouseY};
	}
}

function mouseReleased() {
	// stop drawing when mouse is released
	if (states.draw_started) {
		states.draw_started = false;
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}



