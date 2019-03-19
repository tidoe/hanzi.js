# hanzi.js

Representation of (non-)Unicode Chinese characters in HTML and LaTeX

<p align="center">
	<img src="https://github.com/tidoe/hanzi.js/blob/master/coloured_components.png" width="400"/><br />
	View the code for this example <a href="https://github.com/tidoe/hanzi.js/blob/master/examples/coloured_components.html">here</a>!
</p>

## Table of contents

- [Instructions](#instructions)
  - [First example](#first-example)
  - [Version handling](#version-handling)
  - [Character description language](#character-description-language)
  - [More examples](#more-examples)
- [Tag attributes](#tag-attributes)
  - [colors](#colors)
  - [comp](#comp)
  - [dset](#dset)
  - [scales](#scales)
- [Font-specific parameters](#font-specific-parameters)
  - [Necessity](#necessity)
  - [Font support](#font-support)
  - [Shortened character variants](#shortened-character-variants)
  - [Surrounding characters](#surrounding-characters)
  - [Special characters](#special-characters)
  - [Special surroundings](#special-surroundings)
  - [Define and test new parameters](#define-and-test-new-parameters)
  - [Set the font of the document](#set-the-font-of-the-document)
- [Adaptability](#adaptability)
  - [color](#color)
  - [font-family](#font-family)
  - [font-size](#font-size)
  - [font-style](#font-style)
  - [font-weight](#font-weight)
  - [text-decoration](#text-decoration)
- [Conversion instructions](#conversion-instructions)
  - [To PDF](#to-pdf)
  - [To script-less HTML](#to-script-less-html)
  - [To various image file formats](#to-various-image-file-formats)
- [LaTeX extension](#latex-extension)
  - [LaTeX example](#latex-example)
  - [LaTeX converter](#latex-converter)
  - [Comments on coding](#comments-on-coding)
- [License](#license)

## Instructions

### First example

Here's a minimal example of an HTML document which uses hanzi.js:
```html
<html>
	<head>
		<meta charset="UTF-8"/>
	</head>
	<body>
		<p>你好世界！</p>
		<p><hanzi>⿰亻尔</hanzi><hanzi>⿰女子</hanzi>世<hanzi>⿱田介</hanzi>！</p>
		<script type="text/javascript" src="hanzi.js"></script>
	</body>
</html>
```

**Note:** You have to download the directory `scripts` and the file `hanzi.js`, and place them in the same folder as your HTML document or modify the path in the `src` attribute of the `<script>` tag.

The `<script>` tag must be included right before `</body>`.

In `hanzi.js` you can specify which versions you want to load in your HTML document.

### Version handling

hanzi.js consists of several scripts and other files. A new version does not necessarily come along with a new version of every file. All versions (including the newest ones) of every .js file can be found in the directory `scripts`. The older versions of the HTML files can be found in the directory `earlier_versions`.

The version number is contained in every file name. For example, `hanzi-01-v1.0.1.js` is of version 1.0.1. The examples given here name version 1.0, but work totally fine with newer versions if not stated otherwise. See the changelog to get an overview of all versions.

### Character description language

Use one `<hanzi>` tag for each character you want to create with hanzi.js.

The inner HTML of a `<hanzi>` tag must be a sequence of characters and descriptors.

* unary descriptors: ⬚
* binary descriptors: ⿰, ⿱, ⿴, ⿵, ⿶, ⿷, ⿸, ⿹, ⿺, ⿻
* tenary descriptors: ⿲, ⿳, △

**Note:** The unary descriptor is a leftover from an earlier stage of developing and good for nothing. Don't use it.

An n-ary descriptor must be followed by n components. A component can be either a character or another descriptor followed by its components.

For example, 吾 can be written as ⿱五口 and 語 can be written as ⿰言吾 or ⿰言⿱五口. There is no limit for the depth of nesting.

### More examples

1. Boldface
```html
<b>你<hanzi>⿰女子</hanzi>世界！</b>
```
2. Italics
```html
<i>你<hanzi>⿰女子</hanzi>世界！</i>
```
3. Boldface and italics
```html
<b><i>你<hanzi>⿰女子</hanzi>世界！</i></b>
```
4. Struck through
```html
<s>你<hanzi>⿰女子</hanzi>世界！</s>
```
5. Underline
```html
<u>你<hanzi>⿰女子</hanzi>世界！</u>
```
6. Hyperlink
```html
<a href="https://github.com/tidoe">你<hanzi>⿰女子</hanzi>世界！</a>
```
7. Specified font
```html
<span style="font-family:Yu Gothic;">你<hanzi>⿰女子</hanzi>世界！</span>
```
8. Font- and background-color
```html
<span style="color:red;background-color:gray;">你<hanzi>⿰女子</hanzi>世界！</span>
```
9. Coloured components
```html
你<hanzi colors="1:blue,2:red">⿰女子</hanzi>世界！
```
10. With JavaScript
```html
你<hanzi>⿰女子</hanzi>世界！
<script type="text/javascript">
	var hanzi = document.getElementsByTagName("hanzi");
	for(var i = 0; i < hanzi.length; ++i){
		hanzi[i].setAttribute("colors", "0:red");
	}
</script>
```
11. With CSS
```html
<style type="text/css">
	hanzi {
		color: red;
	}
</style>
你<hanzi>⿰女子</hanzi>世界！
```
12. More complex characters
```html
他沒吃過<hanzi>⿺辶⿳穴⿲月⿱⿲幺言幺⿲長馬長刂心</hanzi><hanzi>⿺辶⿳穴⿲月⿱⿲幺言幺⿲長馬長刂心</hanzi>麵。
```
13. More complex characters with scales
```html
他沒吃過<hanzi scales="4:2,6:3">⿺辶⿳穴⿲月⿱⿲幺言幺⿲長馬長刂心</hanzi><hanzi scales="4:2,6:3">⿺辶⿳穴⿲月⿱⿲幺言幺⿲長馬長刂心</hanzi>麵。
```

## Tag attributes

### colors

Single components can be coloured by passing the component's index (counted from 0) and a colour name. This is useful for, e.g., marking the phonetic and semantic components. Index and colour name must be separated by a colon and index-colour pairs must be separated by commas.

For example, `<hanzi colors="1:blue,2:red">⿰口馬</hanzi>` colours 口 blue and 馬 red.

If a descriptor is at the index's position, every of its components will be coloured (if not having attributed an own colour name).

### comp

This attribute is for testing. You can pass the original character which will then be drawn under the produced character in orange.

For example, `<hanzi comp="嗎">⿰口馬</hanzi>` can be used to compare the character produced by ⿰口馬 with the original character 嗎.

### dset

In case you cannot or do not want to enter the descriptor symbols, you can define a new set. The value of the attribute has to be a string of the form ⬚⿰⿱⿴⿵⿶⿷⿸⿹⿺⿻⿲⿳△ in which every descriptor was replaced by its new correspondence.

For example, `<hanzi dset="O-^@MWCPTLXHZA">^-口口馬</hanzi>` produces (the hanzi.js version of) 駡.

This is especially useful if your HTML document uses another charset than UTF-8, e.g. Big5 in which the descriptors are not encoded. In this case you must add `charset="UTF-8"` to the `<script>` tags which load the hanzi.js scripts since the new descriptors are internally replaced by the original ones.

### scales

Single components can be scaled by passing the component's index (counted from 0) and a scaling factor (if this is 1.0 then nothing will happen). This is useful for giving some more complex characters a better look. Index and scaling factor must be separated by a colon and index-factor pairs must be separated by commas.

For example, try `<hanzi scales="3:3,10:3,-1:0.5">⿳⿲日⿲糸言糸干⿲月⿲長馬長戈心</hanzi>` vs. `<hanzi>⿳⿲日⿲糸言糸干⿲月⿲長馬長戈心</hanzi>`.

**Note:** If the index is negative, it will be interpreted as the length of the sequence minus the index's absolute value.

## Font-specific parameters

### Necessity

Left, right, top and bottom shortened character variants, such as 氵, 衤 and 宀 in 𣿟 (= ⿰氵⿱宀⿰衤𪠲), do not occupy the same space as "full-width"/"full-height" characters. The problem is that not every, let's say, left character variant occupies the same space, hence each shortened character variant has to get its own set of parameters. Furthermore, the occupied space depends on the font which makes the character-variant-dependent parameters also font-dependent. 

### Font support

The font-specific parameters are organised in script 01 (`hanzi-01-v1.0.js`). Parameters are defined (i.e. hardcoded) for the following fonts:

* Simplified Chinese
  * SimSun (serif)
  * Microsoft YaHei (sans-serif)
  * NSimSun (fixed-width)
* Traditional Chinese
  * PMingLiU (serif)
  * Microsoft JhengHei (sans-serif)
  * MingLiU (fixed-width)
* Japanese
  * Arial (serif)
  * Yu Gothic (sans-serif)
  * MS Gothic (fixed-width)

As indicated above, the six fonts shall cover each font type of {Simplified Chinese, Traditional Chinese, Japanese} × {serif, sans-serif, fixed-width}. However, the fonts are not language dependent; of course one can use, e.g., Arial for Simplified Chinese as well. Furthermore, different browsers might cause issues with handling CJK fonts.

For all other fonts, which do not have defined parameter sets, a default parameter set is used. Each default parameter is calculated as the average of its corresponding font-specific parameters.

See [Set the font of the document](#set-the-font-of-the-document) for how to change the font of the document or a part of it.

### Shortened character variants

The following shortened character variants have their own font-specific parameters:

* Left: 亻, 冫, 龺, 彳, 忄, 扌, 氵, 牜, 犭, ⺩, ⺪, 礻, 纟, 糹, ⺼, 衤, 讠, 訁, 𧾷, ⻊, 钅, 釒, 阝, 饣, 飠, ⻞, 𩙿
* Right: 刂, 卜, 卩, ⺙, ⻏
* Top: 丆, 丷, 𠂉, 乛, 亠, 冖, ⺈, 龶, 宀, ⺍, ⺌, 龸, 𤇾, 爫, ⺧, 𥫗, 罒, 耂, 𦥯, 艹, 䒑, 龷, 𫇦, 覀, ⻗
* Bottom: ⺗, 龰, 灬

The parameters specify which part of the character variant should be cut off (since it is only white space).

**Note:** If a character variant is not listed here, it is treated like a full-width/full-height character.

### Surrounding characters

Surrounding characters are characters, such as 冂, which can surround other characters, as in 冃 (= ⿵冂二). While the surrounding characters can be displayed in full size, the surrounded character has to be downsized. Unfortunately, the top/left/bottom/right edges of the surrounded character are font-dependent, too, hence font-specific parameters for the classes of surrounding characters are necessary as well. These are: ⿴, ⿵, ⿶, ⿷, ⿸, ⿹, ⿺.

**Note:** When the descriptor ⿻ is used, the two components will be completely overlayed. In some cases this leads to a correct result, e.g. ⿻弓丨 for 弔, in others not, e.g. ⿻⺀大 for 头. Since the definition of ⿻, "Ideographic Description Character Overlaid", is on purpose very vague it is not possible to implement a precise handling of combinations with ⿻.

### Special characters

Special characters are characters which are no shortened character variants but also need specific cut-offs. The cut-offs are font-dependent and thus very messy. Therefore, before declaring a character as "special", one should give it a consideration whether this is really neccessary. At present, there is only one special character with font-specific paramters, which is 一. (It was necessary to handle it separately since in combinations, such as 霊 (= ⿳⻗一亚), the upper and lower white spaces of this character normally are reduced.)

### Special surroundings

Special surroundings are characters which can be used as surrounding characters but need other parameters than generally defined. The characters are grouped in equivalence classes and each class has an own entry with the font-specific parameters and a list of members of this class. For example: 尸, 戶, 户, 戸, 气, 𢎘, ⺶ are all members of the same equivalence class.

### Define and test new parameters

The content of the variable `fontSpecificParameters` in `hanzi-01-v1.0.js` can be expanded by the parameters of a new font. This takes some time. Make sure to execute the following steps:

1. Add the correct font name to the list of fonts. Don't forget to add a comma after the last font in the list and don't write a comma after the new font.
2. Add a new column to the parameter matrix by inserting `, 0.00` after each number value in the matrix's last column. The numbers indicate the percentage to cut off from the opposite side, e.g. leftx=0.00 means that nothing will be cut off and leftx=0.30 means that 30% from the right side of the character will be cut off. Therefore, right now nothing will be cut off from any character when using the new font.
3. Open the test page (`hanzi-test-v1.0.html`) in your browser. Select the font you want to test by appending `?font=[font name]` (without brackets) to the URL, e.g. `hanzi-test-v1.0.html?font=SimSun`.
4. Move step by step through the tables on the test page. For every shortened character variant there is at least one test cell. Modify the font-specific parameter of every variant until the created characters (black) best overlap with the original characters (orange). Note that it is not possible but also not necessary to achieve a perfect overlap.
5. Go on with the paramters for surroundings etc. Further information is in the comments of script 01. If every paramters is set, the new font will be displayed properly.

### Set the font of the document

This section is only for those who are not familiar with HTML/CSS.

If you want to change the default font (of your browser) for an element, add ` style="font-family: [font name];"` (without brackets) to its opening tag.

For example, if you want to set the font for a paragraph (`<p>`) to SimSun then change `<p` to `<p style="font-family: SimSun;"`. If you change `<body` to `<body style="font-family: SimSun;"` then the whole document's font will be SimSun.

If you want to determine the font of your document, include the following snippet somewhere in the body:
```html
<script type="text/javascript">
	document.write(window.getComputedStyle(document.getElementsByTagName("body")[0]).fontFamily.replace(/\"/g, ""));
</script>
```

## Adaptability

### color

The created character will inherit the text-color of the parent element.

See [Tag attributes](#tag-attributes) \\ [colors](#colors) for how to change the colour of a single component.

### font-family

The created character will inherit the font-family of the parent element. Overlappings of or larger spaces between the single components can occur if no font-specific parameters are defined for that font. Parameters are defined for Arial, Microsoft JhengHei, Microsoft YaHei, MingLiU, MS Gothic, NSimSun, PMingLiU, SimSun and Yu Gothic.

See [Font-specific paramters](#font-specific-parameters) for how to manage the existing and add new parameters.

### font-size

The created character will inherit the font-size of the parent element and increase it by 5% to compensate inaccuracies in the positioning of the single components. Thus, the character is a tiny bit higher than non-created characters. This is, if at all, only visible with a very large font-size.

### font-style

If the font-style of the parent element is italics/oblique then the single character components will be moved 0.2 pixles on and skewed 18 degrees along the x-axis. This causes the created character to assimilate perfectly to non-created characters.

### font-weight

The single components of a created character are scaled and stretched to different degrees which also leads to different font-weights within one character. To counteract, smaller components get a higher font-weight (which in HTML/CSS ranges from 100 to 900 in incremets of 100) via the formula 900-(900-w)\*(sx\*sy)-100 where w is the inherited font-weight and sx and sy are the stretch factors for width and height, respectively.

For example, in the composition ⿰口馬 both components have sx=0.5 and sy=1.0 and inherit a text-width of 400 (for normal text). The font-weight for each component thus is set to 900-(900-400)\*(0.5\*1.0)-100=550≈600.

### text-decoration

**Note:** You have to load the extension `hanzi-ext01-v1.0.js` to use text-decoration. Therefore include it in the `hanzi_scripts` list in `hanzi.js`.

The created character is partially adaptable to the text-decoration types "underline" and "line-through". (The former is especially important for created characters within the text of an (underlined) hyperlink.) At present, the representation of "underline" and "line-through" show several imperfections such as a possibly incorrect line thickness, height or style.

## Conversion instructions

### To PDF

Convert the HTML document which uses hanzi.js to a PDF file. The created characters stay unchanged.

1. You can insert `<div style="page-break-after: always;"></div>` at the places where a pagebreak shall be forced.
2. Open the HTML document in a browser (e.g. Chrome or Firefox).
3. Press Ctrl + P to open the print menu. Select "Print to PDF" as printer and save the file.

### To script-less HTML

Convert the HTML document which uses hanzi.js to a HTML file which does not rely on loading the hanzi.js scripts anymore. The created characters stay unchanged.

1. Open the HTML document in a browser (e.g. Chrome or Firefox).
2. Press Ctrl + Shift + I or right-click somewhere and select "Inspect element" to open the element inspector. You can now see the interpreted source code.
3. Right-click on `<html>` and select "Copy outer HTML". Open an empty document and paste.
4. Delete the `<script>` tags which load the hanzi.js scripts.
5. Save the document as .html file.

### To various image file formats

Convert a single created character of an HTML document which uses hanzi.js to an image file.

1. Open the HTML document in a browser (e.g. Chrome or Firefox).
2. Right-click on the character which you want to convert and select "Inspect element" to open the element inspector. You can now see the interpreted source code for the character.
3. Right-click on `<svg>` and select "Copy outer HTML". Open an empty document and paste.
4. Include `<?xml version="1.0" encoding="utf-8"?>` before `<svg` and change `<svg` to ` <svg xmlns="http://www.w3.org/2000/svg"`.
5. Save the document as .svg file.
6. Use an image converter (e.g. [https://image.online-convert.com/convert-to-jpg](https://image.online-convert.com/convert-to-jpg)) to convert the .svg file to an .jpg file.
7. Now you can convert the .jpg file to other image file formats.

**Note:** The direct conversion of the .svg file to a .png file produces an erroneous result. Hence I recommend first convert it to .jpg.

## LaTeX extension

### LaTeX example

To use characters created by hanzi.js within LaTeX you first have to write a usual LaTeX document like this:
```latex
\documentclass[a4paper,12pt]{article}
\usepackage{CJK}
\usepackage{adjustbox}
\usepackage{etoolbox}
\usepackage{graphicx}
\newcommand{\hanzi}[1]{\fbox{?}}
\begin{document}
\begin{CJK}{UTF8}{gbsn}
你好世界！

\hanzi{⿰亻尔}\hanzi{⿰女子}世\hanzi{⿱田介}！
\end{CJK}
\end{document}
```

The [`CJK`](https://en.wikibooks.org/wiki/LaTeX/Internationalization#Chinese) package makes it possible to include Chinese characters. The [`graphicx`](https://en.wikibooks.org/wiki/LaTeX/Importing_Graphics#Importing_external_graphics) package makes it possible to include graphics and is required later together with the `adjustbox` and `etoolbox` packages.

Include the line `\newcommand{\hanzi}[1]{\fbox{?}}` into the preamble to define the `\hanzi{}` command. This will for now only produce a box with a question mark.

After finishing the document you can use the LaTeX converter to replace the question mark boxes with the actual graphics.

**Note:** You should apply the converter to your .tex file only once; converting it a second time would break it.

### LaTeX converter

To convert your .tex file follow the subsequent instructions:

1. Save the Hanzi-to-TeX Converter (`hanzi-2text-v1.0.1.html`) on your computer and open it in a browser. The LaTeX converter was tested on Chrome. Problems could occur when running it in other browsers.
2. Better clear your download folder.
3. On the converter page, select the .tex file which you want to convert. The script will immeadetely start working.
4. If you execute it the first time, your browser possibly blocks pop-ups and/or multiple downloads. You have to allow everything for this page. (No worry, it's an offline script and does not download anything from the internet.)
5. The script will save the converted .tex file and a .png file for every created character on your computer, probably in your downloads folder. For every downloaded file a new tab will open. These tabs should close after 5 seconds automatically.
6. For the first time, I recommend to execute the converter twice (because of the permission issue explained in point 4). Clear your download folder before executing it again. To be able to run the converter again you have to reload the page. Now, everything should work without permission issues.
7. You can now move the downloaded files to wherever you want and compile the new LaTeX document. The converted .tex file needs the .png files to be located in the same folder.
8. If you want to put them in a subfolder, e.g. "hanzis", you can do so and change the graphics path in the new document by inserting `\graphicspath{{hanzis/}}` somewhere after `\usepackage{graphicx}` in the preamble.

The output for the LaTeX example from above looks like this:
```latex
\documentclass[a4paper,12pt]{article}
\usepackage{CJK}
\usepackage{adjustbox}
\usepackage{etoolbox}
\usepackage{graphicx}
\newcommand{\hanzi}[2]{\ifdeflength{\hanziheight}{}{\newlength{\hanziheight}}\setlength{\hanziheight}{#1}\raisebox{-0.05\hanziheight}{\adjincludegraphics[height=\hanziheight,trim={0 {0.5\height} {0.5\width} 0},clip]{#2.png}}}
\begin{document}
\begin{CJK}{UTF8}{gbsn}
你好世界！

\hanzi{12pt}{0-0}\hanzi{12pt}{1-0}世\hanzi{12pt}{2-0}！
\end{CJK}
\end{document}
```

Note that the `\hanzi{}` command got a new definition.

### Comments on coding

- The font size specified as optional parameter in the `\documentclass{}` command will be the default font size for the SVG creator. If no font size is specified, it will be assumed to be `10pt`; exept for the document class `slides` where it will be assumed to be `20pt`.
- The LaTeX boldface command `\textbf{}` corresponds to `<b></b>`.
- Since italics are not supported for Chinese characters in LaTeX, i.e. `\textit{}` will not produce cursive characters, the created SVGs won't be in italics style either when they are placed within `\textit{\hanzi{}}`.
- Underlines and line-throughs can be produced in plain LaTeX and without hanzi.js. For example, one can use the `ulem` package which defines the commands `\uline{}` and `\sout{}` for an underline or a line-through, respectively.
- `\textsubscript{}` and `\textsuperscript{}` correspond to `<sub></sub>` and `<sup></sup>`, respectively.
- The CJK package allows several font options. The fonts `gbsn` and `gkai` for simplified Chinese as well as `bsmi` and `bkai` for traditional Chinese will be equivalented to `SimSun` and `KaiTi` as well as `PMingLiU` and `DFKai-SB`, respectively. For other fonts, SimSun is set as default. These settings can be manually changed in the Hanzi-to-TeX Converter file after `<script type="text/javascript">`.
- The CJK package does not support a mixing of simplified and traditional characters. For example, if one types `我寫漢字。` and the selected font is `gbsn` or `gkai`, only `我字。` will be displayed. However, if one types `我\hanzi{寫}\hanzi{漢}字。`, the complete sequence will be displayed after running the converter.
- The converter analyses the document's structure on basis of opening and closing `{`s and `}`s as well as environments. Escaped elements like `\}` and `\\\}` (but not `\\}`) or `\\begin{small}` and so on are ignored successfully. However, backslashes are not the only way to escape elements: Code snippets like `\begin{small}\begin{verbatim}\end{small}\end{verbatim}\end{small}` will probably produce a flawed outcome and should be avoided.
- Tag attributes can be passed inside brackets, e.g. `\hanzi{[colors="1:blue,2:red" comp="嗎"]⿰口馬}`.

## License

MIT licensed

Copyright (C) 2018 Tillmann Dönicke
