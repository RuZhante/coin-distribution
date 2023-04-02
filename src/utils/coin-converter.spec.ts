import { coinConverter } from './coin-converter';
import { faker } from '@faker-js/faker';

describe('Checking the coinConverter function', () => {
  const testCases = [
    {
      title: 'the amount is less than or equal to 0',
      amount: faker.datatype.number({ min: 0, max: 1000 }) * -1,
      fromPrice: faker.datatype.number({ min: 1, max: 1000 }),
      toPrice: faker.datatype.number({ min: 1, max: 1000 }),
      expected: 0,
    },
    {
      title: 'the fromPrice is less than or equal to 0',
      amount: faker.datatype.number({ min: 1, max: 1000 }),
      fromPrice: faker.datatype.number({ min: 0, max: 1000 }) * -1,
      toPrice: faker.datatype.number({ min: 1, max: 1000 }),
      expected: 0,
    },
    {
      title: 'the toPrice is less than or equal to 0',
      amount: faker.datatype.number({ min: 1, max: 1000 }),
      fromPrice: faker.datatype.number({ min: 0, max: 1000 }),
      toPrice: faker.datatype.number({ min: 0, max: 1000 }) * -1,
      expected: 0,
    },
  ];

  const testCases2 = [
    {
      title: 'the fromPrice is more to toPrice',
      amount: faker.datatype.number({ min: 1, max: 1000 }),
      fromPrice: faker.datatype.number({ min: 1001, max: 2000 }),
      toPrice: faker.datatype.number({ min: 1, max: 1000 }),
    },
    {
      title: 'the toPrice is more to fromPrice',
      amount: faker.datatype.number({ min: 1, max: 1000 }),
      fromPrice: faker.datatype.number({ min: 1, max: 1000 }),
      toPrice: faker.datatype.number({ min: 1001, max: 2000 }),
    },
  ];

  const arr = [null, undefined, Infinity];

  const testCases3 = [
    {
      title: 'the amount undefined, null or Infinity',
      amount: arr[Math.floor(Math.random() * arr.length)],
      fromPrice: faker.datatype.number({ min: 1001, max: 2000 }),
      toPrice: faker.datatype.number({ min: 1, max: 1000 }),
      expected: 0,
    },
    {
      title: 'the fromPrice undefined, null or Infinity',
      amount: faker.datatype.number({ min: 1, max: 1000 }),
      fromPrice: arr[Math.floor(Math.random() * arr.length)],
      toPrice: faker.datatype.number({ min: 1, max: 1000 }),
      expected: 0,
    },
    {
      title: 'the toPrice undefined, null or Infinity',
      amount: faker.datatype.number({ min: 1, max: 1000 }),
      fromPrice: faker.datatype.number({ min: 1, max: 1000 }),
      toPrice: arr[Math.floor(Math.random() * arr.length)],
      expected: 0,
    },
  ];

  testCases.forEach((test) => {
    it(`${test.title}`, () => {
      const result = coinConverter(test.fromPrice, test.toPrice, test.amount);
      expect(result).toBe(test.expected);
    });
  });

  testCases2.forEach((test) => {
    it(`${test.title}`, () => {
      const result = coinConverter(test.fromPrice, test.toPrice, test.amount);
      expect(result).toBeGreaterThan(0);
    });
  });

  testCases3.forEach((test) => {
    it(`${test.title}`, () => {
      const result = coinConverter(test.fromPrice, test.toPrice, test.amount);
      expect(result).toBe(test.expected);
    });
  });
});
