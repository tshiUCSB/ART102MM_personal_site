/*
Studio 1 for ART102MM
10/14/20
Code by Tina Shi
URL: https://tshiucsb.github.io/ART102MM_personal_site/html/writing/writing_1.html
*/

/*
New media looks to past assets as content and seek to present them in more
accessible, interactive, and immersive forms granted by technological and
computational advances, where computer scientists are simultaneously artists
*/

var text_content = ["New media looks to", "past assets", "as content and seek to present them in more", 
	"accessible", "interactive", "and", "immersive", "forms granted by technological and", 
	"computational", "advances, where", "scientists", "simultaneously become", "artists"];
var content = null;
var fonts = null;
var font_names = null;

function init_content(text) {
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
	let font_list = ["BEYNO.otf", "SFCompactDisplay-Ultralight.otf", "SourceCodePro-ExtraLight.otf", 
		"rm_typerighter.ttf"];
	fonts = {};
	font_names = [];
	for(let i = 0; i < font_list.length; i++) {
		let name = font_list[i].split('.')[0]; 
		fonts[name] = loadFont(`../../assets/fonts/${font_list[i]}`);
		font_names.push(name);
	}
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	init_content(text_content);
}

function draw() {
	background("#000");
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
	if (Math.random() < .05) {
		swap_text(content[content.length - 3], content[content.length - 1]);
	}
	if (mouseX > 140 && mouseX < 140 + 430 && mouseY > 310 && mouseY < 310 + 96) {
		cursor(HAND);
	}
	else {
		cursor(ARROW);
	}
	if (Math.random() < .025) {
		let new_font = random(font_names);
		while(new_font == content[6].font) {
			new_font = random(font_names);
		}
		content[6].font = new_font;
	}
	stroke(content[4].fill);
	strokeWeight(3);
	line(content[4].x, content[4].y + content[4].size, content[4].x + 500, content[4].y + content[4].size);
	noStroke();
}

function swap_text(content1, content2) {
	let tmp = content1.text;
	content1.text = content2.text;
	content2.text = tmp;
}

function mouseClicked() {
	if (mouseX > 140 && mouseX < 140 + 430 && mouseY > 310 && mouseY < 310 + 96) {
		let new_font = random(font_names);
		while(new_font == content[5].font) {
			new_font = random(font_names);
		}
		content[5].font = new_font;
	}
}


