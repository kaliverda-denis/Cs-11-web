import { ColorPaletteGenerator } from '@martinlaxenaire/color-palette-generator';

const CUSTOM_NAMES = {
    '#301934': 'Midnight Violet',
    '#0066FF': 'Coolors Blue',
    '#00BFB2': 'Tiffany Teal',
    '#1A5E63': 'Deep Sea',
    '#F0F3BD': 'Vanilla Cream'
};

export const getName = (hex) => CUSTOM_NAMES[hex.toUpperCase()] || 'Generated Color';

export const isDark = (hex) => {
    const rgb = parseInt(hex.replace('#',''), 16);
    return (0.2126*((rgb>>16)&0xff) + 0.7152*((rgb>>8)&0xff) + 0.0722*(rgb&0xff)) < 140;
};

export const generateRandomHex = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
};

export const getRandomPalette = (count) => {
    try {
        const generator = new ColorPaletteGenerator({});
        let palette = generator.getRandomPalette({ length: count }).map(el => el.hex);
        // Добиваємо рандомом, якщо бібліотека дала менше
        while (palette.length < count) {
            palette.push(generateRandomHex());
        }
        return palette;
    } catch (e) {
        return Array(count).fill(0).map(generateRandomHex);
    }
};

export const getDistributedPalette = (colorHex, count) => {
    return new ColorPaletteGenerator({
        baseColor: colorHex,
    }).getDistributedPalette({ includeBaseColor: true, length: count, sortByBrightness: true }).map(el => el.hex)
};