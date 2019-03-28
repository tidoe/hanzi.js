# Changelog

## Version overview

<table>
	<tr>
		<th colspan=2>File</th>
		<th colspan=8>Earlier Versions</th>
		<th>Newest Version</th>
	</tr>
	<tr>
		<td>01</td>
		<td>js</td>
		<td colspan=7>1.0</td>
		<td>2.0.1</td>
		<td>2.0.2</td>
	</tr>
	<tr>
		<td>02</td>
		<td>js</td>
		<td>1.0</td>
		<td>1.0.1</td>
		<td colspan=2>1.1</td>
  		<td colspan=5>1.3</td>
	</tr>
	<tr>
		<td>ext01</td>
		<td>js</td>
		<td colspan=9>1.0</td>
	</tr>
	<tr>
		<td>test</td>
		<td>html</td>
		<td colspan=6>1.0</td>
		<td colspan=3>2.0</td>
	</tr>
	<tr>
		<td>2tex</td>
		<td>html</td>
		<td colspan=2 align=right>1.0.1</td>
		<td>1.1</td>
  		<td>1.2</td>
  		<td>1.3</td>
  		<td>1.3.1</td>
		<td colspan=3>2.0</td>
	</tr>
	<tr>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
	</tr>
</table>

## 2.0.2

**01**

- Added 龵 to top variants.

## 2.0

## 2.0.1

**01**

- Added ⺶ to special surroundings.

## 2.0

**test**

- Now only one script (`hanzi.js`) has to be loaded before `</body>`. This script calls all the other scripts.
- The examples for coloured components have been changed.

**2tex**

- A path variable has been added to determine the place of the scripts to be load.

## 1.3.1

**2tex**

- Fixed some bugs concerning the detection and scope of font-size commands.

## 1.3

**02**

- Single descriptors can now be created (e.g. `<hanzi>⿰</hanzi>`). This is especially useful for the LaTeX extension since descriptors are not included in the standard character sets.

**2tex**

- `\textsubscript{}` and `\textsuperscript{}` now correspond to `<sub></sub>` and `<sup></sup>`, respectively.
- Font size commands (e.g. `\small`) are now recognised.
- The problem of cut-off bottoms is solved (for the LaTeX extension, not for conversions to image file formats in general).

## 1.2

**2tex**

- The \hanzi{} command's structure was slightly simplified.
- Identical generated characters are downloaded only once.

## 1.1

**02**

- Hidden overflow at an SVG's bottom is now visible.
- The `dset` attribute is introduced.

**2tex**

- Paths for loading of Hanzi 01 and 02 are corrected.

## 1.0.1

**02**

- Copying a generated character from an interpreted HTML file will now copy the whole sequence (e.g. ⿰氵⿱宀⿰衤𪠲) and not only the characters (氵宀衤𪠲).

**2tex**

- First release

## 1.0

**01, 02, ext01, test**

- First release
