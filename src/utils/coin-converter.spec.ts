/* eslint-disable @typescript-eslint/ban-ts-comment */
import { coinConverter } from './coin-converter';
import { faker } from '@faker-js/faker';

describe('coinConverter function', () => {
  it('should throw an error if arguments are not of type BigInt', () => {
    // @ts-ignore
    // tslint:disable-next-line
    expect(() => coinConverter(1, 2, 3)).toThrow(TypeError);
    // @ts-ignore
    // tslint:disable-next-line
    expect(() => coinConverter('1n', '2n', '3n')).toThrow(TypeError);
    // @ts-ignore
    // tslint:disable-next-line
    expect(() => coinConverter(null, undefined, Infinity)).toThrow(TypeError);
  });

  it('should throw a range error if any of the arguments are <= 0', () => {
    expect(() => coinConverter(0n, 1n, 1n)).toThrow(RangeError);
    expect(() => coinConverter(1n, 0n, 1n)).toThrow(RangeError);
    expect(() => coinConverter(1n, 1n, 0n)).toThrow(RangeError);
  });

  it('should convert coins correctly', () => {
    // Use faker to generate random numbers for testing
    const fromPrice = BigInt(faker.datatype.number({ min: 1, max: 1000000 }));
    const toPrice = BigInt(faker.datatype.number({ min: 1, max: 1000000 }));
    const amount = BigInt(faker.datatype.number({ min: 1, max: 1000000 }));
    const expected = ((amount * toPrice) / fromPrice).toString();

    const result = coinConverter(fromPrice, toPrice, amount);
    expect(result).toBe(expected);
  });

  it('should throw an error if the result is not a finite number', () => {
    // This test case should throw an error because the result is too large to be a finite number
    // @ts-ignore
    // tslint:disable-next-line
    expect(() => coinConverter(1n, 1n, Number.MAX_SAFE_INTEGER)).toThrow(Error);
  });
});
