import { coinDispenser } from './coin-dispenser';

describe('coinDispenser function tests', () => {
  const testCases = [
    {
      title: 'should return expected result with available coins',
      coinAvailable: { TRON: 10, ETH: 7, MATIC: 8 },
      participantsRequested: ['TRON/ETH', 'MATIC', 'TRON', 'MATIC/TRON'],
      expectedResult: ['TRON', 'MATIC', 'TRON', 'TRON'],
    },
    {
      title: 'should return null with insufficient coins available',
      coinAvailable: { TRON: 1, ETH: 1, MATIC: 1 },
      participantsRequested: ['TRON/ETH', 'MATIC', 'TRON', 'ETH'],
      expectedResult: null,
    },
  ];

  testCases.forEach(
    ({ title, coinAvailable, participantsRequested, expectedResult }) => {
      it(title, () => {
        expect(coinDispenser(coinAvailable, participantsRequested)).toEqual(
          expectedResult,
        );
      });
    },
  );
});
