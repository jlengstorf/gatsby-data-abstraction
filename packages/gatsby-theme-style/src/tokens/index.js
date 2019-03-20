import colorsDefault from './colors';
import fontsDefault from './fonts';
import theme from '../theme';

export const colors = { ...colorsDefault, ...(theme.colors || {}) };
export const fonts = { ...fontsDefault, ...(theme.fonts || {}) };
