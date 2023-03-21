/**
 * Get end string by number or regex
 * @param {string} fullString
 * @param {number} end
 */
export const getEndString = (fullString: string, end: string | RegExp) => {
  if (typeof fullString !== 'string') {
    return fullString;
  }
  if (typeof end === 'string') {
    return end;
  } else if (typeof end === 'number') {
    return fullString.slice(-Math.abs(end));
  } else if (end instanceof window.RegExp) {
    const match = fullString.match(end);
    if (!match) {
      return '';
    }
    const index = match.index;
    return fullString.slice(index);
  }
};

export const startAndEnd = (str: string) => {
  if (str.length > 10) {
    return str.slice(0, 5) + '...' + str.slice(str.length - 4, str.length);
  }
  return str;
};
