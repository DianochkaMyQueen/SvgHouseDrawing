// # Створити схему будинку

// ---  ------------------
// |		|			  | 
// |		#			  |
// |		|------  ------|
// |					   |
// |--   --|--- ---|--- ---| 
// |		#		#		|
// |		|		|		|
// |		|		|		|
// ---###-------------------

// # Позначити назву кожної кімнати

// ---  ------------------
// |		|			  | 
// |		#	Kitchen	  |
// |		|------  ------|
// |	holl			   |
// |--   --|--- ---|--- ---| 
// |		#		#		|
// | Garage|  BR	|  BaR	|
// |		|		|		|
// ---###-------------------

// # Структура Сайту

// Home >> Demo >> Try It


// # Інтерфейси

// ??? 1. Консоль >> виводить допоміжні повідомлення з посиланнями на об*єкт
// 2. Режими  >> Edit & Live
// 3. 


// =========
// Glob Vars
// =========
	// Grid


"use strict";
var CELL_WIDTH  = 50,
	CELL_HEIGHT = 50,
	CELL_SCALE  = 2, // 1 cell = 2 meters squered
	px 			= 0, // +50 for each new grid point
	py 			= 50, // ^
	// Document size
	w 			= window,
    d 			= document,
    e 			= d.documentElement,
    g 			= d.getElementsByTagName('body')[0],
    x 			= (w.innerWidth || e.clientWidth || g.clientWidth),
    y 			= (w.innerHeight|| e.clientHeight|| g.clientHeight),
    // Document Methods
    m 			= Math,
    round 		= m.round,
    setAttr 	= "setAttribute",
    // SVG
    paper 		= d.querySelector("#paper"),
    xmlns 		= "http://www.w3.org/2000/svg",
    cSvgEl 		= "createElementNS",
	fr 			= d.createDocumentFragment(),
	tempPoint;

// =========
// Classes
// =========

// Point Class
function Point(x, y, ref) {
	this.x   = x; 
	this.y   = y;
	this.ref = d.elementFromPoint(this.x, this.y);

	return this;
}

Point.prototype.vector = function(p2) {
	var v = {};
	v.x   = p2.x - this.x;
	v.y   = p2.y - this.y;

	return v;
}

function initGrid() {

// Create pointed grid
for(var i = 0, cellYLength = round((y - 50) / CELL_HEIGHT); i < cellYLength; i++) {
	for(var j = 0, cellXLength = round((x - 50) / CELL_WIDTH); j < cellXLength; j++) {
		fr.appendChild(createPointRef(px+= CELL_WIDTH, py));
	}
	py+= CELL_HEIGHT; // increment for next column & reset start value of the last row point
	px = 0;
}
paper.appendChild(fr);
 
} initGrid();


// =========
// Events
// =========
d.addEventListener("mousedown", findPoint, false);

// =========
// Methods
// =========

function createPointRef(x, y) {
	
	var c = d[cSvgEl](xmlns, "circle");
	c[setAttr]("cx", x);
	c[setAttr]("cy", y);
	c[setAttr]("r", 2);
	c[setAttr]("fill", "#1a1a1a");

	return c;
}

// Implements logic for ...
function findPoint(e) {
	if(e.buttons !== 1) { return; } // terminate if not LMB

	// save func reference for removeEventListener
	function rmFNP(e) {
		findNextPoint(e);
	}

	d.addEventListener("mousemove", rmFNP, false);

	// Terminates ...
	d.addEventListener("mouseup", function rmMU(e) {
		tempPoint = null;
		d.removeEventListener("mousemove", rmFNP);
		d.removeEventListener("mouseup", rmMU);
	}, false);

	return 0;
}

function findNextPoint(e) {
	var	endX = e.x || e.clientX,
		endY = e.y || e.clientY,
		col    = round(endY / 50) * 50 > 1 ? round(endY / 50) * 50 : 50,
		row    = round(endX / 50) * 50 > 1 ? round(endX / 50) * 50 : 50;

	if(col && ((endY >= col-15 && endY <= col) || (endY <= col+10 && endY >= col))) {
		if(row && ((endX >= row - 15 && endX <= row) || (endX <= row+10 && endX >= row))) {

			var vec = {},
				point = new Point(row, col);

			if(point.ref.nodeName !== "svg" && point.ref.attributes.fill.nodeValue !== "red") {

				point.ref[setAttr]("fill", "red");
				vec = tempPoint ? tempPoint.vector(point) : vec;
				// Linear Interpolation
				if (vec.x || vec.y) { updatePath(vec); }

				// Reset
				tempPoint = vec ? point : tempPoint;
				point = null;
				vec = null;
			}
		}
	}
	return 0;
}

function calcVector(v) {



}

function addMultiAttr(el, arr) {
	if (!el || !arr) return;
	arr.forEach(function(attr) {
		el[setAttr](attr.style, attr.val);
	});
	return;
}

function updatePath(vec) {
	var path = document[cSvgEl](xmlns, "path"),
	d = "M",
	x1 = tempPoint.x, 
	y1 = tempPoint.y, 
	x2 = tempPoint.x + vec.x,
	y2 = tempPoint.y + vec.y;

	d += x1 + " " + y1 + " L" + x2 + " " + y2;

	addMultiAttr(path, [
	 {style: "d", val: d},
	 {style: "stroke", val: "red"},
	 {style: "stroke-width", val: "1"},
	 {style: "fill", val: "red"}
	 ]);

	paper.insertAdjacentElement("afterbegin", path);
}