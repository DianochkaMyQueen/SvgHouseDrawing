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
var CELL_WIDTH = 50,
	CELL_HEIGHT = 50,
	CELL_SCALE = 2, // 1 cell = 2 meters squered
	px = 0, // +50 for each new grid point
	py = 50, // +50 for each new grid point
	// Document size
	w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = (w.innerWidth || e.clientWidth || g.clientWidth)
    y = (w.innerHeight|| e.clientHeight|| g.clientHeight)
    // Document Methods
    m = Math,
    setAttr = "setAttribute",
    // SVG
    paper = d.querySelector("#paper"),
    xmlns = "http://www.w3.org/2000/svg",
    cSvgEl = "createElementNS",
	fr = d.createDocumentFragment(),
	// 
	pointArray = [];

// Create pointed grid
for(var i = 0, cellYLength = m.round((y - 50) / CELL_HEIGHT); i < cellYLength; i++) {
	for(var j = 0, cellXLength = m.round((x - 50) / CELL_WIDTH); j < cellXLength; j++) {
		fr.appendChild(createPoint(px+= CELL_WIDTH, py));
	}
	// increment for next column & reset start value of the last row point
	py+= CELL_HEIGHT;
	px = 0;
}
// append all points /w determined coordinates in a single auto-destroying
paper.appendChild(fr);

// =========
// Events
// =========
d.addEventListener("mousedown", findPoint, false);
// d.removeEventListener("mouseup", findNextPoint); // remove last mouseup event heandler from "findPoint"

// =========
// Methods
// =========

// =====
// Func1
// =====
// Simply creates & appends attrs to a singe svg circle element
// returns reference to the svg circle
function createPoint(x, y) {
	
	var c = d[cSvgEl](xmlns, "circle");
	c[setAttr]("cx", x);
	c[setAttr]("cy", y);
	c[setAttr]("r", 2);
	c[setAttr]("fill", "#1a1a1a");

	return c;
}

// =====
// Func2
// =====
// Implements logic for ...
function findPoint(e) {
	if(e.buttons !== 1) { return; } // terminate if not LMB
	// var	evX = e.x || e.clientX,
		// evY = e.y || e.clientY,

	// var x1, y2, x2, y2, x3, y3, x4, y4,
	// x3 = x1 = evX <= 30 ? evX : evX - 10;
	// x2 = x4 = x - evX <= 30 ? evX : evX + 10;

	// y2 = y1 = evY <= 30 ? evY: evY - 10;
	// y4 = y3 = 50 - evY <= 30 ? evY : evY + 10;



	var rmFNP = function(e) {
		findNextPoint(e, pointArray);
	};

	d.addEventListener("mousemove", rmFNP, false);

	// Terminates ...
	d.addEventListener("mouseup", function rmMU(e) {
		d.removeEventListener("mousemove", rmFNP);
		d.removeEventListener("mouseup", rmMU);
	}, false);
}

// =====
// Func3
// =====
function findNextPoint(e ) {
	var	endEvX = e.x || e.clientX,
		endEvY = e.y || e.clientY,
		point,
		col = m.floor(endEvY / 50) * 50 > 1 ? m.round(endEvY / 50) * 50 : 50,
		row = m.floor(endEvX / 50) * 50 > 1 ? m.round(endEvX / 50) * 50 : 50,
		targetPointXY = {x, y};

	if(col && ((endEvY >= col-10 && endEvY <= col) || (endEvY <= col+10 && endEvY >= col))) {
		if(row && ((endEvX >= row - 10 && endEvX <= row) || (endEvX <= row+10 && endEvX >= row))) {
			targetPointXY.x = row;	
			targetPointXY.y = col;
			point = d.elementFromPoint(targetPointXY.x, targetPointXY.y);

			// console.log(point);

			if(point.nodeName !== "svg" && point && point.attributes.fill.nodeValue !== "red") {
				point[setAttr]("fill", "red");
				pointArray.push(point);
				point = null;
			}
		}
	}
}