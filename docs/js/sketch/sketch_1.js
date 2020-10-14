/*
Sketch 1 for ART102MM
10/13/20
Code by Tina Shi
URL: https://tshiucsb.github.io/ART102MM_personal_site/html/sketch/sketch_1.html
*/

// variable for storing starting vertex of each bezier curve
var start_vertex = null;
// variable for storing controls for color-lerping when drawing bezier curves
var bezier_color = null;

// object constructor for an object storing color-lerping controls
function Color_lerp(c1, c2, amt, damt) {
	// color to lerp from, color to lerp to, lerp amout, change in lerp amout
	this.c1 = c1;
	this.c2 = c2;
	this.amt = amt;
	this.damt = damt;
}

// randomly generates 4 vertices for a bezier curve based on the starting vertex
function generate_vertices(start, min_dx, max_dx, min_dy, max_dy, min_x, max_x, min_y, max_y) {
	// array for storing vertices
	let v = [start];
	// generate 3 more vertices aside from the starting vertex
	for(let i = 1; i < 4; i++) {
		// randomly generate the change in x and the change in y based on the bounds given by input
		let dx = random(min_dx, max_dx) * random([-1, 1]);
		let dy = random(min_dy, max_dy) * random([-1, 1]);
		// if the resulting x or y coordinate exceeds the position boundary given by input
		// set the exceeding coordinate to the position boundary so it doesn't go over bound
		if (v[i - 1].x + dx < min_x) {
			dx = min_x - v[i - 1].x;
		}
		else if (v[i - 1].x + dx > max_x) {
			dx = max_x - v[i - 1].x;
		}
		if (v[i - 1].y + dy < min_y) {
			dy = min_y - v[i - 1].y;
		}
		else if (v[i - 1].y + dy > max_y) {
			dy = max_y - v[i - 1].y;
		}
		// add the newly generated vertex to the array of vertices
		v.push({x: v[i - 1].x + dx, y: v[i - 1].y + dy});
	}
	return v;
}

function setup() {
	// create the canvas to fill window
	createCanvas(windowWidth, windowHeight);
	// set background to white
	background("#fff");
	// initialize starting vertex and color controls for lerping
	start_vertex = {x: random(width * .25, width * .75), y: random(height * .25, height * .75)};
	bezier_color = new Color_lerp(color(0, 0, 0), color(19, 190, 215), 0, random(.005, .01));
}

function draw() {
	// generates bezier vertices based on starting vertex
	// each vertex cannot be less than 1% and more than 10% of the canvas width away horizontally
	// from the previous vertex
	// and each vertex cannot be less than 1% and more than 10% of the canvas height away vertically
	// from the previous vertex
	let v = generate_vertices(start_vertex, width * .01, width * .1, height * .01, height * .1, 
		20, width - 20, 20, height - 20);
	// update the start vertex for the next bezier curve to be the end vertex of the current bezier
	start_vertex = v[3];
	// get the stroke color based on info in bezier_color
	let c = lerpColor(bezier_color.c1, bezier_color.c2, bezier_color.amt);
	// update the lerp amount by the change in lerp amount
	bezier_color.amt += bezier_color.damt;
	// if lerp amount exceeds its max, set it to max and set change in lerp amount to negative
	if (bezier_color.amt > 1) {
		bezier_color.amt = 1;
		bezier_color.damt *= -1;
	}
	// else if lerp amount is below min, set it to min and set chang in lerp amount to positive
	else if (bezier_color.amt < 0) {
		bezier_color.amt = 0;
		bezier_color.damt *= -1;
	}
	// draw bezier curve based on generated vertices
	noFill();
	strokeWeight(3);
	stroke(c);
	bezier(v[0].x, v[0].y, v[1].x, v[1].y, v[2].x, v[2].y, v[3].x, v[3].y);
}

