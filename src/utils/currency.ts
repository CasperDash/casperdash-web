import { BigNumber } from '@ethersproject/bignumber';
import Big from 'big.js';

const MOTE_RATE = 1000000000;

/**
 * /**
 * Conver CSPR to Motes.
 *
 * Inpsired from toWie implementation (https://github.com/ethjs/ethjs-unit/blob/master/src/index.js#L119)
 * It will convert to String number | number to Big Number (We use big.js to cover the float numbers).
 * After that multiple with mote rate 10⁸
 *
 * @param {Number|String} amount
 * @returns {BigNumberis|String} Return "-" if it's the invalid big number input.
 */
export const toMotes = (amount: number): BigNumber | number => {
  try {
    const bigAmount = Big(amount)
      .times(MOTE_RATE)
      .round(0, Big.roundDown)
      .toString();
    return BigNumber.from(bigAmount);
  } catch (error) {
    return 0;
  }
};

/**
 * Convert motes to CSPR
 *
 * @param {Number|String} amount
 * @returns {BigNumberis|String} Return "-" if it's the invalid big number input.
 */
export const toCSPR = (amount: number) => {
  try {
    const bigAmount = Big(amount)
      .div(MOTE_RATE)
      .round(0, Big.roundDown)
      .toString();
    return BigNumber.from(bigAmount);
  } catch (error) {
    return '-';
  }
};
