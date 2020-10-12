/*
Project 1 for ART102MM
10/11/20
Code by Tina Shi
URL: https://tshiucsb.github.io/ART102MM_personal_site/html/project/project_1.html
*/

var colors = null;
var pre_shapes = null;
var post_shapes = null;
function Shape(type, x, y, w, h, fill_color, strk_color=null, strk_weight=null, blend=null) {
	this.type = type;
	this.x = Math.floor(x);
	this.y = Math.floor(y);
	this.w = Math.floor(w);
	this.h = Math.floor(h);
	this.fill_color = fill_color;
	this.strk_color = strk_color;
	this.strk_weight = Math.floor(strk_weight);
	this.blend = blend;
}

function init_shapes() {
	pre_shapes = {
		n_w_circle_br_outln: new Shape("circle", width * .1, height * .1,
			width * .12, null, colors.br, color(100, 80, 100), width * .03),

		n_w_circle_ltBl: new Shape("circle", width * .1, height * .1, 
			width * .05, null, colors.lt_bl, color(180, 180, 180), width * .006),

		n_w_circle_blk_l: new Shape("circle", width * .2, height * .2,
			width * .15, null, colors.blk, color(80, 80, 80), width * .02),

		n_w_circle_blk_m: new Shape("circle", width * .35, height * .3, 
			width * .06, null, colors.blk, color(200, 50, 50, 150), width * .02),

		n_w_circle_blk_s: new Shape("circle", width * .4, height * .33, 
			width * .04, null, colors.blk, color(200, 50, 50, 150), width * .02),

		n_w_circle_y: new Shape("circle", width * .46, height * .32, 
			width * .06, null, color(210, 220, 0), color(200, 50, 50, 150), width * .01),

		n_w_circle_pink: new Shape("circle", width * .12, height * .28, 
			width * .04, null, color(200, 100, 100), color(120, 120, 90), width * .006),
		
		n_w_circle_br: new Shape("circle", width * .17, height * .33, 
			width * .04, null, colors.br, color(150, 150, 100), width * .008),
		
		n_w_circle_r: new Shape("circle", width * .23, height * .35, 
			width * .04, null, colors.r, colors.br, width * .008),

		n_w_circle_pine: new Shape("circle", width * .21, height * .4, 
			width * .05, null, colors.pine, color(200, 50, 50, 150), width * .02),
		
		n_square_r: new Shape("square", width * .52, height * .2, 
			width * .08, null, colors.r, colors.blk, 1),

		n_e_circle_grey: new Shape("circle", width * .85, height * .1, 
			width * .07, null, color(40, 30, 30), colors.pale_pink, width * .005),
		
		n_e_circle_rose: new Shape("circle", width * .7, height * .3, 
			width * .25, null, color(230, 90, 90), colors.r, width * .025),

		w_circle_ltBl: new Shape("circle", width * .19, height * .55, 
			width * .06, null, colors.lt_bl, color(200, 50, 50, 150), width * .02),

		s_e_circle_blk_m: new Shape("circle", width * .65, height * .61, 
			width * .08, null, colors.blk, color(50, 50, 50, 150), width * .02),

		s_e_square_ora: new Shape("square", width * .78, height * .67, 
			width * .08, null, color(200, 100, 50)),

		s_e_circle_ltBl: new Shape("circle", width * .9, height * .68, 
			width * .05, null, colors.lt_bl, color(180, 180, 180), width * .006),

		s_e_circle_r_s: new Shape("circle", width * .95, height * .62, 
			width * .035, null, colors.r),

		s_e_circle_r_m: new Shape("circle", width * .88, height * .57, 
			width * .05, null, colors.r),

		e_circle_bl: new Shape("circle", width * .8, height * .55, 
			width * .035, null, colors.bl),

		s_e_circle_blk_s: new Shape("circle", width * .88, height * .74, 
			width * .04, null, colors.blk, color(100, 100, 200, 150), width * .01),

		s_circle_rose: new Shape("circle", width * .57, height * .7, 
			width * .12, null, color(150, 60, 80), colors.bg, width * .02),

		s_e_circle_pine: new Shape("circle", width * .75, height * .83, 
			width * .15, null, colors.pine, colors.pale_pink, width * .01),

		s_w_circle_blk: new Shape("circle", width * .37, height * .78, 
			width * .12, null, colors.blk, colors.pale_pink, width * .01),

		s_w_circle_bl: new Shape("circle", width * .36, height * .7, 
			width * .04, null, color(100, 100, 120)),

		s_w_circle_br: new Shape("circle", width * .15, height * .85, 
			width * .07, null, colors.br, color(180, 180, 180), width * .005),

		s_w_circle_g: new Shape("circle", width * .22, height * .88, 
			width * .05, null, colors.g, color(120, 120, 120), width * .002),

		s_w_circle_w: new Shape("circle", width * .13, height * .91, 
			width * .03, null, colors.w),
		
		w_square_bg: new Shape("square", width * .47, height * .95 / 2, 
			width * .3, null, colors.bg)
	};

	post_shapes = {
		n_w_circle_g: new Shape("circle", width * .4, height * .37, 
			width * .05, null, color(80, 100, 80)),

		n_w_circle_w_m: new Shape("circle", width * .47, height * .45, 
			width * .08, null, colors.w),

		n_w_circle_blk_s: new Shape("circle", width * .47, height * .455, 
			width * .015, null, colors.blk),

		n_w_circle_grey_m: new Shape("circle", width * .41, height * .456, 
			width * .07, null, color(180, 180, 180), null, null, "MULTIPLY"),

		w_circle_dkBl: new Shape("circle", width * .33, height * .45, 
			width * .1, null, color(50, 60, 100)),

		n_circle_r_burn: new Shape("circle", width * .5, height * .43, 
					width * .06, null, colors.r, null, null, "BURN"),

		n_circle_blk_m: new Shape("circle", width * .55, height * .43, 
			width * .075, null, colors.blk, color.blk, 1),

		n_circle_r_screen: new Shape("circle", width * .5, height * .43, 
			width * .06, null, colors.r, null, null, "SCREEN"),

		circle_br: new Shape("circle", width * .54, height * .48, 
			width * .03, null, color(50, 30, 30)),

		s_circle_g: new Shape("circle", width * .59, height * .49, 
			width * .03, null, colors.g),

		s_circle_y: new Shape("circle", width * .6, height * .57, 
			width * .025, null, color(150, 150, 50)),

		n_w_circle_blk_m: new Shape("circle", width * .43, height * .41, 
			width * .075, null, colors.blk),

		n_w_circle_w_s: new Shape("circle", width * .43, height * .39, 
			width * .015, null, colors.w),

		n_w_circle_warm_grey: new Shape("circle", width * .41, height * .41, 
			width * .025, null, color(150, 150, 130)),

		n_w_circle_grey_s: new Shape("circle", width * .445, height * .41, 
			width * .02, null, color(100, 100, 100)),

		n_w_circle_br: new Shape("circle", width * .47, height * .39, 
			width * .04, null, color(80, 30, 30), colors.blk, 1, "SCREEN"),

		s_w_circle_dkBr: new Shape("circle", width * .46, height * .53, 
			width * .15, null, color(35, 10, 30)),

		s_w_circle_ice: new Shape("circle", width * .36, height * .52, 
			width * .03, null, color(150, 200, 220)),

		s_w_circle_blk_xs: new Shape("circle", width * .35, height * .57, 
			width * .025, null, colors.blk),

		s_w_circle_blk_s: new Shape("circle", width * .4, height * .5, 
			width * .04, null, colors.blk)
	}
}

