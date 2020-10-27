/*
Studio 6 for ART102MM
10/26/20
Code by Tina Shi
URL: https://tshiucsb.github.io/ART102MM_personal_site/html/studio/studio_6.html
*/

var table;

function preload() {
	// preload csv file w/ phone gyroscope and accelerometer recordings
	table = loadTable("../../assets/studio/studio_6/sample_csv.csv", 
		'csv', 'header');
}

function setup() {
	// create canvas to fill window
	createCanvas(windowWidth, windowHeight, WEBGL);
	background("#000");
}

function draw() {
	// loop through all rows
	for(let i = 0; i < table.getRowCount(); i++) {
		push();
		orbitControl();
		// rotate on x-axis based on alpha recording
		rotateX(table.getNum(i, "alpha"));
		// rotate on y-axis based on beta recording
		rotateY(table.getNum(i, "beta"));
		// rotate on z-axis based on gamma recording
		rotateZ(table.getNum(i, "gamma"));
		// map acceleration recordings on each axis to postiional coordinate
		// that fills canvas
		let x = map(table.getNum(i, "xAcc"), 0, 12, 0, width / 2);
		let y = map(table.getNum(i, "yAcc"), 0, 12, 0, width / 2);
		let z = map(table.getNum(i, "zAcc"), 0, 12, 0, height / 2);
		translate(x, y, z);
		normalMaterial();
		// draw box at position w/ specified rotation
		box();
		pop();
	}
}
