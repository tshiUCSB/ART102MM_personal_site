/*
Writing 1 for ART102MM
10/14/20
Code by Tina Shi
URL: https://tshiucsb.github.io/ART102MM_personal_site/html/writing/writing_1.html
*/

/*
New media looks to past assets as content and seek to present them in more
accessible, interactive, and immersive forms granted by technological and
computational advances, where computer scientists are simultaneously artists
*/

// variables for storing content-related data, fonts, and list of font names
var content = null;
var fonts = null;
var font_names = null;

// initialize content-related data specifying the paragraph split, position, 
// and optionally font, fill color, and font size
function init_content() {
	content = [
		{
			text: "New media looks to",
			x: 48,
			y: 48
		},
		{
			text: "past assets",
			font: "rm_typerighter",
			fill: "#8f8f8f",
			x: 48,
			y: 96,
			size: 72
		},
		{
			text: "as content",
			x: 96,
			y: 130,
			size: 24
		},
		{
			text: "and seek to present them in more",
			x: 225,
			y: 135
		},
		{
			text: "accessible",
			font: "SourceCodePro-ExtraLight",
			fill: "#0000ff",
			x: 72,
			y: 210,
			size: 85
		},
		{
			text: "interactive",
			// fill: "#ffff00",
			x: 140,
			y: 310,
			size: 96
		},
		{
			text: "immersive",
			x: 200,
			y: 430,
			size: 96,
			font: "BEYNO"
		},
		{
			text: "forms granted by technological and computational advances",
			x: 100,
			y: 550
		},
		{
			text: "where",
			x: 100,
			y: 700
		},
		{
			text: "computer scientists",
			x: 250,
			y: 700
		},
		{
			text: "are simultaneously",
			x: 100,
			y: 748
		},
		{
			text: "artists",
			x: 500,
			y: 748
		}
	]
}

function preload() {
	// list specifying file names for fonts
	let font_list = ["BEYNO.otf", "SFCompactDisplay-Ultralight.otf", "SourceCodePro-ExtraLight.otf", 
		"rm_typerighter.ttf"];
	fonts = {};
	font_names = [];
	// load font files with their name as key in fonts and store names also in font_names
	for(let i = 0; i < font_list.length; i++) {
		let name = font_list[i].split('.')[0]; 
		fonts[name] = loadFont(`../../assets/fonts/${font_list[i]}`);
		font_names.push(name);
	}
}

function setup() {
	// create canvas to fill window
	createCanvas(windowWidth, windowHeight);
	// initialize content data
	init_content();
}

function draw() {
	// fill background with white
	background("#000");
	// loop through all items in content and draw the text to canvas
	for(let i = 0; i < content.length; i++) {
		let tmp = content[i];
		if ("font" in tmp) textFont(fonts[tmp.font]);
		else textFont(fonts["SFCompactDisplay-Ultralight"]);
		if ("fill" in tmp) fill(tmp.fill);
		else fill("#fff");
		if ("size" in tmp) textSize(tmp.size);
		else textSize(48);
		text(tmp.text, tmp.x, tmp.y, width - 48, height - 48);
	}
	// by a 5% chance, swap "computer scientists" and "artists"
	if (Math.random() < .05) {
		swap_text(content[content.length - 3], content[content.length - 1]);
	}
	// if mouse is over "interactive", change cursor to hand
	if (mouseX > 140 && mouseX < 140 + 430 && mouseY > 310 && mouseY < 310 + 96) {
		cursor(HAND);
	}
	else {
		cursor(ARROW);
	}
	// by a 2.5% chance, change "immersive" to a different font
	if (Math.random() < .025) {
		let new_font = random(font_names);
		// if the randomly chosen font is the current font, pick another one until a different one is picked
		while(new_font == content[6].font) {
			new_font = random(font_names);
		}
		content[6].font = new_font;
	}
	// draw a line under "accessible" so it looks like a hyperlink
	stroke(content[4].fill);
	strokeWeight(3);
	line(content[4].x, content[4].y + content[4].size, content[4].x + 500, content[4].y + content[4].size);
	noStroke();
}

// for 2 content object, swap their text fields
function swap_text(content1, content2) {
	let tmp = content1.text;
	content1.text = content2.text;
	content2.text = tmp;
}

function mouseClicked() {
	// if mouse is clicked and mouse is over "interactive", change the font of "interactive"
	if (mouseX > 140 && mouseX < 140 + 430 && mouseY > 310 && mouseY < 310 + 96) {
		let new_font = random(font_names);
		// if the randomly selected font is the current font, pick another one until a different one is picked
		while(new_font == content[5].font) {
			new_font = random(font_names);
		}
		content[5].font = new_font;
	}
}


