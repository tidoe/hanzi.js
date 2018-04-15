# hanzi.js

Representation of (non-)Unicode Chinese characters in HTML using SVGs

## Table of contents

- [Instructions](#instructions)
  - [First example](#first-example)
  - [Character description language](#character-description-language)
  - [More examples](#more-examples)
- [Tag attributes](#tag-attributes)
  - [comp](#comp)
  - [colors](#colors)
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
  - [font-family](#font-family)
  - [font-size](#font-size)
  - [font-style](#font-style)
  - [font-weight](#font-weight)
  - [text-color](#text-color)
  - [text-decoration](#text-decoration)
- [Conversion instructions](#conversion-instructions)
  - [To PDF](#to-pdf)
  - [To script-less HTML](#to-script-less-html)
  - [To various image file formats](#to-various-image-file-formats)
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
		<script type="text/javascript" src="hanzi-01-v1.0.js"></script>
		<script type="text/javascript" src="hanzi-02-v1.0.js"></script>
	</body>
</html>
```

**Note:** You have to download the .js files and place them in the same folder as your HTML document or modify the path in the `src` attributes of the `<script>` tags.

The `<script>` tags must be included right before `</body>`.

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

0. Boldface
```html
<b>你<hanzi>⿰女子</hanzi>世界！</b>
```
0. Italics
```html
<i>你<hanzi>⿰女子</hanzi>世界！</i>
```
0. Boldface and italics
```html
<b><i>你<hanzi>⿰女子</hanzi>世界！</i></b>
```
0. Struck through
```html
<s>你<hanzi>⿰女子</hanzi>世界！</s>
```
0. Underline
```html
<u>你<hanzi>⿰女子</hanzi>世界！</u>
```
0. Hyperlink
```html
<a href="https://github.com/tidoe">你<hanzi>⿰女子</hanzi>世界！</a>
```
0. Specified font
```html
<span style="font-family:Yu Gothic;">你<hanzi>⿰女子</hanzi>世界！</span>
```
0. Font- and background-color
```html
<span style='color:red;background-color:gray;'>你<hanzi>⿰女子</hanzi>世界！</span>
```
0. Coloured components
```html
你<hanzi colors="1:blue,2:red">⿰女子</hanzi>世界！
```
0. With JavaScript
```html
你<hanzi>⿰女子</hanzi>世界！
<script type="text/javascript">
	var hanzi = document.getElementsByTagName("hanzi");
	for(var i = 0; i < hanzi.length; ++i){
		hanzi[i].setAttribute("colors", "0:red");
	}
</script>
```
0. With CSS
```html
<style type="text/css">
	hanzi {
		color: red;
	}
</style>
你<hanzi>⿰女子</hanzi>世界！
```
0. More complex characters
```html
他沒吃過<hanzi>⿺辶⿳穴⿲月⿱⿲幺言幺⿲長馬長刂心</hanzi><hanzi>⿺辶⿳穴⿲月⿱⿲幺言幺⿲長馬長刂心</hanzi>麵。
```
0. More complex characters with scales
```html
他沒吃過<hanzi scales="4:2,6:3">⿺辶⿳穴⿲月⿱⿲幺言幺⿲長馬長刂心</hanzi><hanzi scales="4:2,6:3">⿺辶⿳穴⿲月⿱⿲幺言幺⿲長馬長刂心</hanzi>麵。
```

## Tag attributes

### comp

This attribute is for testing. You can pass the original character which will then be drawn under the produced character in orange.

For example, `<hanzi comp="嗎">⿰口馬</hanzi>` can be used to compare the character produced by ⿰口馬 with the original character 嗎.

### colors

Single components can be coloured by passing the component's index (counted from 0) and a colour name. This is useful for, e.g., marking the phonetic and semantic components. Index and colour name must be separated by a colon and index-colour pairs must be separated by commas.

For example, `<hanzi colors="1:blue,2:red">⿰口馬</hanzi>` colours 口 blue and 馬 red.

If a descriptor is at the index's position, every of its components will be coloured (if not having attributed an own colour name).

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

As indicated above, the six fonts shall cover each font type of {Simplified Chinese, Traditional Chinese, Japanese} × {serif, sans-serif, fixed-width}. However, the fonts are not language dependent; of course one can use, e.g., Arial for Simplified Chinese as well.

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

Special surroundings are characters which can be used as surrounding characters but need other parameters than generally defined. The characters are grouped in equivalence classes and each class has an own entry with the font-specific parameters and a list of members of this class. For example: 尸, 戶, 户, 戸, 气, 𢎘 are all members of the same equivalence class.

### Define and test new parameters

The content of the variable `fontSpecificParameters` in script 01 (`hanzi-01-v1.0.js`) can be expanded by the parameters of a new font. This takes some time. Make sure to execute the following steps:

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

### text-color

The created character will inherit the text-color of the parent element.

See [Tag attributes](#tag-attributes) \\ [colors](#colors) for how to change the colour of a single component.

### text-decoration

**Note:** You have to load extension 01 to use text-decoration. Therefore include `<script type="text/javascript" src="hanzi-ext01-v1.0.js"></script>` after the other scripts and before `</body>`.

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

## License

MIT licensed

Copyright (C) 2018 Tillmann Dönicke