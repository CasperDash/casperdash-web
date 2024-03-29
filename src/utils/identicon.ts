import IdentIcon from 'identicon.js';

/**
 * It takes a value and returns a base64 encoded identicon image
 * @param value - The value to generate the identicon from.
 * @param [options] - {
 * @returns A base64 encoded image of an identicon.
 */
export const getBase64IdentIcon = (value: any, options = {}): string => {
  try {
    return `data:image/svg+xml;base64,${new IdentIcon(value, {
      background: [255, 0, 0, 0],
      format: 'svg',
      ...options,
    }).toString()}`;
  } catch {
    return '/assets/images/token-icon.png';
  }
};
