/*
Project 2 for ART102MM
10/19/20
Code by Tina Shi
URL: https://tshiucsb.github.io/ART102MM_personal_site/html/project/project_2.html
*/

// variable for storing all data regarding robot
var hex_cat = null;

function init_hex_cat() {
	// initializes data stored in hex_cat
	hex_cat = {
		state: "OFF",
		pos_x: 0,
		pos_y: 0,
		w: 1000,
		h: 1000,
		scale: 1,
		face_x: 430,
		face_y: 220,
		face_w: 150,
		face_h: 120,
		// currently displayed image
		curr_img: null,
		// animation frame for keeping track of duration for states
		start_frame: null,
		// animation frame for keeping track of animation
		anim_frame: null,
		// index 0 is highlight color and index 1 is midtone color
		colors: [color(215, 19, 67), "#232323"],
		// object for storing preloaded images and the total number of frames for each state
		assets: {
			off: {
				count: 1
			},
			neutral: {
				count: 4
			},
			pet: {
				count: 4
			},
			displeased: {
				count: 1
			}
		},
		// object for storing miscellaneous values that needed to persist
		misc: {},
		// function for preloading images
		load_assets: function() {
			// loop through the states with specified assets and load the frames into an array
			for(const key in this.assets) {
				let arr = [];
				let path = "../../assets/project/project_2/"
				for(let i = 0; i < this.assets[key].count; i++) {
					arr.push(loadImage(`${path}${key}_${i + 1}.png`));
				}
				// array containing frames
				this.assets[key].img = arr;
				// index for keeping track of the frame that animation is on
				this.assets[key].idx = 0;
			}
		},
		// displays the animation frames in order after a certain number of frames has passed
		animate_frames: function(frame_time, asset, idx=null) {
			let curr_frame = frameCount;
			let elapsed = curr_frame - hex_cat.anim_frame;
			if (elapsed > frame_time) {
				let frames = asset.img;
				if (idx === null) {
					idx = asset.idx;
				}
				let total = frames.length;
				// update frame index
				// if the frame index is more than the number of frames available, go back to first frame
				asset.idx = (idx + 1) % total;
				hex_cat.curr_img = frames[asset.idx];
				hex_cat.anim_frame = curr_frame;
			}
		},
		// draw the power icon on the face of the cat
		draw_boot_icon: function(icon_color) {
			stroke(icon_color);
			strokeWeight(5);
			noFill();
			circle((this.face_x + this.face_w / 2 + this.pos_x) * this.scale, 
				(this.face_y + this.face_h / 2 + this.pos_y) * this.scale, 80 * this.scale);
			line((this.face_x + this.face_w / 2 + this.pos_x) * this.scale, 
				(this.face_y + this.face_h / 2 + this.pos_y - 20) * this.scale, 
				(this.face_x + this.face_w / 2 + this.pos_x) * this.scale,
				(this.face_y + this.face_h / 2 + this.pos_y - 60) * this.scale);
		},
		// if cursor is within face region, change state to "CAN BOOT"
		while_off: function() {
			let boot_color = hex_cat.colors[1];
			if (mouseX > (hex_cat.face_x + hex_cat.pos_x) * hex_cat.scale &&
				mouseX < (hex_cat.face_x + hex_cat.face_w + hex_cat.pos_x) * hex_cat.scale &&
				mouseY > (hex_cat.face_y + hex_cat.pos_y) * hex_cat.scale &&
				mouseY < (hex_cat.face_y + hex_cat.face_h + hex_cat.pos_y) * hex_cat.scale) {
				boot_color = hex_cat.colors[0];
				hex_cat.state = "CAN_BOOT";
				cursor(HAND);
			}
			else {
				hex_cat.state = "OFF";
				cursor(ARROW);
			}
			hex_cat.draw_boot_icon(boot_color);
		},
		// draw text on face region based on input argument
		draw_text: function(face_display) {
			fill(hex_cat.colors[0]);
			textAlign(CENTER);
			textSize(60 * hex_cat.scale);
			noStroke();
			text(face_display, (hex_cat.face_x + hex_cat.pos_x) * hex_cat.scale, 
					(hex_cat.face_y + hex_cat.face_h / 2 + hex_cat.pos_y) * hex_cat.scale,
					hex_cat.face_w * hex_cat.scale, hex_cat.face_h * hex_cat.scale);
		},
		// draw animation for face, ears, and tail tip to flash crimson 
		// and the transition to "NEUTRAL" state
		boot: function() {
			let curr_frame = frameCount;
			let elapsed = curr_frame - hex_cat.start_frame;
			let display_loading = false;
			// alternate between grey and crimson depending on elapsed frames
			if (elapsed < 20) {
				hex_cat.curr_img = hex_cat.assets.neutral.img[0];
			}
			else if (elapsed < 30) {
				hex_cat.curr_img = hex_cat.assets.off.img[0];
			}
			else if (elapsed < 40) {
				hex_cat.curr_img = hex_cat.assets.neutral.img[0];
			}
			else if (elapsed < 70) {
				hex_cat.curr_img = hex_cat.assets.off.img[0];
			}
			else if (elapsed < 80) {
				hex_cat.curr_img = hex_cat.assets.neutral.img[0];
			}
			else if (elapsed < 120) {
				hex_cat.curr_img = hex_cat.assets.off.img[0];
				display_loading = true;
			}
			else if (elapsed < 180) {
				hex_cat.curr_img = hex_cat.assets.neutral.img[0];
			}
			// transition to neutral
			else if (elapsed > 200) {
				display_loading = false;
				hex_cat.curr_img = hex_cat.assets.neutral.img[0];
				hex_cat.state = "NEUTRAL";
				hex_cat.start_frame = null;
				hex_cat.anim_frame = frameCount;
				cursor(ARROW);
			}
			// color in face region
			if (hex_cat.curr_img == hex_cat.assets.neutral.img[0]) {
				fill(hex_cat.colors[0]);
			}
			else {
				fill(hex_cat.colors[1]);
			}
			noStroke();
			rect((hex_cat.face_x + hex_cat.pos_x) * hex_cat.scale, 
				(hex_cat.face_y + hex_cat.pos_y) * hex_cat.scale,
				hex_cat.face_w * hex_cat.scale, hex_cat.face_h * hex_cat.scale);
			// display loading text on face
			if (display_loading) {
				fill(hex_cat.colors[0]);
				textAlign(CENTER);
				text("loading...", (hex_cat.face_x + hex_cat.pos_x) * hex_cat.scale, 
					(hex_cat.face_y + hex_cat.face_h / 2 + hex_cat.pos_y) * hex_cat.scale,
					hex_cat.face_w * hex_cat.scale, hex_cat.face_h * hex_cat.scale);
			}
		},
		// draw circle in face region that follows the cursor
		gaze: function() {
			let x = mouseX;
			let y = mouseY;
			// checks for if cursor is out of face region to make circle stay in bound
			if (x < (hex_cat.face_x + hex_cat.pos_x) * hex_cat.scale) {
				x = (hex_cat.face_x + hex_cat.pos_x) * hex_cat.scale;
			}
			else if (x > (hex_cat.face_x + hex_cat.face_w + hex_cat.pos_x) * hex_cat.scale) {
				x = (hex_cat.face_x + hex_cat.face_w + hex_cat.pos_x) * hex_cat.scale;
			}
			if (y < (hex_cat.face_y + hex_cat.pos_y) * hex_cat.scale) {
				y = (hex_cat.face_y + hex_cat.pos_y) * hex_cat.scale;
			}
			else if (y > (hex_cat.face_y + hex_cat.face_h + hex_cat.pos_y) * hex_cat.scale) {
				y = (hex_cat.face_y + hex_cat.face_h + hex_cat.pos_y) * hex_cat.scale;
			}
			// draw circle
			noFill();
			stroke(hex_cat.colors[0]);
			strokeWeight(5);
			circle(x, y, 20 * hex_cat.scale);
		},
		// draw displeased asset with face text :(( and then transition to "NEUTRAL" state
		disapprove: function() {
			let curr_frame = frameCount;
			let elapsed = curr_frame - hex_cat.start_frame;
			hex_cat.draw_text(":((");
			hex_cat.curr_img = hex_cat.assets.displeased.img[0];
			if (elapsed > 100) {
				hex_cat.start_frame = null;
				hex_cat.state = "NEUTRAL";
			}
		},
		// draw face text <3
		pet: function() {
			hex_cat.draw_text("<3");
		},
		// draw face text <3 and then transition to "SAD" state
		pet_more: function() {
			let curr_frame = frameCount;
			let elapsed = curr_frame - hex_cat.start_frame;
			hex_cat.draw_text("<3");
			if (elapsed > 100) {
				hex_cat.state = "SAD";
				hex_cat.start_frame = frameCount;
			}
		},
		// 
		sad: function() {
			let curr_frame = frameCount;
			let elapsed = curr_frame - hex_cat.start_frame;
			hex_cat.draw_text(";-;");
			if (elapsed > 100) {
				hex_cat.state = "NEUTRAL";
				hex_cat.start_frame = null;
			}
		}
	}
	// set position to center of canvas
	hex_cat.pos_x = windowWidth / 2 - hex_cat.w / 2 * hex_cat.scale;
	hex_cat.pos_y = windowHeight / 2 - hex_cat.h /2 * hex_cat.scale;
}

