/********************************************************************************

 script:      Hanzi 02
 version:     1.0
 author:      Tillmann Doenicke
 date:        2018-04-15

 This script has to be loaded after Hanzi 01.

********************************************************************************/

// These are the descriptors which can be interpreted:
var unary_descriptors = ["⬚"];
var binary_descriptors = ["⿰", "⿱", "⿴", "⿵", "⿶", "⿷", "⿸", "⿹", "⿺", "⿻"];
var tenary_descriptors = ["⿲", "⿳", "△"];
var descriptors = unary_descriptors.concat(binary_descriptors).concat(tenary_descriptors);
var descriptors_ascii = ["O", "-", "^", "@", "M", "W", "C", "P", "T", "L", "X", "H", "Z", "A"];

/*
 obj:    the object to clone
 return: the cloned object
*/
function clone(obj){
	return Object.assign({}, JSON.parse(JSON.stringify(obj)));
}

/*
 src: https://stackoverflow.com/questions/14679920/is-it-possible-to-convert-a-string-containing-high-unicode-chars-to-an-array-c
*/
function decodeUnicode(str) {
	var r = [], i = 0;
	while(i < str.length) {
		var chr = str.charCodeAt(i++);
		if(chr >= 0xD800 && chr <= 0xDBFF) {
			// surrogate pair
			var low = str.charCodeAt(i++);
			r.push(String.fromCodePoint(0x10000 + ((chr - 0xD800) << 10) | (low - 0xDC00)));
		} else {
			// ordinary character
			r.push(String.fromCodePoint(chr));
		}
	}
	return r;
}

/*
 seq:    the sequence
 s:      the current position
 n:      the number of components to look forwards
 return: the index of the n-th component after s
 example: look_forward("⿱⿳艹罒冖目", 0, 2) = 5
*/
function look_forward(seq, s, n, e = 0){
	var d = 0;
	var q = 0;
	for(var t = s+1; t <= seq.length; ++t){
		if(q == 0){
			d += 1;
			if(d == n + e){
				return t;
			}
		}
		else {
			q -= 1;
		}
		if(unary_descriptors.indexOf(seq[t]) > -1){
			q += 1;
		}
		else if(binary_descriptors.indexOf(seq[t]) > -1){
			q += 2;
		}
		else if(tenary_descriptors.indexOf(seq[t]) > -1){
			q += 3;
		}
	}
}

// redesign the specialsurroundings list of equivalence classes into a dictionary of characters for a faster lookup:
var specialsurroundings2 = {};
for(var i = 0; i < fontSpecificParameters.specialsurroundings.length; ++i){ // for every equivalence class
	for(var k = 0; k < fontSpecificParameters.specialsurroundings[i].equiClass.length; ++k){ // for every element of equivalence class
		// create an own dictionary entry for the element and copy its equivalence class's properties
		specialsurroundings2[fontSpecificParameters.specialsurroundings[i].equiClass[k]] = clone(fontSpecificParameters.specialsurroundings[i]);
		delete specialsurroundings2[fontSpecificParameters.specialsurroundings[i].equiClass[k]].equiClass;
	}
}
fontSpecificParameters.specialsurroundings = specialsurroundings2;

// Tn the case that there are no parameters for the given font in this dictionary,
// the following default parameters will be used:
fontSpecificParameters.fonts.push("");
for(var prop in fontSpecificParameters){
	if(fontSpecificParameters.hasOwnProperty(prop)){
		if(prop.charAt(prop.length-1) == "x"){
			for(var propkey in fontSpecificParameters[prop]){
				fontSpecificParameters[prop][propkey].push(0);
				for(var i = 0; i < fontSpecificParameters[prop][propkey].length-1; ++i){
					fontSpecificParameters[prop][propkey][fontSpecificParameters[prop][propkey].length-1] += fontSpecificParameters[prop][propkey][i];
				}
				fontSpecificParameters[prop][propkey][fontSpecificParameters[prop][propkey].length-1] /= fontSpecificParameters[prop][propkey].length-1;
			}
		}
		else if(!(prop == "fonts")){
			for(var propkey in fontSpecificParameters[prop]){
				for(var prop2 in fontSpecificParameters[prop][propkey]){
					fontSpecificParameters[prop][propkey][prop2].push(0);
					for(var i = 0; i < fontSpecificParameters[prop][propkey][prop2].length-1; ++i){
						fontSpecificParameters[prop][propkey][prop2][fontSpecificParameters[prop][propkey][prop2].length-1] += fontSpecificParameters[prop][propkey][prop2][i];
					}
					fontSpecificParameters[prop][propkey][prop2][fontSpecificParameters[prop][propkey][prop2].length-1] /= fontSpecificParameters[prop][propkey][prop2].length-1;
				}
			}
		}
	}
}
// (The default parameters are the average of all other font-specific parameters.)

