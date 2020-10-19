/*
Project 2 for ART102MM
10/19/20
Code by Tina Shi
URL: https://tshiucsb.github.io/ART102MM_personal_site/html/project/project_2.html
*/

// variable for storing all data regarding robot
var hex_cat = null;

function init_hex_cat() {
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
		curr_img: null,
		start_frame: null,
		anim_frame: null,
		colors: [color(215, 19, 67), "#232323"],
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
		misc: {},
		load_assets: function() {
			for(const key in this.assets) {
				let arr = [];
				let path = "../../assets/project/project_2/"
				for(let i = 0; i < this.assets[key].count; i++) {
					arr.push(loadImage(`${path}${key}_${i + 1}.png`));
				}
				this.assets[key].img = arr;
				this.assets[key].idx = 0;
			}
		},
		animate_frames: function(frame_time, asset, idx=null) {
			let curr_frame = frameCount;
			let elapsed = curr_frame - hex_cat.anim_frame;
			if (elapsed > frame_time) {
				let frames = asset.img;
				if (idx === null) {
					idx = asset.idx;
				}
				let total = frames.length;
				asset.idx = (idx + 1) % total;
				hex_cat.curr_img = frames[asset.idx];
				hex_cat.anim_frame = curr_frame;
			}
		},
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
		draw_text: function(face_display) {
			fill(hex_cat.colors[0]);
			textAlign(CENTER);
			textSize(60 * hex_cat.scale);
			noStroke();
			text(face_display, (hex_cat.face_x + hex_cat.pos_x) * hex_cat.scale, 
					(hex_cat.face_y + hex_cat.face_h / 2 + hex_cat.pos_y) * hex_cat.scale,
					hex_cat.face_w * hex_cat.scale, hex_cat.face_h * hex_cat.scale);
		},
		boot: function() {
			let curr_frame = frameCount;
			let elapsed = curr_frame - hex_cat.start_frame;
			let display_loading = false;
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
			else if (elapsed > 200) {
				display_loading = false;
				hex_cat.curr_img = hex_cat.assets.neutral.img[0];
				hex_cat.state = "NEUTRAL";
				hex_cat.start_frame = null;
				hex_cat.anim_frame = frameCount;
				cursor(ARROW);
			}
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
			if (display_loading) {
				fill(hex_cat.colors[0]);
				textAlign(CENTER);
				text("loading...", (hex_cat.face_x + hex_cat.pos_x) * hex_cat.scale, 
					(hex_cat.face_y + hex_cat.face_h / 2 + hex_cat.pos_y) * hex_cat.scale,
					hex_cat.face_w * hex_cat.scale, hex_cat.face_h * hex_cat.scale);
			}
		},
		gaze: function() {
			let x = mouseX;
			let y = mouseY;
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
			hex_cat.misc.gaze_x = x;
			hex_cat.misc.gaze_y = y;
			noFill();
			stroke(hex_cat.colors[0]);
			strokeWeight(5);
			circle(x, y, 20 * hex_cat.scale);
		},
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
		pet: function() {
			hex_cat.draw_text("<3");
		},
		pet_more: function() {
			let curr_frame = frameCount;
			let elapsed = curr_frame - hex_cat.start_frame;
			hex_cat.draw_text("<3");
			if (elapsed > 100) {
				hex_cat.state = "SAD";
				hex_cat.start_frame = frameCount;
			}
		},
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
	hex_cat.pos_x = windowWidth / 2 - hex_cat.w / 2 * hex_cat.scale;
	hex_cat.pos_y = windowHeight / 2 - hex_cat.h /2 * hex_cat.scale;
}

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
	image(hex_cat.curr_img, hex_cat.pos_x, hex_cat.pos_y, 
		hex_cat.w * hex_cat.scale, hex_cat.h * hex_cat.scale);
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

	if (hex_cat.state == "NEUTRAL") {
		hex_cat.animate_frames(10, hex_cat.assets.neutral);
	}
	else if (hex_cat.state == "PET" || hex_cat.state == "PET_MORE") {
		hex_cat.animate_frames(5, hex_cat.assets.pet);
	}

}

function mouseClicked() {
	if (hex_cat.state == "CAN_BOOT") {
		hex_cat.state = "BOOTING";
		console.log("booting");
		hex_cat.start_frame = frameCount;
		cursor(WAIT);
	}
	else if (hex_cat.state == "NEUTRAL") {
		let c1 = get(mouseX, mouseY);
		let c2 = hex_cat.colors[0];
		if (c1[0] == red(c2) && c1[1] == green(c2) && c1[2] == blue(c2) && c1[3] != 0) {
			hex_cat.state = "DISPLEASED";
			hex_cat.start_frame = frameCount;
		}
	}
}

function mousePressed() {
	hex_cat.misc["mouse_down_x"] = mouseX;
	hex_cat.misc["mouse_down_y"] = mouseY;
}

function mouseDragged() {
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
	if (hex_cat.state == "NEUTRAL" && is_curr_mouse_black && is_down_mouse_black 
		&& (movedX > dx || movedY > dy)) {
		hex_cat.state = "PET";
	}
	else if (hex_cat.state == "PET") {
		hex_cat.state =  "PET_MORE";
		hex_cat.start_frame = frameCount;
	}
}