// initialzie hex_cat and preload assets
function preload() {
	init_hex_cat();
	hex_cat.load_assets();
	hex_cat.curr_img = hex_cat.assets.off.img[0];
}

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background("#fff");
	// draw hex_cat
	image(hex_cat.curr_img, hex_cat.pos_x, hex_cat.pos_y, 
		hex_cat.w * hex_cat.scale, hex_cat.h * hex_cat.scale);
	// call different behaviors based on hex_cat state
	if (hex_cat.state == "OFF" || hex_cat.state == "CAN_BOOT") {
		hex_cat.while_off();
	}
	else if (hex_cat.state == "BOOTING") {
		hex_cat.boot();
	}
	else if (hex_cat.state == "NEUTRAL") {
		hex_cat.gaze();
	}
	else if (hex_cat.state == "DISPLEASED") {
		hex_cat.disapprove();
	}
	else if (hex_cat.state == "PET") {
		hex_cat.pet();
	}
	else if (hex_cat.state == "PET_MORE") {
		hex_cat.pet_more();
	}
	else if (hex_cat.state == "SAD") {
		hex_cat.sad();
	}

	// play neutral animation
	if (hex_cat.state == "NEUTRAL") {
		hex_cat.animate_frames(10, hex_cat.assets.neutral);
	}
	// play pleased animation from petting
	else if (hex_cat.state == "PET" || hex_cat.state == "PET_MORE") {
		hex_cat.animate_frames(5, hex_cat.assets.pet);
	}

}

