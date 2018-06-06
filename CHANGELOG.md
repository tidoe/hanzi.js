# Changelog

## Version overview

<table>
	<tr>
		<th>Script</th>
		<th colspan=4>Earlier Versions</th>
		<th>Newest Version</th>
	</tr>
	<tr>
		<td>Hanzi 01</td>
		<td colspan=5>1.0</td>
	</tr>
	<tr>
		<td>Hanzi 02</td>
		<td>1.0</td>
		<td>1.0.1</td>
		<td colspan=2>1.1</td>
  		<td>1.3</td>
	</tr>
	<tr>
		<td>Extension 01</td>
		<td colspan=5>1.0</td>
	</tr>
	<tr>
		<td>Test</td>
		<td colspan=5>1.0</td>
	</tr>
	<tr>
		<td>Hanzi-To-TeX</td>
		<td colspan=2 align=right>1.0.1</td>
		<td>1.1</td>
  		<td>1.2</td>
  		<td>1.3</td>
	</tr>
</table>

## 1.3

**Hanzi 02**

- Single descriptors can now be created (e.g. `<hanzi>⿰</hanzi>`). This is especially useful for the LaTeX extension since descriptors are not included in the standard character sets.

**Hanzi-To-TeX**

- `\textsubscript{}` and `\textsuperscript{}` now correspond to `<sub></sub>` and `<sup></sup>`, respectively.
- Font size commands (e.g. `\small`) are now recognised.
- The problem of cut-off bottoms is solved (for the LaTeX extension, not for conversions to image file formats in general).

## 1.2

**Hanzi-To-TeX**

- The \hanzi{} command's structure was slightly simplified.
- Identical generated characters are downloaded only once.

## 1.1

**Hanzi 02**

- Hidden overflow at an SVG's bottom is now visible.
- The `dset` attribute is introduced.

**Hanzi-To-TeX**

- Paths for loading of Hanzi 01 and 02 are corrected.

## 1.0.1

**Hanzi 02**

- Copying a generated character from an interpreted HTML file will now copy the whole sequence (e.g. ⿰氵⿱宀⿰衤𪠲) and not only the characters (氵宀衤𪠲).

**Hanzi-To-TeX**

- First release

## 1.0

**Hanzi 01, Hanzi 02, Extension 01, Test**

- First release
