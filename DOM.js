// =========
// Glob Vars
// =========

"use strict";
var CELL_WIDTH  = 35,
	CELL_HEIGHT = 35,
	CELL_SCALE  = 2, // 1 cell = 2 meters squered
	px 			= 0, // +35 for each new grid point
	py 			= 35, // ^
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
	tempPoint,
	// isOrigin = true,
	originPoint;
	// endPoint;
	// originPoint;

// =========
// Classes
// =========

// Point Class
function Point(x, y, ref) {
	this.x   = x; 
	this.y   = y;
	this.hasWall = false;
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
for(var i = 0, cellYLength = round((y - 35) / CELL_HEIGHT); i < cellYLength; i++) {
	for(var j = 0, cellXLength = round((x - 35) / CELL_WIDTH); j < cellXLength; j++) {
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
paper.addEventListener("mousedown", findPoint, false);

d.addEventListener("keypress", function(e) {
	if(e.key === "r") {clearPrev(); return;}
	if(e.shiftKey && e.key === "R") {clearAll(); return;}
}, false);


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

// Implements logic
function findPoint(e) {
	if(e.buttons !== 1) { return; } // terminate if not LMB
	// save func reference for removeEventListener
	function rmFNP(e) {
		findNextPoint(e);
	}

	d.addEventListener("mousemove", rmFNP, false);

	// Terminates ...
	d.addEventListener("mouseup", function rmMU(e) {

		// closePath();

		// isOrigin 	= true;
		tempPoint	= null;
		originPoint = null;
		// endPoint 	= null;

		d.removeEventListener("mousemove", rmFNP);
		d.removeEventListener("mouseup", rmMU);
	}, false);

	return 0;
}

function findNextPoint(e) {
	var	endX = e.x || e.clientX,
		endY = e.y || e.clientY,
		col    = round(endY / 35) * 35 > 1 ? round(endY / 35) * 35 : 35,
		row    = round(endX / 35) * 35 > 1 ? round(endX / 35) * 35 : 35;

	if(col && ((endY >= col - 15 && endY <= col) || (endY <= col + 10 && endY >= col))) {
		if(row && ((endX >= row - 15 && endX <= row) || (endX <= row + 10 && endX >= row))) {


			var vec = {},
				point = new Point(row, col);

			if(point.ref.nodeName !== "svg" ) {

				point.ref[setAttr]("fill", "#404040");

				vec = tempPoint ? tempPoint.vector(point) : vec;
				// Linear Interpolation
				if (vec.x || vec.y) { updatePath(vec);}

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
	var d = "M",
		x1 = tempPoint.x, 
		y1 = tempPoint.y, 
		x2 = tempPoint.x + vec.x,
		y2 = tempPoint.y + vec.y;

	d += x1 + " " + y1 + " L" + x2 + " " + y2;

	paper.insertAdjacentElement("afterbegin", createPath(d));
}

function createPath(d) {
	var path = document[cSvgEl](xmlns, "path");

	addMultiAttr(path, [
	 {style: "d", val: d},
	 {style: "stroke", val: "#404040"},
	 {style: "stroke-width", val: "2"},
	 {style: "fill", val: "#404040"}
	 ]);

	return path;

}

function clearAll() {

	var all = Array.prototype.slice.call(d.querySelectorAll("path"));
	if (all.length) for (var i = 0, allL = all.length; i < allL; i++) {
		if(all[i].nodeName === "path") paper.removeChild(all[i]);
	}
}

function clearPrev() {

	var prev = paper.children[0];

	if(prev && prev.nodeName === "path") paper.removeChild(prev);

	return;
}