function mouseClicked() {
	// if mouse clicked in "CAN BOOT" state, transitoin to "BOOTING" state
	if (hex_cat.state == "CAN_BOOT") {
		hex_cat.state = "BOOTING";
		console.log("booting");
		hex_cat.start_frame = frameCount;
		cursor(WAIT);
	}
	// if mouse clicked in "NEUTRAL" state and is clicked in a crimson region
	// e.g. ears, collar, tail tip, transition to "DISPLEASED" state
	else if (hex_cat.state == "NEUTRAL") {
		let c1 = get(mouseX, mouseY);
		let c2 = hex_cat.colors[0];
		// check if the pixel at mouse click is crimson
		if (c1[0] == red(c2) && c1[1] == green(c2) && c1[2] == blue(c2) && c1[3] != 0) {
			hex_cat.state = "DISPLEASED";
			hex_cat.start_frame = frameCount;
		}
	}
}

// if mouse if pressed down, record pressed position
function mousePressed() {
	hex_cat.misc["mouse_down_x"] = mouseX;
	hex_cat.misc["mouse_down_y"] = mouseY;
}

function mouseDragged() {
	// if the drag started at a black pixel, the cursor is currently on a black pixel,
	// and there is at least some mouse movement in either the x or y direcction
	// transition to "PET" state
	let is_curr_mouse_black = false;
	let is_down_mouse_black = false;
	let md_c = get(hex_cat.misc["mouse_down_x"], hex_cat.misc["mouse_down_y"]);
	let curr_c = get(mouseX, mouseY);
	let dx = 1 * hex_cat.scale;
	let dy = 1 * hex_cat.scale;
	if (md_c[0] == 0 && md_c[1] == 0 && md_c[2] == 0 && md_c[3] != 0) {
		is_down_mouse_black = true;
	}
	if (curr_c[0] == 0 && curr_c[1] == 0 && curr_c[2] == 0 && curr_c[3] != 0) {
		is_curr_mouse_black = true;
	}
	if (is_curr_mouse_black && is_down_mouse_black 
		&& (movedX > dx || movedY > dy)) {
		hex_cat.state = "PET";
	}
	// if no longer detected as petting and current state is "PET"
	// transition to "PET_MORE" state
	else if (hex_cat.state == "PET") {
		hex_cat.state =  "PET_MORE";
		hex_cat.start_frame = frameCount;
	}
}

function mouseReleased() {
	// if mouse is released from petting, transition to "PET_MORE" state
	if (hex_cat.state == "PET") {
		hex_cat.state =  "PET_MORE";
		hex_cat.start_frame = frameCount;
	}
}

function windowResized() {
	// reposition hex_cat to center of canvas if window resized
	resizeCanvas(windowWidth, windowHeight);
	hex_cat.pos_x = windowWidth / 2 - hex_cat.w / 2 * hex_cat.scale;
	hex_cat.pos_y = windowHeight / 2 - hex_cat.h /2 * hex_cat.scale;
}

// on window load event, allow info panel to expand and hide on click
window.addEventListener('load', function() {
	var info = document.getElementById("info");
	var is_displayed = true;
	info.addEventListener('click', function() {
		if (is_displayed) {
			info.style.height = "14px";
			is_displayed = false;
		}
		else {
			info.style.height = "initial";
			is_displayed = true;
		}
	});
});

