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


	// Grid
var CELL_WIDTH = 50,
	CELL_HEIGHT = 50,
	CELL_SCALE = 2, // 1 cell = 2 meters squered
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
    cSvgEl = "createElementNS";


// Create pointed grid
var	fr = d.createDocumentFragment(),
	xx = 0,
	yy = 50;

for(var i = 0, cellYLength = m.round((y - 50) / CELL_HEIGHT); i < cellYLength; i++) {
	for(var j = 0, cellXLength = m.round((x - 50) / CELL_WIDTH); j < cellXLength; j++) {
		fr.appendChild(createPoint(xx+= CELL_WIDTH, yy));
		// fr.appendChild(createPoint(xx + 24.5, yy + 24.5));
	}
	yy+= CELL_HEIGHT;
	xx = 0;

}
paper.appendChild(fr);
//

// =========
// Events
// =========
d.addEventListener("mousedown", findPoint, false);
// d.removeEventListener("mouseup", findEndPoint); // remove last mouseup event heandler from "findPoint"

// =========
// Methods
// =========

// =====
// Func1
// =====
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
function findPoint(e) {
	if(e.buttons !== 1) { return; } // terminate if not LMB
	var	evX = e.x || e.clientX,
		evY = e.y || e.clientY,
		col = m.floor(evY / 50) * 50 > 1 ? m.round(evY / 50) * 50 : 50,
		row = m.floor(evX / 50) * 50 > 1 ? m.round(evX / 50) * 50 : 50,
		targetPointXY = {x, y},
		point,
		pointArray = [];

	// var x1, y2, x2, y2, x3, y3, x4, y4,
	// x3 = x1 = evX <= 30 ? evX : evX - 10;
	// x2 = x4 = x - evX <= 30 ? evX : evX + 10;

	// y2 = y1 = evY <= 30 ? evY: evY - 10;
	// y4 = y3 = 50 - evY <= 30 ? evY : evY + 10;

	if(col && ((evY >= col-20 && evY <= col) || (evY <= col+20 && evY >= col))) {
		if(row && ((evX >= row - 20 && evX <= row) || (evX <= row+20 && evX >= row))) {
			targetPointXY.x = row;	
			targetPointXY.y = col;
			point = d.elementFromPoint(targetPointXY.x, targetPointXY.y);

			if(point.nodeName !== "svg") {
				point[setAttr]("fill", "red");
			}
		}
	}

	var fnp = function(e) {
		findNextPoint(e);
	}

	d.addEventListener("mousemove", fnp, false);


}


function findNextPoint(e) {

	console.log("mmv");
}
yyy