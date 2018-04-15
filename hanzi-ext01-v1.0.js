/********************************************************************************

 script:      Hanzi Extension 01
 version:     1.0
 author:      Tillmann Doenicke
 date:        2018-04-15

 This script has to be loaded after Hanzi 02.

********************************************************************************/

// iterate over every hanzi element:
var hanzi = document.getElementsByTagName("hanzi");
for(var i = 0; i < hanzi.length; ++i){
	// get SVG and remove closing tag:
	var svg = hanzi[i].innerHTML;
	svg = svg.substring(0, svg.indexOf("</svg>"));
	// determine text decoration features of the parent element:
	var computedTextDecorationLine = window.getComputedStyle(hanzi[i].parentElement).textDecorationLine;
	var computedTextDecorationColor = window.getComputedStyle(hanzi[i].parentElement).textDecorationColor;
	// The following code adds an underline if the parent element has an underline.
	// (For some reason the computed style for the hanzi tag itself does not inherit
	// the text decoration.) Note that the underline of the hanzi will be solid,
	// regardless the parent element's decoration style.
	if(computedTextDecorationLine == "underline"){
		svg += "<rect x='0%' y='95%' width='100%' height='" + Math.round(parseInt(fs)*0.1) + "pt' fill='" + computedTextDecorationColor + "'/>";
		// The <rect> from above draws only the upper half of the underline. The lower half (actually the total underline;
		// i.e. the upper half is redrawn) can be added by the following code. However, this solution only works for some fonts:
		if(["SimSun", "NSimSun", "MS Gothic"].indexOf(fontSpecificParameters.fonts[fontId]) > -1){
			var line = "inset 0 -" + Math.round(parseInt(fs)*0.1) + "pt " + computedTextDecorationColor;
			hanzi[i].style["box-shadow"] = line;
			hanzi[i].style["-webkit-box-shadow"] = line;
			hanzi[i].style["-moz-box-shadow"] = line;
		}
		// (Somebody definitely has to come up with a better solution for underlining.)
	}
	// Similarly for line-through. It is noteworthy, that not both an underline and a line-through
	// can be used together(, yet), because the parent element can only have one text decoration:
	else if(computedTextDecorationLine == "line-through"){
		var strokey = 59; // the average of the font-specific values below
		if(["Microsoft JhengHei"].indexOf(fontSpecificParameters.fonts[fontId]) > -1){						strokey = 54; }
		else if(["Microsoft YaHei"].indexOf(fontSpecificParameters.fonts[fontId]) > -1){						strokey = 55; }
		else if(["Yu Gothic"].indexOf(fontSpecificParameters.fonts[fontId]) > -1){								strokey = 57; }
		else if(["Arial"].indexOf(fontSpecificParameters.fonts[fontId]) > -1){									strokey = 60; }
		else if(["SimSun", "NSimSun", "MS Gothic"].indexOf(fontSpecificParameters.fonts[fontId]) > -1){	strokey = 61; }
		else if(["PMingLiU", "MingLiU"].indexOf(fontSpecificParameters.fonts[fontId]) > -1){				strokey = 63; }
		// (These values could also go into hanzi1.js, but I decided to hardcode them here for two main reasons:
		//   1) Less parameters in hanzi1.js which future users have to adjust;
		//   2) A line-through is not used so often with a high font size, i.e. an approximate value should be enough (for now).)
		svg += "<rect x='0%' y='" + strokey.toString() + "%' width='100%' height='" + Math.round(parseInt(fs)*0.1) + "pt' fill='" + computedTextDecorationColor + "'/>";
	}
	// close svg and update hanzi tag:
	svg += "</svg>";
	hanzi[i].innerHTML = svg;
}