// the font index is stored in the variable "fontId"
// which later is updated for every character:
var fontId = fontSpecificParameters.fonts.length-1;
// (It is neccessary to define it here, because some of the following functions use it.)

/*
 hanzi:	a character
 return:	a dictionary of values which indicate how much of the character's left, right,
         top and bottom shall be "cut" off; normally, this is 0, but for shortened
         characters, e.g. "亠", one side has to be shortened (in this example the bottom)
         The lists "left1" etc. and the parameters "xleftright1" etc. are defined in hanzi1.js
*/
function getLeftRightTopBottom(hanzi){
	var xleft = 0;
	var xright = 0;
	var ytop = 0;
	var ybottom = 0;
	if(hanzi in fontSpecificParameters.leftx){
		xright = fontSpecificParameters.leftx[hanzi][fontId];
	}
	if(hanzi in fontSpecificParameters.rightx){
		xleft = fontSpecificParameters.rightx[hanzi][fontId];
	}
	if(hanzi in fontSpecificParameters.topx){
		ybottom = fontSpecificParameters.topx[hanzi][fontId];
	}
	if(hanzi in fontSpecificParameters.bottomx){
		ytop = fontSpecificParameters.bottomx[hanzi][fontId];
	}
	if(hanzi in fontSpecificParameters.specialcharacters){
		var scs = fontSpecificParameters.specialcharacters[hanzi];
		if(scs.hasOwnProperty("xleft")){ xleft = scs.xleft[fontId]; }
		if(scs.hasOwnProperty("xright")){ xright = scs.xright[fontId]; }
		if(scs.hasOwnProperty("ytop")){ ytop = scs.ytop[fontId]; }
		if(scs.hasOwnProperty("ybottom")){ ybottom = scs.ybottom[fontId]; }
	}
	return {"left" : xleft, "right" : xright, "top" : ytop, "bottom" : ybottom};
}

/*
 hanzi:	a descriptor
 hanzii:	the succeeding character
 return:	a dictionary of values which indicate how much the character's top-left and bottom-right
         positions shall be moved away from the character's (0,0) and (1,1). For example, the
         value of sx1 causes an addition to the character's top value x1 of (x2-x1)/sx1.
*/
function getSurroundingScales(hanzi, hanzii = null){
	var sx1 = fontSpecificParameters.scales[hanzi].x1[fontId];
	var sy1 = fontSpecificParameters.scales[hanzi].y1[fontId];
	var sx2 = fontSpecificParameters.scales[hanzi].x2[fontId];
	var sy2 = fontSpecificParameters.scales[hanzi].y2[fontId];
	// Some fonts, such as "Yu Gothic", use a variant form of "门".
	// Iff such a font is used, "门" shall get the same properties as "門":
	if(hanzii == "门" && ["Yu Gothic"].indexOf(fontSpecificParameters.fonts[fontId]) > -1 && !("门" in fontSpecificParameters.specialsurroundings)){
		hanzii = "門";
	}
	if(hanzii in fontSpecificParameters.specialsurroundings){
		var sss = fontSpecificParameters.specialsurroundings[hanzii];
		if(sss.hasOwnProperty("x1")){ sx1 = sss.x1[fontId]; }
		if(sss.hasOwnProperty("y1")){ sy1 = sss.y1[fontId]; }
		if(sss.hasOwnProperty("x2")){ sx2 = sss.x2[fontId]; }
		if(sss.hasOwnProperty("y2")){ sy2 = sss.y2[fontId]; }
	}
	return {"x1" : sx1, "y1" : sy1, "x2" : sx2, "y2" : sy2};
}

