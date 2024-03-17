// index.js
const ColorScheme = require('color-scheme');
const Color = require('color');
const wcagContrast = require('wcag-contrast');
const colorNameList = require('color-name-list');
const tinycolor = require('tinycolor2');

// Mulberry32 pseudo-random number generator
function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateRandomNumber(min, max, random) {
  return Math.floor(random() * (max - min + 1)) + min;
}

function generateRandomHexColor(random) {
  const letters = '0123456789ABCDEF';
  return '#' + Array.from({ length: 6 }, () => letters[Math.floor(random() * 16)]).join('');
}

function generateRandomRGBColor(min, max, alpha, random) {
  const red = generateRandomNumber(min, max, random);
  const green = generateRandomNumber(min, max, random);
  const blue = generateRandomNumber(min, max, random);
  return alpha
    ? `rgba(${red}, ${green}, ${blue}, ${random().toFixed(2)})`
    : `rgb(${red}, ${green}, ${blue})`;
}

function generateRandomHSLColor(alpha, random) {
  const hue = generateRandomNumber(0, 360, random);
  const saturation = generateRandomNumber(0, 100, random);
  const lightness = generateRandomNumber(0, 100, random);
  return alpha
    ? `hsla(${hue}, ${saturation}%, ${lightness}%, ${random().toFixed(2)})`
    : `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function generateRandomColor(options = {}) {
  const { format = 'hex', min = 0, max = 255, alpha = false, seed = null } = options;
  const random = seed ? mulberry32(seed) : Math.random;

  switch (format) {
    case 'rgb':
      return generateRandomRGBColor(min, max, alpha, random);
    case 'hsl':
      return generateRandomHSLColor(alpha, random);
    default:
      return generateRandomHexColor(random);
  }
}

function generateRandomGradientColors(options = {}) {
  const { format = 'hex', count = 2, min = 0, max = 255, alpha = false, seed = null } = options;
  const random = seed ? mulberry32(seed) : Math.random;
  return Array.from({ length: count }, () =>
    generateRandomColor({ format, min, max, alpha, seed: random() })
  );
}

function generateRandomColorFamily(options = {}) {
  const {
    format = 'hex',
    count = 5,
    min = 0,
    max = 255,
    alpha = false,
    seed = null,
    hueRange = 30,
    saturationRange = 20,
    lightnessRange = 20,
  } = options;
  const baseColor = generateRandomColor({ format: 'hsl', min, max, alpha, seed });
  const [hue, saturation, lightness] = baseColor.match(/\d+/g);
  const random = seed ? mulberry32(seed) : Math.random;

  return [
    baseColor,
    ...Array.from({ length: count - 1 }, () => {
      const newHue = (parseInt(hue) + generateRandomNumber(-hueRange, hueRange, random)) % 360;
      const newSaturation = Math.max(
        0,
        Math.min(100, parseInt(saturation) + generateRandomNumber(-saturationRange, saturationRange, random))
      );
      const newLightness = Math.max(
        0,
        Math.min(100, parseInt(lightness) + generateRandomNumber(-lightnessRange, lightnessRange, random))
      );
      const newColor = `hsl(${newHue}, ${newSaturation}%, ${newLightness}%)`;
      return format === 'hsl' ? newColor : convertColor(newColor, format);
    }),
  ];
}

function generateColorScheme(options = {}) {
  const { baseColor, format = 'hex', scheme = 'complementary', alpha = false } = options;
  const colorScheme = new ColorScheme();
  colorScheme.from_hex(baseColor).scheme(scheme);
  return colorScheme.colors().map((color) => convertColor(color, format, alpha));
}

function ensureColorContrast(options = {}) {
  const { color1, color2, format = 'hex', contrastRatio = 4.5 } = options;
  const contrast = wcagContrast.hex(color1, color2);
  if (contrast >= contrastRatio) {
    return [convertColor(color1, format), convertColor(color2, format)];
  }

  const backgroundColor = Color(color1).isDark() ? color1 : color2;
  let textColor = Color(color1).isDark() ? color2 : color1;
  while (wcagContrast.hex(backgroundColor, textColor.hex()) < contrastRatio) {
    textColor = textColor.lighten(0.1);
  }
  return [convertColor(backgroundColor, format), convertColor(textColor.hex(), format)];
}

function adjustColor(color, method, amount) {
  return Color(color)[method](amount).toString();
}

function getColorName(color) {
  return colorNameList.closest(color).name;
}

function convertColor(color, format, alpha = false) {
  const convertedColor = tinycolor(color);
  return alpha ? convertedColor.setAlpha(alpha).toString(format) : convertedColor.toString(format);
}

module.exports = {
  generateRandomColor,
  generateRandomGradientColors,
  generateRandomColorFamily,
  generateColorScheme,
  ensureColorContrast,
  lighten: (color, amount) => adjustColor(color, 'lighten', amount),
  darken: (color, amount) => adjustColor(color, 'darken', amount),
  saturate: (color, amount) => adjustColor(color, 'saturate', amount),
  desaturate: (color, amount) => adjustColor(color, 'desaturate', amount),
  getColorName,
};