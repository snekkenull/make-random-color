# make-random-color

A versatile and lightweight npm package for generating random colors and color schemes. This package provides a set of functions to create random colors, gradient colors, color families, and color schemes, as well as utility functions for color manipulation and contrast checking.

## Installation

To install the package, run the following command:

```
npm install make-random-color
```

## Usage

Here are some examples of how to use the functions provided by the `make-random-color` package:

```javascript
const {
  generateRandomColor,
  generateRandomGradientColors,
  generateRandomColorFamily,
  generateColorScheme,
  ensureColorContrast,
  lighten,
  darken,
  saturate,
  desaturate,
  getColorName,
} = require('make-random-color');

// Generate a random color
const randomColor = generateRandomColor();

// Generate random gradient colors
const gradientColors = generateRandomGradientColors({ count: 3 });

// Generate a random color family
const colorFamily = generateRandomColorFamily({ count: 5, format: 'rgb' });

// Generate a color scheme based on a base color
const baseColor = '#ff0000';
const colorScheme = generateColorScheme({ baseColor, scheme: 'analogous' });

// Ensure sufficient color contrast
const [backgroundColor, textColor] = ensureColorContrast({
  color1: '#ffffff',
  color2: '#000000',
  contrastRatio: 4.5,
});

// Manipulate colors
const lighterColor = lighten('#ff0000', 0.2);
const darkerColor = darken('#ff0000', 0.2);
const saturatedColor = saturate('#ff0000', 0.2);
const desaturatedColor = desaturate('#ff0000', 0.2);

// Get the name of a color
const colorName = getColorName('#ff0000');
```

## API

### `generateRandomColor(options)`

Generates a random color.

- `options` (object, optional):
  - `format` (string, default: 'hex'): The format of the generated color ('hex', 'rgb', or 'hsl').
  - `min` (number, default: 0): The minimum value for RGB color components.
  - `max` (number, default: 255): The maximum value for RGB color components.
  - `alpha` (boolean, default: false): Whether to include an alpha component in the generated color.
  - `seed` (number, default: null): A seed value for the random number generator.

Returns a string representing the generated color.

### `generateRandomGradientColors(options)`

Generates an array of random gradient colors.

- `options` (object, optional):
  - `format` (string, default: 'hex'): The format of the generated colors ('hex', 'rgb', or 'hsl').
  - `count` (number, default: 2): The number of colors to generate.
  - `min` (number, default: 0): The minimum value for RGB color components.
  - `max` (number, default: 255): The maximum value for RGB color components.
  - `alpha` (boolean, default: false): Whether to include an alpha component in the generated colors.
  - `seed` (number, default: null): A seed value for the random number generator.

Returns an array of strings representing the generated gradient colors.

### `generateRandomColorFamily(options)`

Generates an array of colors that form a random color family.

- `options` (object, optional):
  - `format` (string, default: 'hex'): The format of the generated colors ('hex', 'rgb', or 'hsl').
  - `count` (number, default: 5): The number of colors to generate in the family.
  - `min` (number, default: 0): The minimum value for RGB color components.
  - `max` (number, default: 255): The maximum value for RGB color components.
  - `alpha` (boolean, default: false): Whether to include an alpha component in the generated colors.
  - `seed` (number, default: null): A seed value for the random number generator.
  - `hueRange` (number, default: 30): The maximum range of hue variation for the color family.
  - `saturationRange` (number, default: 20): The maximum range of saturation variation for the color family.
  - `lightnessRange` (number, default: 20): The maximum range of lightness variation for the color family.

Returns an array of strings representing the colors in the generated color family.

### `generateColorScheme(options)`

Generates a color scheme based on a base color.

- `options` (object):
  - `baseColor` (string): The base color for generating the color scheme.
  - `format` (string, default: 'hex'): The format of the generated colors ('hex', 'rgb', or 'hsl').
  - `scheme` (string, default: 'complementary'): The color scheme to generate ('complementary', 'analogous', 'triadic', 'tetradic', 'square', 'split-complementary', 'monochromatic').
  - `alpha` (boolean, default: false): Whether to include an alpha component in the generated colors.

Returns an array of strings representing the colors in the generated color scheme.

### `ensureColorContrast(options)`

Ensures sufficient color contrast between two colors.

- `options` (object):
  - `color1` (string): The first color.
  - `color2` (string): The second color.
  - `format` (string, default: 'hex'): The format of the colors ('hex', 'rgb', or 'hsl').
  - `contrastRatio` (number, default: 4.5): The desired contrast ratio.

Returns an array of two strings representing the adjusted colors with sufficient contrast.

### `lighten(color, amount)`

Lightens a color by a specified amount.

- `color` (string): The color to lighten.
- `amount` (number): The amount to lighten the color (between 0 and 1).

Returns a string representing the lightened color.

### `darken(color, amount)`

Darkens a color by a specified amount.

- `color` (string): The color to darken.
- `amount` (number): The amount to darken the color (between 0 and 1).

Returns a string representing the darkened color.

### `saturate(color, amount)`

Saturates a color by a specified amount.

- `color` (string): The color to saturate.
- `amount` (number): The amount to saturate the color (between 0 and 1).

Returns a string representing the saturated color.

### `desaturate(color, amount)`

Desaturates a color by a specified amount.

- `color` (string): The color to desaturate.
- `amount` (number): The amount to desaturate the color (between 0 and 1).

Returns a string representing the desaturated color.

### `getColorName(color)`

Gets the name of a color.

- `color` (string): The color to get the name for.

Returns a string representing the name of the color.

## License

This package is licensed under the MIT License.
