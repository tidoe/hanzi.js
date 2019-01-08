/********************************************************************************

 script:      Hanzi
 version:     (no version)
 author:      Tillmann Doenicke
 date:        2019-01-05

********************************************************************************/

var path = "scripts/"

var hanzi_scripts = [
	"hanzi-01-v1.0.js",
	"hanzi-02-v1.3.js",
	"hanzi-ext01-v1.0.js"
]

function load_scripts(i = 0){
	if(i < hanzi_scripts.length){
		var script = document.createElement("script");
		script.onload = function(){
			load_scripts(i+1);
		}
		script.type = "text/javascript";
		script.src = path+hanzi_scripts[i];
		document.getElementsByTagName("body")[0].appendChild(script);
	}
}

load_scripts();