function draw_background() {
	background(colors.bg);
	noStroke();
	fill(colors.bg_quad);
	quad(Math.floor(width / 3), 0, width, Math.floor(height / 3), 
		Math.floor(width / 3 * 2), height, 0, Math.floor(height * .55));
	
	// let slope_1 = height * .45 / (width / 3 * 2);
	// let slope_2 = -height / 3 * 2 / (width / 3);
	// triangle(width * .2, width * .2 * slope_1 + height * .55, );

	fill(colors.bg_dark);
	beginShape();
	vertex(0, 0);
	vertex(Math.floor(width / 3), 0);
	let v = [{x: Math.floor(width * .2), y: Math.floor(height * .2)}, 
		{x: Math.floor(width * .25), y: width * .4}, {x: 0, y: Math.floor(height * .55)}];
	bezierVertex(v[0].x, v[0].y, v[1].x, v[1].y, v[2].x, v[2].y);
	endShape();

	beginShape();
	vertex(Math.floor(width / 3), 0);
	vertex(width, 0);
	vertex(width, height / 3);
	v = [{x: Math.floor(width * .8), y: Math.floor(height * .28)}, 
		{x: Math.floor(width * .55), y: Math.floor(height * .2)}, {x: Math.floor(width / 3), y: 0}];
	bezierVertex(v[0].x, v[0].y, v[1].x, v[1].y, v[2].x, v[2].y);
	endShape();
}

function draw_shapes(shapes) {
	for (const key in shapes) {
		let s = shapes[key];
		if (s.fill_color) {
			fill(s.fill_color);
		}
		else {
			noFill();
		}

		if (s.strk_color) {
			stroke(s.strk_color);
			if (s.strk_weight) {
				strokeWeight(s.strk_weight);
			}
		}
		else {
			noStroke();
		}

		if (s.blend == "OVERLAY") {
			blendMode(OVERLAY);
		}
		else if (s.blend == "SCREEN") {
			blendMode(SCREEN);
		}
		else if (s.blend == "BURN") {
			blendMode(BURN);
		}
		else if (s.blend == "DODGE") {
			blendMode(DODGE);
		}
		else if (s.blend == "MULTIPLY") {
			blendMode(MULTIPLY);
		}


		if (s.type == 'circle') {
			ellipse(s.x, s.y, s.w);
		}
		else if (s.type == "square") {
			rectMode(CENTER);
			square(s.x, s.y, s.w);
		}
		blendMode(BLEND);
	}
}

function setup() {
	colors = {
		bg: color(40, 50, 60),
		bg_quad: color(220, 160, 80),
		bg_dark: color(20, 30, 40),
		r: color(200, 50, 50),
		br: color(80, 50, 50),
		blk: color(0, 0, 0),
		pine: color(20, 50, 30),
		lt_bl: color(50, 100, 120),
		bl: color(80, 100, 120),
		g: color(45, 80, 50),
		pale_pink: color(180, 120, 120, 150),
		w: color(230, 230, 240)
	};
	let cnv = createCanvas(window.innerWidth / 2, 
		window.innerWidth / 2 / 475 * 600);
	cnv.position(window.innerWidth / 2, 0, "fixed");
	init_shapes();
}

function draw() {
	draw_background();
	draw_shapes(pre_shapes);
	draw_shapes(post_shapes);
}