// iterate over every hanzi element:
var hanzi = document.getElementsByTagName("hanzi");
for(var i = 0; i < hanzi.length; ++i){
	// descriptive sequence for the i-th hanzi; the unicode decoding is necessary, because JavaScript encodes
	// everything in UTF-16 (i.e. some Chinese characters may be represented as two characters):
	var seq = decodeUnicode(hanzi[i].innerHTML);
	// determine font of the embedding element(s); for some reason, there are sometimes quotation marks (")
	// around the font and sometimes not, these have to be replaced:
	var computedFont = window.getComputedStyle(hanzi[i]).fontFamily.replace(/\"/g, "");
	// update "params" according to the computed font:
	fontId = (fontSpecificParameters.fonts.indexOf(computedFont) > -1 ? fontSpecificParameters.fonts.indexOf(computedFont) : fontSpecificParameters.fonts.length-1);
	// determine colour, font-size and font-weight of the embedding element(s):
	var computedColor = window.getComputedStyle(hanzi[i]).color;
	var computedFontSize = window.getComputedStyle(hanzi[i]).fontSize;
	var computedFontWeight = window.getComputedStyle(hanzi[i]).fontWeight;
	for(var s = 0; s < computedFontSize.length; ++s){
		if(!/^[0-9\.]+$/.test(computedFontSize.substr(0, s+1))){
			break;
		}
	}
	// convert font-size from pixles to points:
	var fs = Math.round(parseFloat(computedFontSize.substr(0, s))*0.75).toString();
	var ms = "pt";
	// handling italic font-style:
	var italic1 = 0; // this parameter is responsible for translating on the x-axis
	var italic2 = 0; // this parameter is responsible for skewing on the x-axis
	if(window.getComputedStyle(hanzi[i]).fontStyle == "italic"){
		italic1 = Math.round(0.2*parseInt(fs));	// magic number: 0.2
		italic2 = -18;										// magic number: 18
		hanzi[i].style.fontStyle = "normal";
	}
	// open svg with width and height of the font-size:
	var svg = "<svg overflow='visible' width='" + fs + ms + "' height='" + fs + ms + "' transform='translate(" + italic1.toString() + ", " + (parseInt(fs)/10.0/0.75).toString() + ") skewX(" + italic2.toString() + ")'>";
	if(hanzi[i].hasAttribute("comp")){ // test mode
		hanzi[i].title = seq.join("");
		svg += "<text x='0%' y='90%' transform='scale(1, 1)' font-size='" + (1.05*parseInt(fs)).toString() + ms + "' fill='orange'>" + hanzi[i].getAttribute("comp") + "</text>";
		// (note the magic numbers for y and font-size)
	}
	// The user can pass a descriptor set through the "dset" attribute of the hanzi tag:
	var dsetValues = descriptors;
	if(hanzi[i].hasAttribute("dset")){
		dsetValues = hanzi[i].getAttribute("dset");
		dsetValues = (dsetValues == "" ? descriptors_ascii : dsetValues.split(""));
		// Internally, the passed descriptors are converted to the original ones.
		for(var s = 0; s < seq.length; ++s){
			seq[s] = (dsetValues.indexOf(seq[s]) > -1 ? descriptors[dsetValues.indexOf(seq[s])] : seq[s]);
		}
	}
	// The user can pass values, i.e. factors, to stretch certain character components.
	// These factors are stored in "scales" and 1 by default:
	var scales = {};
	for(var s = 0; s < seq.length; ++s){
		scales[s] = 1;
	}
	// The factors are passed through the "scales" attribute of the hanzi tag:
	if(hanzi[i].hasAttribute("scales")){
		var scaleValues = hanzi[i].getAttribute("scales").split(",");
		for(var v = 0; v < scaleValues.length; ++v){
			var sv = scaleValues[v].split(":");
			var svIndex = (parseInt(sv[0])+seq.length)%seq.length;
			var svValue = parseFloat(sv[1]);
			scales[svIndex] = svValue;
		}
	}
	// The user can pass values, i.e. colour names, to colour certain character components.
	// These names are stored in "colors" and the computedColor by default:
	var colors = {};
	for(var s = 0; s < seq.length; ++s){
		colors[s] = computedColor;
	}
	// The names are passed through the "colors attribute of the hanzi tag:
	if(hanzi[i].hasAttribute("colors")){
		var colorValues = hanzi[i].getAttribute("colors").split(",");
		for(var v = 0; v < colorValues.length; ++v){
			var cv = colorValues[v].split(":");
			var cvIndex = (parseInt(cv[0])+seq.length)%seq.length;
			var cvValue = cv[1];
			var n = 0;
			if(unary_descriptors.indexOf(seq[cvIndex]) > -1){
				n = 1;
			}
			else if(binary_descriptors.indexOf(seq[cvIndex]) > -1){
				n = 2;
			}
			else if(tenary_descriptors.indexOf(seq[cvIndex]) > -1){
				n = 3;
			}
			for(var k = cvIndex; k < look_forward(seq, cvIndex, n, 1); ++k){
				colors[k] = cvValue;
			}
		}
	}
	// the gaps list contains gaps which should be filled (starting at the last element)
	// with characters or split into more gaps by a descriptive symbol:
	var gaps = [[0, 0, 100, 100]];
	for(var s = 0; s < seq.length; ++s){
		// get the next gap in the queue and its top-left (x1,y1) and bottom-right (x2,y2) position:
		var gap = gaps.pop();
		var x1 = gap[0];
		var y1 = gap[1];
		var x2 = gap[2];
		var y2 = gap[3];
		// The following if-branches are almost identical, so I will
		// give an explanation only for the first one.
		if(seq[s] == "⿰"){
			// get the first characters of the following two components (because this is a binary descriptor):
			var char1 = getLeftRightTopBottom(seq[s+1]);
			var char2 = getLeftRightTopBottom(seq[look_forward(seq, s, 2)]);
			// put the components together in a way that cut off parts are treated as not existing,
			var x11 = -char1["left"];								// cut off the first component's left part
			var x12 = x11+scales[s+1];								// add scaled character width (without scaling, 1 would be added)
			var x21 = x12-char1["right"]-char2["left"];		// cut off the first component's right part and the second components left part
			var x22 = x21+scales[look_forward(seq, s, 2)];	// add full (100%) character width
			var xs = x22-char2["right"];							// cut off the second character's right part; xs is the composition's length
			// normalise the composition's width to 1:
			x11 /= xs;
			x12 /= xs;
			x21 /= xs;
			x22 /= xs;
			// create new gaps for the two components:
			gaps.push([x1+(x2-x1)*x21, y1, x1+(x2-x1)*x22, y2]);
			gaps.push([x1+(x2-x1)*x11, y1, x1+(x2-x1)*x12, y2]);
			// (Note that the last component's gap is pushed at first and so on.)
		}
		else if(seq[s] == "⿱"){
			var char1 = getLeftRightTopBottom(seq[s+1]);
			var char2 = getLeftRightTopBottom(seq[look_forward(seq, s, 2)]);
			var y11 = -char1["top"];
			var y12 = y11+scales[s+1];
			var y21 = y12-char1["bottom"]-char2["top"];
			var y22 = y21+scales[look_forward(seq, s, 2)];
			var ys = y22-char2["bottom"];
			y11 /= ys;
			y12 /= ys;
			y21 /= ys;
			y22 /= ys;
			gaps.push([x1, y1+(y2-y1)*y21, x2, y1+(y2-y1)*y22]);
			gaps.push([x1, y1+(y2-y1)*y11, x2, y1+(y2-y1)*y12]);
		}
		else if(seq[s] == "⿲"){
			var char1 = getLeftRightTopBottom(seq[s+1]);
			var char2 = getLeftRightTopBottom(seq[look_forward(seq, s, 2)]);
			var char3 = getLeftRightTopBottom(seq[look_forward(seq, s, 3)]);
			var x11 = -char1["left"];
			var x12 = x11+scales[s+1];
			var x21 = x12-char1["right"]-char2["left"];
			var x22 = x21+scales[look_forward(seq, s, 2)];
			var x31 = x22-char2["right"]-char3["left"];
			var x32 = x31+scales[look_forward(seq, s, 3)];
			var xs = x32-char3["right"];
			x11 /= xs;
			x12 /= xs;
			x21 /= xs;
			x22 /= xs;
			x31 /= xs;
			x32 /= xs;
			gaps.push([x1+(x2-x1)*x31, y1, x1+(x2-x1)*x32, y2]);
			gaps.push([x1+(x2-x1)*x21, y1, x1+(x2-x1)*x22, y2]);
			gaps.push([x1+(x2-x1)*x11, y1, x1+(x2-x1)*x12, y2]);
		}
		else if(seq[s] == "⿳"){
			var char1 = getLeftRightTopBottom(seq[s+1]);
			var char2 = getLeftRightTopBottom(seq[look_forward(seq, s, 2)]);
			var char3 = getLeftRightTopBottom(seq[look_forward(seq, s, 3)]);
			var y11 = -char1["top"];
			var y12 = y11+scales[s+1];
			var y21 = y12-char1["bottom"]-char2["top"];
			var y22 = y21+scales[look_forward(seq, s, 2)];
			var y31 = y22-char2["bottom"]-char3["top"];
			var y32 = y31+scales[look_forward(seq, s, 3)];
			var ys = y32-char3["bottom"];
			y11 /= ys;
			y12 /= ys;
			y21 /= ys;
			y22 /= ys;
			y31 /= ys;
			y32 /= ys;
			gaps.push([x1, y1+(y2-y1)*y31, x2, y1+(y2-y1)*y32]);
			gaps.push([x1, y1+(y2-y1)*y21, x2, y1+(y2-y1)*y22]);
			gaps.push([x1, y1+(y2-y1)*y11, x2, y1+(y2-y1)*y12]);
		}
		else if(seq[s] == "⬚"){ // this descriptor is good for nothing
			gaps.push([x1, y1, x2, y2]);
		}
		else if(seq[s] == "⿻"){ // this descriptor will just overlay the two following components
			gaps.push([x1, y1, x2, y2]);
			gaps.push([x1, y1, x2, y2]);
		}
		else if(seq[s] == "△"){ // an own descriptor for triplets; actually, "△XXX" is the same as "⿱X⿰XX"
			gaps.push([x1+(x2-x1)/2.0, y1+(y2-y1)/2.0, x2, y2]);
			gaps.push([x1, y1+(y2-y1)/2.0, x2-(x2-x1)/2.0, y2]);
			gaps.push([x1+(x2-x1)*(1-scales[s])/2, y1, x2-(x2-x1)*(1-scales[s])/2, y2-(y2-y1)/2.0]);
		}
		else if(descriptors.indexOf(seq[s]) > -1){ // the surrounding descriptors
			var desc = getSurroundingScales(seq[s], seq[s+1]);
			var sx1 = desc["x1"];
			var sy2 = desc["y2"];
			var sx2 = desc["x2"];
			var sy1 = desc["y1"];
			gaps.push([x1+(x2-x1)*sx1, y1+(y2-y1)*sy1, x2-(x2-x1)*sx2, y2-(y2-y1)*sy2]);
			gaps.push([x1, y1, x2, y2]);
		}
		else { // in this case it must be a character component
			// compute stretch factors and svg-relative positions for x and y:
			var sx = ((x2-x1)/100.0);
			var sy = ((y2-y1)/100.0);
			x1 = Math.round(0.90*x1/sx).toString() + "%"; // 0.90 is a magic number
			y2 = Math.round(0.90*y2/sy).toString() + "%"; // --------- " ---------
			// calculate the adjusted font-weight for the stretched element:
			var fw = Math.round((900.0-(900.0-parseInt(computedFontWeight))*(sx*sy))/100.0)*100-100; // (values in {100, 200, ..., 900})
			// add character component to svg:
			svg += "<text ";																				// opening tag
			svg += "x='" + x1 + "' y='" + y2 + "' ";												// position
			svg += "transform='scale(" + sx.toString() + ", " + sy.toString() + ")' ";	// stretch
			svg += "font-size='" + (1.05*parseInt(fs)).toString() + ms + "' ";			// multiplying the magic number 1.05 to the font-size
			svg += "font-weight='" + fw.toString() + "' ";										// set the font-weight
			svg += "fill='" + colors[s] + "'";														// set the text colour
			svg += ">" + seq[s] + "</text>";															// character component and closing tag
			continue;
		}
		// add transparent descriptor to svg:
		svg += "<text x='0%' y='90%' font-size='" + (1.05*parseInt(fs)).toString() + ms + "' fill-opacity='0'>" + dsetValues[descriptors.indexOf(seq[s])] + "</text>";
	}
	// close svg and update hanzi tag:
	svg += "</svg>";
	hanzi[i].innerHTML = svg;
}